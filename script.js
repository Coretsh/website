function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('active');
}
