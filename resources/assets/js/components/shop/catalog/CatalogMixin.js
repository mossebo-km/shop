import { mapState } from 'vuex'

import moreBtnMixin from './mixins/moreBtnMixin'

import CatalogFilterList from './filter/CatalogFilterList'
import CatalogProductList from './product-list/CatalogProductList'

import Loading from '../../Loading'
import Tabs from '../../Tabs'
import CardTypesChanger from './CardTypesChanger'
import ButtonLoading from '../../buttons/ButtonLoading'
import BannerSlider from '../../banners/BannersSet/BannerSlider'
import BannerColumn from '../../banners/BannersSet/BannerColumn'
import SidePopup from '../../SidePopup'
import ServerError from '../../ServerError'
import CatalogSort from './CatalogSort'
import Fixer from '../../Fixer'
import ProductsViews from '../ProductsViews'

export default {
    name: "Catalog",

    components: {
        Loading,
        Tabs,
        CardTypesChanger,
        ButtonLoading,
        BannerSlider,
        BannerColumn,
        SidePopup,
        CatalogFilterList,
        CatalogProductList,
        ServerError,
        CatalogSort,
        Fixer,
        ProductsViews
    },

    mixins: [
        moreBtnMixin,
    ],

    props: [
        'filterTypes',
        'sortTypes'
    ],

    computed: {
        ... mapState({
            ready: state => state.catalog.ready,
            error: state => state.catalog.error,
            loading: state => state.catalog.loading,
            filtering: state => state.catalog.filtering,
            paginating: state => state.catalog.pagination.loading,
            activeSortType: state => state.catalog.sort.active,
            activeCardType: state => state.catalog.cards.active,
            allProductsQuantity: state => state.catalog.products.length,
            products: state => state.catalog.pagination.productsToShow,
            filtersExists: state => state.catalog.filters.filters.length > 0,
            filtersIsDirty: state => state.catalog.filters.isDirty,
        }),
    },

    data() {
        return {
            errorRefreshIterations: 0,
            filtersButtonShowed: false
        }
    },

    created() {
        this.$store.dispatch('catalog/init', {
            filters: {
                types: this.filterTypes
            },
            sort: {
                types: this.sortTypes,
                active: this.sortTypes[Object.keys(this.sortTypes)[0]]
            }
        })
    },

    methods: {
        refreshCatalog() {
            if (++this.errorRefreshIterations > 1) {
                window.location.reload()
            }
            else {
                this.$store.dispatch('catalog/fetchCatalog')
            }
        },

        openPopup() {
            this.$refs.popup.open()
        },

        clearFilters() {
            this.$store.dispatch('catalog/clearFilters')
        },

        showFiltersButton() {
            this.filtersButtonShowed = true
        },

        hideFiltersButton(e) {
            if (e) {
                this.filtersButtonShowed = false
            }
        }
    },
}
