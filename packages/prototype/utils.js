// change rootURL by environment
const rootURL = location.href.includes('github.io') ?
  'https://junhoyeo.github.io/wand-prototype' : 'http://localhost:8000'

const gup = Object.fromEntries(new URL(location.href).searchParams)
