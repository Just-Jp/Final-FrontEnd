
        document.addEventListener('DOMContentLoaded', () => {
            const cartItemsContainer = document.getElementById('cart-items');
            const cartSummaryContainer = document.getElementById('cart-summary');

            function displayCart() {
                let cart = JSON.parse(localStorage.getItem('alienCart')) || [];

                if (cart.length === 0) {
                    cartItemsContainer.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
                    cartSummaryContainer.innerHTML = '';
                } else {
                    cartItemsContainer.innerHTML = cart.map(item => `
                        <div class="cart-item flex items-center justify-between bg-white p-4 rounded-md shadow-md">
                            <div class="flex items-center space-x-4">
                                <img src="${item.image}" alt="${item.name}" class="rounded-md">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-800">${item.name}</h3>
                                    <p class="text-gray-600">Preço: R$ ${item.price.toFixed(2)}</p>
                                    <p class="text-gray-700 font-medium">Quantidade: ${item.quantity}</p>
                                </div>
                            </div>
                            <button class="remove-item" data-id="${item.id}">Remover</button>
                        </div>
                    `).join('');

                    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

                    cartSummaryContainer.innerHTML = `
                        <h3>Resumo do Pedido</h3>
                        <div class="cart-total">
                            <span>Total:</span>
                            <span class="font-bold">R$ ${total.toFixed(2)}</span>
                        </div>
                        <button class="checkout-button">Finalizar Compra</button>
                    `;

                    document.querySelectorAll('.remove-item').forEach(button => {
                        button.addEventListener('click', (event) => {
                            const itemId = event.target.dataset.id;
                            let cart = JSON.parse(localStorage.getItem('alienCart')) || []; 
                            cart = cart.filter(item => item.id !== itemId);
                            localStorage.setItem('alienCart', JSON.stringify(cart));
                            displayCart();
                        });
                    });

                    document.querySelector('.checkout-button').addEventListener('click', () => {
                        alert('Redirecionando para o Checkout (funcionalidade não implementada neste exemplo)');
                    });
                }
            }
            displayCart();
        });
