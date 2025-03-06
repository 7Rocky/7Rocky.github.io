let highlighted

fetch(new URL(document.URL).pathname + 'index.json').then(res => res.json()).then(data => {
  highlighted = data.highlighted
})

function randomHighlighted() {
  const indices = new Set()

  while (indices.size != 6) {
    indices.add(Math.round(Math.random() *  (highlighted.length - 1)))
  }

  let highlightedItems = ''
  const results = Array.from(indices).map(i => highlighted[i])

  for (let item of results) {
    highlightedItems += formatItem(item)
  }

  document.getElementById('highlightedItems').innerHTML = highlightedItems
}

document.getElementById('highlightedButton').addEventListener('click', e => {
  e.preventDefault()
  randomHighlighted()
})