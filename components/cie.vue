<template>
    <v-select
            :loading="loading"
            :items="items"
            :rules="[() => value.length > 0 || 'Debes escoger por lo menos uno']"
            :search-input.sync="search"
            item-value="id"
            return-object
            item-text="enfermedad"
            :value="value"
            @input="update"
            :label="label"
            autocomplete
            multiple
            chips
            cache-items
            required></v-select>
</template>

<script>
  import cieService from '~/services/cie'
  import { Subject } from 'rxjs'

  export default {
    name: 'aCie',

    props: [
      'label',
      'value'
    ],

    data () {
      return {
        loading: false,

        search: null,

        items: [],

        query$: new Subject()
      }
    },

    watch: {
      search (val) {
        val && this.querySelections(val)
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      async querySelections (v) {
        this.loading = true

        this.query$.next(v)
      },

      update (newValue) {
        this.$emit('input', newValue)
      },

      initialize () {
        // Hay que asegurarse que existan para que los muestre
        this.items = this.value

        this.query$
          .asObservable()
          .debounceTime(1000)
          .mergeMap(item => cieService.cieStarts(item))
          .subscribe(item => {
            this.items = item

            this.loading = false
          })
      }
    }
  }
</script>

<style scoped>

</style>
