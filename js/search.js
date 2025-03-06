let fuse

const options = {
  findAllMatches: true,
  ignoreLocation: true,
  keys: ['title', 'summary', 'contents'],
  threshold: 0,
}

document.forms[0].addEventListener('submit', e => {
  e.preventDefault()
  executeSearch()
})

function loadSearch() {
  const file = window.location.pathname.startsWith('/en/') ? '/en/index.json' : '/index.json'

  fetch(file).then(res => res.json()).then(data => {
    fuse = new Fuse(data.posts, options)
  })
}

function executeSearch() {
  if (!fuse) {
    loadSearch()
  }

  const results = fuse.search(document.getElementById('search').value)
  let searchitems = ''

  for (let result of results) {
    searchitems += formatItem(result.item)
  }

  document.getElementById('searchResults').innerHTML = searchitems
  document.getElementById('post-count').innerText = results.length
}

loadSearch()