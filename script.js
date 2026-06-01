let carritoContador = 0;

function irAProducto() {
    window.location.href = 'producto.html';
}

function toggleCarrito() {
    const cart = document.getElementById('shopping-cart');
    cart.classList.toggle('hidden');
    
    if (!cart.classList.contains('hidden') && carritoContador > 0) {
        renderizarPasarelaPagos();
    }
}

function agregarAlCarrito() {
    carritoContador++;
    document.getElementById('cart-count').innerText = carritoContador;
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-weight:bold;">
            <span>Bálsamo para Perritos (x${carritoContador})</span>
            <span>$${carritoContador * 65}.00 MXN</span>
        </div>
    `;
    
    if (!document.getElementById('shopping-cart').classList.contains('hidden')) {
        renderizarPasarelaPagos();
    }
    
    alert("¡Bálsamo añadido al carrito de PetConnect! 🐾");
}

function comprarAhora() {
    if(carritoContador === 0) {
        agregarAlCarrito();
    }
    const cart = document.getElementById('shopping-cart');
    cart.classList.remove('hidden');
    renderizarPasarelaPagos();
}

function verProximoProducto() {
    alert("¡Próximamente! En PetConnect estamos preparando nuevos lanzamientos para el cuidado de tu mascota. Síguenos en Instagram para enterarte antes que nadie. 🐾");
}

function renderizarPasarelaPagos() {
    document.getElementById('paypal-button-container').innerHTML = "";
    
    paypal.Buttons({
        createOrder: function(data, actions) {
            let precioTotal = (carritoContador * 65).toFixed(2);
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'MXN',
                        value: precioTotal
                    },
                    description: `Compra de ${carritoContador} Bálsamo(s) en PetConnect`
                }]
            });
        },
        
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert(`¡Guau! Pago procesado con éxito en PetConnect. Gracias por tu compra, ${details.payer.name.given_name}. ✨`);
                
                carritoContador = 0;
                document.getElementById('cart-count').innerText = 0;
                document.getElementById('cart-items').innerHTML = '<p>El carrito está vacío.</p>';
                document.getElementById('paypal-button-container').innerHTML = '';
                toggleCarrito();
            });
        },

        onError: function(err) {
            console.error(err);
            alert("Hubo un problema al procesar la transacción. Por favor, inténtalo de nuevo.");
        }
    }).render('#paypal-button-container');
}

function buscarProducto() {
    let query = document.getElementById('searchInput').value.toLowerCase();
    if (query.includes('balsamo') || query.includes('perro') || query.includes('huella')) {
        alert("¡Producto encontrado! Mostrando: Bálsamo Humectante.");
    } else {
        alert("Lo sentimos, en PetConnect solo contamos con nuestro Bálsamo estrella por el momento.");
    }
}

function toggleAIChat() {
    const chat = document.getElementById('ai-chat-window');
    chat.classList.toggle('hidden');
}

function enviarMensajeIA() {
    const input = document.getElementById('aiInput');
    const mensajeTexto = input.value.trim();
    if (mensajeTexto === "") return;

    const aiBody = document.getElementById('aiBody');
    const userDiv = document.createElement('p');
    userDiv.className = 'user-msg';
    userDiv.innerText = mensajeTexto;
    aiBody.appendChild(userDiv);
    input.value = "";
    aiBody.scrollTop = aiBody.scrollHeight;

    setTimeout(() => {
        const botDiv = document.createElement('p');
        botDiv.className = 'bot-msg';
        let respuesta = "Como tu asistente PetBot, te comento que nuestro bálsamo es 100% orgánico e ideal para proteger las huellitas de tu perrito.";
        
        if (mensajeTexto.toLowerCase().includes('precio') || mensajeTexto.toLowerCase().includes('cuanto cuesta')) {
            respuesta = "El bálsamo en PetConnect tiene un costo de $180.00 MXN neto.";
        } else if (mensajeTexto.toLowerCase().includes('proximos') || mensajeTexto.toLowerCase().includes('productos') || mensajeTexto.toLowerCase().includes('catalogo')) {
            respuesta = "¡Muy pronto en PetConnect ampliaremos nuestro catálogo! Tendremos increíbles sorpresas para tu mascota.";
        } else if (mensajeTexto.toLowerCase().includes('ingredientes') || mensajeTexto.toLowerCase().includes('lamer')) {
            respuesta = "Es totalmente seguro si se lame. Contiene manteca de cacao pura, aceite de coco y cera de abeja. No contiene químicos.";
        }
        
        botDiv.innerText = respuesta;
        aiBody.appendChild(botDiv);
        aiBody.scrollTop = aiBody.scrollHeight;
    }, 1000);
}