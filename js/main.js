function getProblem(lang, year, number) {
  fetch(
    `https://raw.githubusercontent.com/7Rocky/imc-problems/master/problems-${lang}/imc_${year}/pimc_${number}_${year}.tex`
  )
    .then(res => res.text())
    .then(text => {
      const div = document.querySelector(`#pimc_${number}_${year}`)

      const begin = text.indexOf('\\begin{shaded}') + '\\begin{shaded}'.length
      const end = text.indexOf('\\end{shaded}')
      let problem = text.substring(begin, end).trim()

      problem = problem
        .replaceAll(/\\begin{enumerate}[\s\S]*?$/gm, '<ol>')
        .replaceAll(/\\begin{itemize}[\s\S]*?$/gm, '<ul>')
        .replaceAll('\\end{enumerate}', '</li></ol>')
        .replaceAll('\\end{itemize}', '</li></ul>')
        .replace('\\item', '<li>')
        .replaceAll('\\item', '</li><li>')

      const textits = problem.match(/\\textit\{(.*?)\}/gm)

      if (textits) {
        for (const textit of textits) {
          const it = textit.substring(8, textit.length - 1)
          problem = problem.replace(`\\textit{${it}}`, `<em>${it}</em>`)
        }
      }

      div.innerHTML = problem
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, `pimc_${number}_${year}`])
    })
}

const pdfJsLib = window['pdfjs-dist/build/pdf']
pdfJsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js'

function renderPdf(url, canvasContainer) {
  const renderPage = page => {
    const viewport = page.getViewport({ scale: 2 })
    const canvas = document.createElement('canvas')
    const canvasContext = canvas.getContext('2d')

    canvas.height = viewport.height
    canvas.width = viewport.width
    canvas.style.width = '100%'

    canvasContainer.appendChild(canvas)

    const renderContext = { canvasContext, viewport }
    page.render(renderContext)
  }

  const renderPages = pdfDoc => {
    for (let num = 1; num <= pdfDoc.numPages; num++) {
      pdfDoc.getPage(num).then(renderPage)
    }
  }

  pdfJsLib.getDocument(url).promise.then(renderPages)
}

function getProblemPdf(lang, year, number) {
  renderPdf(
    `https://raw.githubusercontent.com/7Rocky/imc-problems/master/problems-${lang}/imc_${year}/pimc_${number}_${year}.pdf`,
    document.getElementById('holder')
  )
}

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
