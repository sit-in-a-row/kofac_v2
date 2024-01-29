var currentPageIndex = 0;
var pageUrls = ['pg1/index.html', 'pg2/index.html', 'pg2.5/index.html', 'pg3/index.html', 'pg4/index.html', 'pg5/index.html', 'pg6/index.html'];

function changePage(url) {
  document.getElementById('page-frame').src = url;
}

function nextPage() {
  currentPageIndex = (currentPageIndex + 1) % pageUrls.length;
  changePage(pageUrls[currentPageIndex]);
}

function prevPage() {
  currentPageIndex = (currentPageIndex - 1 + pageUrls.length) % pageUrls.length;
  changePage(pageUrls[currentPageIndex]);
}