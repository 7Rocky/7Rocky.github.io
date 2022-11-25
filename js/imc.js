async function typeset(code) {
  await MathJax.startup.promise
  return await MathJax.typesetPromise(code())
}

async function getProblem(lang, year, number) {
  const res = await fetch(
    `https://raw.githubusercontent.com/7Rocky/imc-problems/master/problems-${lang}/imc_${year}/pimc_${number}_${year}.tex`
  )
  const text = await res.text()
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

  try {
    await typeset(() => [`#pimc_${number}_${year}`])
  } catch (err) {
    console.error(err.message)
  }
}

const pdfJsLib = window['pdfjs-dist/build/pdf']

if (pdfJsLib)
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
