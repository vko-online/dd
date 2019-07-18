const Xray = require('x-ray')
const x = Xray()

x(
  'https://www.dietdoctor.com/explore',
  '.section-fixed-width',
  x('h3', [
    {
      title: '@',
      items: x('.editorial-box', [
        {
          title: 'h5',
          image: 'img@src',
          type: 'span',
          description: 'p'
        }
      ])
    }
  ])
).write('./src/results.json')
