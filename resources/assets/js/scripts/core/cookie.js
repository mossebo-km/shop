export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))

    return matches ? decodeURIComponent(matches[1]) : undefined
}

export function setCookie(name, value, options) {
    options = options || {}

    let expires = options.expires

    if (typeof expires == "number" && expires) {
        let d = new Date()
        d.setTime(d.getTime() + expires * 1000)
        expires = options.expires = d
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString()
    }

    value = encodeURIComponent(value)

    let updatedCookie = name + "=" + value

    for (let propName in options) {
        updatedCookie += "; " + propName
        let propValue = options[propName]

        if (propValue !== true) {
            updatedCookie += "=" + propValue
        }
    }

    document.cookie = updatedCookie
}

export function deleteCookie(name) {
    setCookie(name, "", {
        expires: -1
    })
}

export default {
    get(name) {
        return getCookie(name)
    },

    set(name, value) {
        let time = new Date;
        time.setDate(time.getDate() + 21)

        setCookie(name, value, {
            expires: time,
            domain: '.' + window.location.hostname,
            path: '/',
        })
    },

    delete(name) {
        deleteCookie(name)
    }
}


