let scrollHeight = 56;

class FixedMenu {
    constructor(query) {
        try {
            this.menuEl = document.querySelector(query)
            this.menuContainerEl = this.menuEl.querySelector(query + '-container')
            this.menuInnerEl = this.menuContainerEl.querySelector(query + '-inner')
            this.offsetEls = document.querySelectorAll(query + '-offset')
        }
        catch(e) {
            return
        }

        if (! this.menuInnerEl) return

        this.isFixed = false

        setTimeout(() => this.init(), 60)
    }

    init() {
        this.calculateFixedOffset()
        this.calculateScrollOffset()

        if (this.menuNeedsToBeFixed()) {
            this.animateFixed()
        }
        else {
            this.check()
        }

        let resizeDebouncer = _.debounce(() => {
            this.calculateFixedOffset()
            this.calculateScrollOffset()
            this.check()
        }, 60)

        window.addEventListener('scroll', this.check.bind(this), { passive: true })
        window.addEventListener('resize', resizeDebouncer, { passive: true })
    }

    calculateFixedOffset() {
        this.fixedOffset = [].reduce.apply(this.offsetEls, [(acc, el) => {
            return acc + el.clientHeight
        }, 0])
    }

    calculateScrollOffset() {
        this.scrollOffsetTop = window.scrollY + this.menuEl.getBoundingClientRect().y
    }

    menuNeedsToBeFixed() {
        return window.scrollY > this.scrollOffsetTop - this.fixedOffset
    }

    check() {
        if (this.menuEl.clientHeight <= scrollHeight) {
            if (this.menuNeedsToBeFixed()) {
                this.setFixed()
            }
            else {
                this.unsetFixed()
            }

            if (this.menuInnerEl.clientHeight !== this.menuEl.clientHeight) {
                this.menuInnerEl.removeAttribute('style')
            }
        }
        else {
            let heightDiff = this.getHeightDiff()

            if (this.menuEl.clientHeight >= heightDiff + this.menuInnerEl.clientHeight) {
                this.unsetFixed()
            }
            else {
                let maxDiff = this.menuEl.clientHeight - scrollHeight

                if (heightDiff > maxDiff) {
                    this.setFixed()
                }
            }

            this.setHeight(heightDiff)
        }
    }

    getHeightDiff() {
        return window.scrollY - this.scrollOffsetTop + this.fixedOffset
    }

    setHeight(heightDiff) {
        heightDiff = heightDiff || this.getHeightDiff()

        let height = Math.min(this.menuEl.clientHeight, Math.max(this.menuEl.clientHeight - heightDiff, scrollHeight))

        if (this.menuInnerEl.clientHeight !== height) {
            this.menuInnerEl.style.height = height + 'px'
        }
    }

    setFixed() {
        if (this.isFixed) return

        this.isFixed = true
        this.menuEl.classList.add('fixed')
        this.menuContainerEl.style.top = this.fixedOffset + 'px'
    }

    unsetFixed() {
        if (!this.isFixed) return

        this.isFixed = false
        this.menuEl.classList.remove('fixed')
        this.menuContainerEl.style.top = 0

        this.breakAnimation()
    }

    animateFixed() {
        this.animationInProcess = true

        let diff = this.menuEl.scrollHeight + this.menuEl.getBoundingClientRect().y
        this.setFixed()
        this.setHeight()

        if (this.menuContainerEl.scrollHeight > diff) {
            this.menuContainerEl.style.marginTop = diff + 'px'

            setTimeout(() => {
                if (this.animationInProcess) {
                    this.menuContainerEl.classList.remove('from-top')
                    this.menuContainerEl.style.marginTop = 0
                }
            }, 64)
        }
        else {
            setTimeout(() => {
                if (this.animationInProcess) {
                    this.menuContainerEl.classList.remove('from-top')
                }
            }, 1000)
        }

        this.menuContainerEl.classList.add('from-top')
    }

    breakAnimation() {
        if (! this.animationInProcess) return

        this.animationInProcess = false
        this.menuContainerEl.classList.remove('from-top')
    }
}

export default function initFixedMenu(query) {
    new FixedMenu(query)
}
