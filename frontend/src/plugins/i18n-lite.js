export default {
  install (Vue, options = {}) {
    if (!options.messages) {
      console.error('i18n-lite: Messages not found')
      return
    }
    if (!options.language) {
      console.error('i18n-lite: Language undefined')
      return
    }
    const i18n = {
      current: options.language
    }
    Object.defineProperty(Vue.config, 'language', {
      enumerable: true,
      configurable: true,
      get: function () { return i18n.current },
      set: function (val) { i18n.current = val }
    })
    Vue.prototype.$i18n = function (key, lang = i18n.current) {
      return options.messages[lang][key] || key
    }
  }
}
