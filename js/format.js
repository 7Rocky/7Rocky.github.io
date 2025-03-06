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

function formatItem(item) {
  return `<div class="relative w-100 w-30-l mb4 bg-card"><img alt="${item.title}" class="absolute w-20 ml-5 t-50 transform-img" src="${item.image}" style="${filterColor(item.difficulty)}"><div class="relative w-75 ml-25 pa4 overflow-hidden"><span class="f6 db">${item.section.toUpperCase()}</span><h3 class="f3"><a class="link dim" href="${item.permalink}" title="${item.title}">${item.title}</a></h3><span>${item.summary}</span></div></div>`
}