document.addEventListener("DOMContentLoaded", () => {
    const productoId = new URLSearchParams(window.location.search).get("id");
    if (!productoId) return;

    fetch("./js/productos.json")
        .then((response) => response.json())
        .then((productos) => {
            const producto = productos.find(p => p.id == productoId);
            if (producto) {
                document.getElementById("detalle-producto").innerHTML = `
                    <div class="producto-detalles">
                        <h2 id="titulo-producto">${producto.titulo}</h2>
                        <p id="descripcion-producto">${producto.descripcion}</p>
                        <p id="medidas-producto"><strong>Medidas:${producto.medidas}</strong></p>
                        <p id="precio-producto"><strong>Precio: $${producto.precio}</strong></p>
                        
                        <div class="producto-carousel">
                            <div class="imagenes-adicionales">
                                ${producto.imagenes_adicionales.map(img => `
                                    <img src="${img}" alt="Imagen adicional de ${producto.titulo}" class="imagen-adicional">
                                `).join('')}
                            </div>
                            <div class="imagen-principal-contenedor">
                                <img id="imagen-principal" src="${producto.imagen}" alt="${producto.titulo}" class="producto-imagen-principal">
                            </div>
                        </div>
                    </div>
                `;

                const imagenesAdicionales = document.querySelectorAll(".imagen-adicional");
                const imagenPrincipal = document.getElementById("imagen-principal");

                imagenesAdicionales.forEach(img => {
                    img.addEventListener("click", () => {
                        imagenPrincipal.src = img.src;
                    });
                });
            } else {
                document.getElementById("detalle-producto").innerHTML = "<p>Producto no encontrado.</p>";
            }
        })
        .catch(error => console.error("Error al cargar los detalles del producto:", error));
});
