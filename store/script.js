document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const apiUrl = "https://681be2676ae7c794cf70195d.mockapi.io/ateliealien/Produtos"; 
  
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
                <button class="btn btn-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
              </div>
            </div>
          `;
  
          productList.appendChild(card);
        });
  
      // RESPONSIVIDADE
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
  });
  
  