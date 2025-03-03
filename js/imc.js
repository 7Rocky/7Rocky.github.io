const { pdfjsLib } = globalThis;

if (pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js'
}

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

  pdfjsLib.getDocument(url).promise.then(renderPages)
}

function getProblemPdf(lang, year, number) {
  renderPdf(
    `https://raw.githubusercontent.com/7Rocky/imc-problems/master/problems-${lang}/imc_${year}/pimc_${number}_${year}.pdf`,
    document.getElementById('holder')
  )
}
