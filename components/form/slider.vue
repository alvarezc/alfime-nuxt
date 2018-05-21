<template>
    <v-container>
        <v-subheader>{{label}}</v-subheader>

        <v-layout row>
            <v-flex xs10 sm11>
                <v-slider :min="options.min" :max="options.max" :value="internalValue" thumb-label
                          @input="update" :disabled="disabled"></v-slider>
            </v-flex>

            <v-flex xs2 sm1>
                <v-text-field :value="internalValue" type="number" :max="options.max" :min="options.min"
                              @input="update" :disabled="disabled"></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import base from './base'

  export default {
    name: 'AFormSlider',

    mixins: [base]
  }
</script>
