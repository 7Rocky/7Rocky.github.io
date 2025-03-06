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

function parseMarkdown(content) {
  // TODO
  return content
}

function filterColor(difficulty) {
  switch (difficulty) {
    case 'very easy': return ' filter: invert(100%) sepia(187%) saturate(7237%) hue-rotate(274deg) brightness(113%) contrast(119%);" title="Very Easy'
    case 'easy':      return ' filter: invert(59%) sepia(81%) saturate(391%) hue-rotate(46deg) brightness(97%) contrast(87%);" title="Easy'
    case 'medium':    return ' filter: invert(5%) sepia(45%) saturate(2974%) hue-rotate(337deg) brightness(99%) contrast(96%);" title="Medium'
    case 'hard':      return ' filter: invert(1099%) sepia(579%) saturate(4912%) hue-rotate(338deg) brightness(98%) contrast(128%);" title="Hard'
    case 'insane':    return ' filter: invert(93%) sepia(88%) saturate(0%) hue-rotate(323deg) brightness(91%) contrast(98%);" title="Insane'
    default:          return ''
  }
}

function executeSearch() {
  if (!fuse) {
    loadSearch()
  }

  const results = fuse.search(document.getElementById('search').value)
  let searchitems = ''

  for (let result of results) {
    searchitems += `<div class="relative w-100 w-30-l mb4 bg-card"><img alt="${result.item.title}" class="absolute w-20 ml-5 t-50 transform-img" src="${result.item.image}" style="${filterColor(result.item.difficulty)}"><div class="relative w-75 nested-copy-line-height ml-25"><div class="pa4 overflow-hidden"><span class="f6 db">${result.item.section.toUpperCase()}</span><h3 class="f3"><a class="link dim" href="${result.item.permalink}" title="${result.item.title}">${result.item.title}</a></h3><div class="nested-links f5 lh-copy nested-copy-line-height">${parseMarkdown(result.item.summary)}</div></div></div></div>`
  }

  document.getElementById('searchResults').innerHTML = searchitems
  document.getElementById('post-count').innerText = results.length
}

loadSearch()