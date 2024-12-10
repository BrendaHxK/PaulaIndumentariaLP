document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.querySelector("#contenedor-productos");
    const enlacesCategorias = document.querySelectorAll(".boton-menu");
    const tituloPrincipal = document.querySelector("#titulo-principal");
    const ordenPrecio = document.querySelector("#orden-precio");
    let productos = [];
    let productosFiltrados = []; // Variable para productos filtrados por categoría

    // Cargar productos desde el archivo JSON
    fetch("./js/productos.json")
        .then((response) => response.json())
        .then((data) => {
            productos = data;
            const params = new URLSearchParams(window.location.search);
            const categoria = params.get("categoria");

            if (categoria) {
                cargarCategoria(categoria);
            } else {
                cargarProductos(productos);
                productosFiltrados = [...productos]; // Inicialmente todos los productos
            }
        })
        .catch((error) => console.error("Error al cargar los productos:", error));

    // Cargar categoría seleccionada
    function cargarCategoria(categoriaSeleccionada) {
        enlacesCategorias.forEach((enlace) => enlace.classList.remove("active"));
        const enlaceActual = document.querySelector(`#${categoriaSeleccionada}`);
        if (enlaceActual) enlaceActual.classList.add("active");

        if (categoriaSeleccionada === "todos") {
            tituloPrincipal.innerText = "Todos los productos";
            productosFiltrados = [...productos];
        } else {
            productosFiltrados = productos.filter(
                (producto) => producto.categoria.id === categoriaSeleccionada
            );
            tituloPrincipal.innerText = productosFiltrados.length
                ? productosFiltrados[0].categoria.nombre
                : "Categoría vacía";
        }
        cargarProductos(productosFiltrados);
    }

    // Cargar productos en el contenedor
    function cargarProductos(productosParaMostrar) {
        contenedorProductos.innerHTML = productosParaMostrar.length
            ? productosParaMostrar.map(producto => `
                <div class="producto">
                    <div class="producto-contenedor">
                        <a href="/detalle_producto.html?id=${producto.id}">
                            <img src="${producto.imagen}" alt="${producto.titulo}" class="producto-imagen" data-id="${producto.id}">
                            <div class="producto-detalles">
                                <h3 class="producto-titulo">${producto.titulo}</h3>
                                <p class="producto-precio">$${producto.precio}</p>
                                <button class="producto-agregar" data-id="${producto.id}">Ver más</button>
                            </div>
                        </a>
                    </div>
                </div>
            `).join('')
            : "<p>No se encontraron productos.</p>";
    }

    // Detectar clics en los enlaces de categorías
    enlacesCategorias.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            if (!e.ctrlKey && !e.metaKey && e.button === 0) {
                e.preventDefault();
                const categoriaSeleccionada = enlace.getAttribute("href").split("=")[1];
                cargarCategoria(categoriaSeleccionada);
                history.pushState({}, '', `?categoria=${categoriaSeleccionada}`);
            }
        });
    });

    // Ordenar por precio en la categoría actual
    ordenPrecio.addEventListener("change", () => {
        let productosOrdenados = [...productosFiltrados];
        if (ordenPrecio.value === "menor-mayor") {
            productosOrdenados.sort((a, b) => a.precio - b.precio);
        } else if (ordenPrecio.value === "mayor-menor") {
            productosOrdenados.sort((a, b) => b.precio - a.precio);
        }
        cargarProductos(productosOrdenados);
    });
});
