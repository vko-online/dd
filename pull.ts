const Xray = require('x-ray')
const x = Xray()
const fs = require('fs')
const path = require('path')

// website has plain list of data without nesting
// so we should have count of items on section
// to be able to specify items for section header
// for example, 9 is amount of items for Low-carb section
const itemsPerGroup = [
  9, 8, 3, 4, 6, 1, 2, 2, 3
]
x(
  'https://www.dietdoctor.com/explore',
  '.section-fixed-width',
  {
    title: ['h3'],
    items: x('.editorial-box', [{
      title: 'h5',
      image: 'img@src',
      type: 'span',
      description: 'p'
    }])
  }
)((err, data) => {
  if (err) throw err
  const items = data.title.reduce((all, next, index) => {
    const title = next
    const before = itemsPerGroup.slice(0, index).reduce((a, n) => a + n, 0)
    const after = itemsPerGroup.slice(0, index + 1).reduce((a, n) => a + n, 0)
    const items = data.items.slice(before, after)
    all.push({
      title,
      items
    })
    return all
  }, [])
  const file = path.join(__dirname, 'src', 'data.json')
  fs.writeFile(file, JSON.stringify(items, null, 4), function (err) {
    if (err) throw err
    console.log('Done')
  })
})
