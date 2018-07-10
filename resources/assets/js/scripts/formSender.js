import axios from 'axios'
import BlankPlugin from './base/BlankPlugin'
import Core from './core'
import Alerty from './alerty'

function dispatchEvent(el, eventName) {
    let myEvent

    if (typeof CustomEvent === 'undefined') {
        myEvent = document.createEvent(eventName);
        myEvent.initCustomEvent(eventName, false, true);
    }
    else {
        myEvent = new CustomEvent(eventName, {
            bubbles: false,
            cancelable: true
        });
    }

    el.dispatchEvent(myEvent);
}

function onInputFocus( ev ) {
    ev.target.parentNode.classList.add('form-input--focus')
}

function onInputBlur( ev ) {
    if (ev.target.value.trim() === '') {
        ev.target.parentNode.classList.remove('form-input--filled')
    }

    ev.target.parentNode.classList.remove('form-input--focus')
}

function onInputChange( ev ) {
    if (ev.target.value.trim() === '') {
        ev.target.parentNode.classList.remove('form-input--filled')
    }
    else {
        ev.target.parentNode.classList.add('form-input--filled')
    }

    ev.target.parentNode.classList.add('form-input--focus')
}

export function inputFillCheck(querySelector) {
    [].slice.call(document.querySelectorAll( querySelector )).forEach(function(inputEl) {
        inputEl.addEventListener('focus', onInputFocus, {passive: true});
        inputEl.addEventListener('blur', onInputBlur, {passive: true});
        inputEl.addEventListener('change', onInputChange, {passive: true});

        onInputChange({target:inputEl});
    });
}

class FormField {
    constructor(el) {
        this.el = el
        this.inputEl = el.querySelector('.form-input, .form-textarea')
        this.errorEl = el.querySelector('.form-error')

        if (! this.inputEl) return

        if (! this.detectInputType()) {
            return
        }

        if (! this.errorEl) {
            this.errorEl = document.createElement('div')
            this.errorEl.classList.add('form-error')

            this.el.append(this.errorEl)
        }

        $(this.errorEl).tooltip()

        this.name = this.inputEl.getAttribute('name')
        this.bindEvents()
        this.ready = true
    }

    bindEvents() {
        this.inputEl.addEventListener('focus', onInputFocus, {passive: true})
        this.inputEl.addEventListener('blur', onInputBlur, {passive: true})
        this.inputEl.addEventListener('change', onInputChange, {passive: true})

        onInputChange({
            target: this.inputEl
        });
    }

    unbindEvents() {
        this.inputEl.removeEventListener('focus', onInputFocus)
        this.inputEl.removeEventListener('blur', onInputBlur)
        this.inputEl.removeEventListener('change', onInputChange)
    }

    setType(type) {
        this.type = type

        if (['text', 'tel', 'email', 'password', 'textarea'].indexOf(type) !== -1) {
            this.valueType = 'value'
        }
        else if (['checkbox', 'radio'].indexOf(type) !== -1) {
            this.valueType = 'check'
        }
        else if (type === 'select') {
            this.valueType = 'select'
        }
    }

    detectInputType() {
        if (this.inputEl.tagName.toLocaleLowerCase() === 'textarea') {
            this.setType('textarea')

            return true
        }

        if (! this.inputEl.type) {
            return false
        }

        this.setType(this.inputEl.type)

        return true
    }

    setValue(value) {
        if (this.type === 'hidden') return

        if (this.valueType === 'value') {
            this.inputEl.value = value

            return
        }

        if (this.valueType === 'check') {
            if (value) {
                this.inputEl.checked = true
                this.inputEl.setAttribute('checked')
            }
            else {
                this.inputEl.checked = false
                this.inputEl.removeAttribute('checked')
            }

            return
        }

        if (this.valueType === 'select') {
            [].forEach.call(this.inputEl.querySelectorAll('option'), (el) => {
                el.selected = el.value === value
            })

            return
        }
    }

    setError(text) {
        if (!this.ready) return

        this.el.classList.add('has-error')

        this.errorEl.setAttribute('data-original-title', text)

        this.inputEl.addEventListener('input', this.hideError.bind(this), {passive: true, once: true})
    }

    hideError() {
        if (!this.ready) return

        this.el.classList.remove('has-error')
    }

    reset() {
        this.setValue('')

        dispatchEvent(this.inputEl, 'focus')
        dispatchEvent(this.inputEl, 'blur')

        this.hideError()
    }

    destroy() {
        this.unbindEvents()
    }
}

export class FormInputs extends BlankPlugin {
    constructor(el) {
        super()

        this.el = el
        this.fields = [].map.call(el.querySelectorAll('.js-form-group'), el => {
            return new FormField(el)
        })
    }

    applyToFields(method) {
        let args = [].slice.call(arguments, 1)

        this.fields.forEach(field => {
            field[method].apply(field, args)
        })
    }

    showErrors(errors) {
        if (! errors) return

        this.fields.forEach(field => {
            if (field.name in errors) {
                field.setError(errors[field.name])
            }
        })
    }

    beforeDestroy() {
        this.applyToFields('destroy')
    }
}

export default class FormSender extends FormInputs {
    constructor(el) {
        super(el)

        this.url = this.el.getAttribute('action')
        this.sendInProcess = false
        this.init()
    }

    init() {
        this.submitEl = this.el.querySelector('[type="submit"]')

        this.bindEvent(this.el, 'submit', e => {
            e.preventDefault()
            this.submit()
        })
    }

    submit() {
        if (this.sendInProcess) return
        this.startLoading()

        axios.post(this.url, new FormData(this.el), {cancelToken: new axios.CancelToken(c => this.requestCancel = c)})
            .then(response => this.handleResponseData(response.data))
            .catch(thrown => {
                if (axios.isCancel(thrown)) return

                if ('response' in thrown && thrown.response.data) {
                    this.handleResponseData(thrown.response.data)
                    return
                }

                this.showMessage(Core.translate('errors.technical'), 'error')
                console.log(thrown)
            })
            .finally(() => {
                this.endLoading()
            })
    }

    handleResponseData(data) {
        if (data.status === 'error' && data.errors) {
            this.showErrors(data.errors)
        }

        if (data.status === 'success') {
            this.applyToFields('reset')
        }

        if (data.message) {
            this.showMessage(data.message, data.status)
        }
    }

    startLoading() {
        this.sendInProcess = true

        if (this.submitEl) {
            this.submitEl.classList.add('is-loading')
        }
    }

    endLoading() {
        this.sendInProcess = false

        if (this.submitEl) {
            this.submitEl.classList.remove('is-loading')
        }
    }

    showMessage(message, type) {
        new Alerty({
            type: type,
            message: message
        })
    }

    beforeDestroy() {
        this.endLoading()

        if (typeof this.requestCancel === 'function') {
            this.requestCancel()
        }
    }
}
