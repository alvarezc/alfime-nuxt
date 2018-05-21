export default {
  props: [
    'schema',
    'options',
    'disabled',
    'required',
    'label',
    'value',
    'disabled'
  ],

  data () {
    return {
      internalValue: null,
      ready: false
    }
  },

  mounted () {
    this.internalValue = this.value
    this.ready = true
  },

  methods: {
    update (event) {
      if (this.ready) {
        this.$emit('input', this.schema, event)

        this.internalValue = event
      }
    }
  }
}
