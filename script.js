//Actualizar titulo
function updateTitle() {
    const currentPage = document.location.pathname.split('/').pop().split('.')[0];
    const pageName = currentPage === 'index' || currentPage === '' ? 'Home' : 
                    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    document.title = `${pageName} | Starbucks`;
}
window.onload = updateTitle;

fetch('header.html')
.then(response => response.text())
.then(data => {
    document.getElementById('header-container').innerHTML = data;
});