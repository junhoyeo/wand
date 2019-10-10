// change rootURL by environment
const rootURL = location.href.includes('github.io') ?
  'https://junhoyeo.github.io/wand-prototype' : ''

const gup = Object.fromEntries(new URL(location.href).searchParams)
