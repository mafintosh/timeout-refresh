const Timeout = require('./index.js')

const to = new Timeout(100, () => {
  console.log('Timed out!')
})

const i = setInterval(() => {
  // refresh every 50ms
  to.refresh()
}, 50)

setTimeout(() => {
  // cancel the refresh after 500ms
  clearInterval(i)
  console.log('Stopping refresh')
  setTimeout(() => {
    console.log('Should have timed out now')
  }, 200)
}, 500)
