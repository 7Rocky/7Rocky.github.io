function filterMachines(search) {
  let count = 0

  Array.from(document.getElementById('post-list').children).forEach(div => {
    const a = div.querySelector('a')
    const d = a.parentElement.nextElementSibling

    if (
      a.textContent.toLowerCase().includes(search.toLowerCase()) ||
      d.textContent.toLowerCase().includes(search.toLowerCase())
    ) {
      div.classList.remove('hide')
      count++
    } else {
      div.classList.add('hide')
    }
  })

  document.getElementById('post-count').textContent = count
}

window.addEventListener('DOMContentLoaded', () => {
  const search = document.getElementById('post-search')

  if (!search) return

  search.addEventListener('input', () => {
    filterMachines(search.value)
  })
})
