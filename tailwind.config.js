module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'SourceSansPro': ['Source Sans Pro', 'sans-serif']
      }
    },
    screens: {
      md: '600px',
      lg: '1280px'
    }
  },
  // Be able to apply calc()
  mode: 'jit'
}