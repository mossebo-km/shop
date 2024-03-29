import Request from '../scripts/Request'

export default {
    data() {
        return {
            loading: false,
            error: false,
            request: null,
        }
    },

    beforeDestroy() {
        this.abortRequest()
    },

    methods: {
        sendRequest(method, url, data) {
            this.abortRequest()

            this.loading = true

            this.request = this.makeRequest(method, url, data)
            this.handleRequest()

            return this.request.start()
        },

        makeRequest(method, url, data) {
            return new Request(method, url, data)
        },

        handleRequest() {
            this.request
                .any(this.abortRequest)
                .fail(() => this.error = true)
        },

        abortRequest() {
            if (this.request) {
                this.request.abort()
            }

            this.loading = false
            this.request = null
        }
    }
}
