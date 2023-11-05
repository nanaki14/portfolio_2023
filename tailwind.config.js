const colors = require('./tailwind/colors')
const fontFamily = require('./tailwind/fontFamily')
const transitionTimingFunction = require('./tailwind/transitionTimingFunction')
const spacing = require('./tailwind/spacing')
const width = require('./tailwind/width')

module.exports = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/utils/**/*.{ts,tsx}',
  ],
  plugins: [
    require('tailwindcss-writing-mode')({
      variants: ['responsive', 'hover'],
    }),
  ],
  theme: {
    extend: {
      colors,
      fontFamily,
      spacing,
      transitionTimingFunction,
      width,
    },
  },
  variants: {},
}
