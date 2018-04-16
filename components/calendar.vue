<template>
    <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
            :return-value.sync="date">
        <v-text-field
                slot="activator"
                :label="label"
                v-model="date"
                prepend-icon="event"
                readonly></v-text-field>
        <v-date-picker v-model="date" no-title scrollable locale="es-co" :max="max">
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script>
  export default {
    name: 'calendar',

    props: [
      'value', 'max', 'label', 'value'
    ],

    data () {
      return {
        menu: false
      }
    },

    computed: {
      date: {
        get () {
          return this.value
        },

        set (newValue) {
          this.$emit('input', newValue)
        }
      }
    }
  }
</script>
