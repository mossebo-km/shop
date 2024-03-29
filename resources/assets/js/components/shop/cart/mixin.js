import { mapGetters, mapState } from 'vuex'
import CartTable from './CartTable'
import FormattedPrice from '../price/FormattedPrice'
import Loading from '../../../components/Loading'
import PendingLoader from '../../../scripts/PendingLoader'

export default {
    components: {
        CartTable,
        FormattedPrice,
        Loading
    },

    data() {
        return {
            loading$: false,
            pendingLoader: false
        }
    },

    watch: {
        loading() {
            // если ответ с сервера приходит менее чем за 200мс - никакой анимации загрузки не будет.
            // если больше - включается загрузка, которая продлится не менее чем 300мс, чтобы избежать мигания.
            if (this.loading) {
                this.startLoadingDebounce()
            }
            else {
                this.stopLoadingDebounce()
            }
        }
    },

    created() {
        this.$store.dispatch('cart/init')

        this.startLoadingDebounce = _.debounce(() => {
            this.startInnerLoading()
        }, 200)

        this.stopLoadingDebounce = _.debounce(() => {
            this.stopInnerLoading()
        }, 200)
    },

    methods: {
        refresh() {
            this.$store.dispatch('cart/refresh')
        },

        startInnerLoading() {
            if (!this.loading) return
            if (this.pendingLoader !== false) {
                this.pendingLoader.cancel()
            }
            this.pendingLoader = new PendingLoader(300)
            this.loading$ = true
        },

        stopInnerLoading() {
            if (this.loading) return
            if (this.pendingLoader === false) return

            this.pendingLoader.finish(() => {
                this.loading$ = false
                this.pendingLoader = false
            })
        }
    },

    computed: {
        ... mapGetters({
            productsQuantity: 'cart/quantity',
            isEmpty: 'cart/isEmpty',
            amount: 'cart/amount',
            total: 'cart/total',
            promoDiscount: 'cart/promoDiscount',
        }),

        ... mapState({
            loading: state => state.cart.loading,
            hasError: state => state.cart.error,
            isReady: state => state.cart.ready,
        }),

        shippingPrice() {
            return 0
        },

        totalPrice() {
            return this.total + this.shippingPrice
        },
    }
}
