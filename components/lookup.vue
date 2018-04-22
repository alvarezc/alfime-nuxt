<template>
    <v-select :label="label" autocomplete return-object
              :items="items" :value="value" @input="update"
              item-text="nombre" item-value="id" :required="required"
              :chips="chips" :multiple="multiple"></v-select>
</template>

<script>
  export default {
    name: 'lookup',

    props: ['label', 'items', 'value', 'chips', 'multiple', 'required'],

    methods: {
      update (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style scoped>

</style>
