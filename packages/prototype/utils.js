// change rootURL by environment
const rootURL = location.href.includes('inudevs.com') ?
  'http://wandproto.inudevs.com' : 'http://localhost:9000'

const gup = Object.fromEntries(new URL(location.href).searchParams)
