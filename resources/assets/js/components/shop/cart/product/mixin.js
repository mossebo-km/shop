import FormattedPrice from '../../price/FormattedPrice'
import NumControl from '../../../NumControl'
import ProductShortDescription from '../../ProductShortDescription'
import Core from '../../../../scripts/core'

export default {

    components: {
        FormattedPrice,
        NumControl,
        ProductShortDescription
    },

    props: {
        product: Object,
        small: Boolean,
        noControls: Boolean
    },

    data() {
        return {
            /**
             * интервал, нужный для обработки зажимания кнопок +/-
             */
            quantityFlowInterval: null,

            /**
             * таймаут, который увеличивает запускает интервал,
             * чтобы при единичном клике не было изменения количества товаров на несколько шт.
             */
            quantityFlowTimeout: null,
        }
    },

    methods: {
        remove() {
            this.$store.dispatch('cart/removeProduct', this.product)
                .then(() => {
                    if (this.$store.getters['cart/products'].length === 0) {
                        Core.metrika.reachGoal('delete')
                    }
                })
        },

        getDescEl(e) {
            return e.target.closest('.js-product-description')
        },

        changeQty(qty) {
            this.$store.dispatch('cart/updateProduct', [this.product, qty])
        },
    },

    computed: {
        price() {
            return this.product.getPrice()
        },

        amount() {
            return this.product.quantity * this.price
        },

        isGhost() {
            return this.product.quantity === 0
        },
    }
}
