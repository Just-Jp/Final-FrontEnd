document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const apiUrl = "https://681be2676ae7c794cf70195d.mockapi.io/ateliealien/Produtos";
  let cart = JSON.parse(localStorage.getItem('alienCart')) || [];
  
  updateCartCount();

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      productList.innerHTML = "";

      data.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img src="${product.imagem}" alt="${product.nome}">
          <div class="card-content">
            <h2>${product.nome}</h2>
            <p class="price">R$ ${parseFloat(product.preco).toFixed(2)}</p>
            <div class="card-buttons">
              <button class="btn btn-cart" data-id="${product.id}" data-name="${product.nome}" data-price="${product.preco}" data-image="${product.imagem}">Adicionar ao Carrinho</button>
            </div>
          </div>
        `;

        productList.appendChild(card);
      });
      
      document.querySelectorAll(".btn-cart").forEach(button => {
        button.addEventListener("click", addToCart);
      });

      if (window.innerWidth <= 599) {
        const cards = document.querySelectorAll(".card");
        let currentIndex = 0;

        function showCard(index) {
          cards.forEach((card, i) => {
            card.classList.toggle("active", i === index);
          });
        }

        document.getElementById("prevBtn").onclick = () => {
          currentIndex = (currentIndex - 1 + cards.length) % cards.length;
          showCard(currentIndex);
        };

        document.getElementById("nextBtn").onclick = () => {
          currentIndex = (currentIndex + 1) % cards.length;
          showCard(currentIndex);
        };

        showCard(currentIndex);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar produtos:", error);
      productList.innerHTML = "<p>Erro ao carregar produtos 😢</p>";
    });
    
  function addToCart(event) {
    const button = event.target;
    const id = button.getAttribute("data-id");
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    const image = button.getAttribute("data-image");
    
    const existingItemIndex = cart.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        image,
        quantity: 1
      });
    }
    
    localStorage.setItem('alienCart', JSON.stringify(cart));
    updateCartCount();
    showAddedToCartMessage(name);
  }
  
  function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  }
  
  function showAddedToCartMessage(productName) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("cart-message");
    messageElement.innerHTML = `<p>✅ ${productName} adicionado ao carrinho!</p>`;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
      messageElement.classList.add("fade-out");
      setTimeout(() => {
        document.body.removeChild(messageElement);
      }, 500);
    }, 2500);
  }
});