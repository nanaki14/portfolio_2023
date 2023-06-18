const colors = require('./tailwind/colors')
const fontFamily = require('./tailwind/fontFamily')
const transitionTimingFunction = require('./tailwind/transitionTimingFunction')

module.exports = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
    './src/utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily,
      transitionTimingFunction,
    },
  },
  variants: {},
}
