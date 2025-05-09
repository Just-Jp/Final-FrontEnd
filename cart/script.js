function removerItem() {
  document.querySelector('.cart-item').remove();
  document.getElementById('total').textContent = 'R$ 0.00';
}