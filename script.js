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

document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { name: "Flat White", description: "Doble shot de café espresso con una fina capa de leche.", image: "assets/menu1/Flat White.png" },
        { name: "Espresso", description: "Café espresso con un sabor complejo e intenso.", image: "assets/menu1/Espresso.png" },
        { name: "Macchiato", description: "Shot de espresso con un toque ligero de leche finalizado con una cucharada de leche vaporizada.", image: "assets/menu1/Macchiato.png" },
        { name: "Espresso Panna", description: "Doble shot de espresso con nata.", image: "assets/menu1/Espresso Con Panna.png" }
    ];

    const productsGrid = document.querySelector(".products-grid");

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-container");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;

        productsGrid.appendChild(productDiv);
    });
});

function handleCredentialResponse(response) {
    console.log("JWT Token: " + response.credential);
    
    // Decodificar el token para obtener datos del usuario
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    console.log("Nombre:", payload.name);
    console.log("Correo:", payload.email);
    console.log("Imagen:", payload.picture);

    // Puedes mostrar el nombre o imagen en la UI
    document.body.innerHTML = `<h2>Bienvenido, ${payload.name}</h2><img src="${payload.picture}" alt="Foto de perfil">`;
}

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe sin validar

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('error-message');

    // Validación del correo electrónico
    if (!validateEmail(email)) {
        alert("Por favor, ingresa un correo válido.");
        return; // Detener el flujo si el correo no es válido
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        errorMessage.style.display = 'block'; // Mostrar mensaje de error
    } else {
        errorMessage.style.display = 'none'; // Ocultar mensaje de error si las contraseñas coinciden
        // Aquí puedes proceder con el registro, como enviar el formulario o hacer alguna otra acción
        alert("¡Registro exitoso!");
    }
});

function validateEmail(email) {
    // Validación básica para asegurarse que el correo contiene un "@"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

