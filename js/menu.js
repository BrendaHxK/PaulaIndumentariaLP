document.addEventListener("DOMContentLoaded", () => {
    const openMenuButton = document.getElementById("open-menu");
    const closeMenuButton = document.getElementById("close-menu");
    const sidebar = document.getElementById("sidebar");

    // Abrir el menú
    openMenuButton.addEventListener("click", () => {
        sidebar.classList.add("open");
    });

    // Cerrar el menú
    closeMenuButton.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener("click", (e) => {
        if (sidebar.classList.contains("open") && !sidebar.contains(e.target) && !openMenuButton.contains(e.target)) {
            sidebar.classList.remove("open");
        }
    });
});
