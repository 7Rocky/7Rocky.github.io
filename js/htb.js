function filterMachines(search) {
  let count = 0

  Array.from(document.getElementById('post-list').children).forEach(div => {
    const a = div.querySelector('a')
    const d = a.parentElement.nextElementSibling ?? a

    if (
      a.textContent.toLowerCase().includes(search.toLowerCase()) ||
      d.textContent.toLowerCase().includes(search.toLowerCase())
    ) {
      div.classList.remove('dn')
      count++
    } else {
      div.classList.add('dn')
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
