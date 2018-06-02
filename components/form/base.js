export default {
  props: [
    'schema',
    'options',
    'disabled',
    'required',
    'label',
    'value',
    'disabled',
    'name',
    'validar'
  ],

  inject: ['$validator'],

  data () {
    return {
      ready: false
    }
  },

  mounted () {
    this.ready = true
  },

  computed: {
    internalValue: {
      get () {
        return this.value
      },

      set (newValue) {
        this.update(newValue)
      }
    }
  },

  methods: {
    update (event) {
      if (this.ready) {
        this.$emit('input', this.schema, event)
      }
    }
  }
}
