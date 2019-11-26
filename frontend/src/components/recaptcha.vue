<template>
  <div
  id="g-recaptcha"
  class="g-recaptcha"
  :data-sitekey="sitekey">
  </div>
</template>

<script>
export default {
  data () {
    return {
      sitekey: '6LccksQUAAAAAEZSPn8DH_4YKGQo2_tSY1oybkET',
      widgetId: 0
    }
  },
  methods: {
    execute () {
      window.grecaptcha.execute(this.widgetId)
    },
    reset () {
      window.grecaptcha.reset(this.widgetId)
    },
    render () {
      if (window.grecaptcha) {
        this.widgetId = window.grecaptcha.render('g-recaptcha', {
          sitekey: this.sitekey,
          size: 'invisible',
          // la devolución de llamada ejecutada cuando el usuario resuelve el recaptcha
          callback: (response) => {
            // emitir un evento llamado verificar con la respuesta como carga útil
            this.$emit('verify', response)
            // restablecer el widget recaptcha para que pueda ejecutarlo nuevamente
            this.reset()
          }
        })
      }
    }
  },
  mounted () {
    // renderizar el widget recaptcha cuando el componente está montado
    this.render()
  }
}
</script>
