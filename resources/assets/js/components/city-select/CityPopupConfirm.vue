<template>
    <city-popup
        :title="'Ваш город ' + cityName + '?'"
        @close="close"
    >
        <div class="select-city-confirm">
            <div v-if="false" class="select-city-confirm__text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                At debitis delectus dignissimos.
            </div>

            <div class="select-city-confirm__controls">
                <div class="select-city-confirm__button">
                    <button @click="confirm" class="button button-primary">
                        <svg class="button__icon button__icon--left">
                            <use xlink:href="/assets/images/icons.svg#symbol-check"></use>
                        </svg>

                        <span class="button__content">
                            Да
                        </span>
                    </button>
                </div>

                <div class="select-city-confirm__button">
                    <button @click="reject" class="button button-light">
                        Нет, выбрать другой
                    </button>
                </div>
            </div>
        </div>
    </city-popup>
</template>

<script>
    import { mapState } from 'vuex'
    import CityPopup from './CityPopup'

    export default {
        name: 'CityPopupConfirm',

        props: [
            'close'
        ],

        components: {
            CityPopup
        },

        methods: {
            confirm() {
                this.$store.dispatch('city/confirmCity')
                this.close()
            },

            reject() {
                this.$emit('reject')
            },
        },

        computed: {
            ... mapState({
                cityName: state => state.city.name
            })
        }
    }
</script>
