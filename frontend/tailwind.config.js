module.exports = {
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1100px'
    },
    fontFamily: {
      brand: ['Montserrat', 'sans-serif'],
      default: ['Arial', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      brand: '#689496',
      darkbrand: '#2f686b',
      lightbrand: '#e6edef',
      black: 'black',
      white: 'white',
      gray: '#e8e8e8',
      lightgray: '#a2a2a2',
      darkgray: '#aaa',
      body: '#f8fafb',
      red: '#dc3e38',
      green: '#80a05d'
    },
    boxShadow: {
      default: '0 0 1em 0 rgba(0, 0, 0, 0.075)'
    },
    borderRadius: {
      default: '0.35rem'
    },
    easings: {
      'inOutQuart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)'
    },
    extend: {
      spacing: {
        '28': '7rem',
        '36': '9rem',
        '88': '22rem'
      },
      borderWidth: {
        '30': '30px'
      }
    }
  }
}
