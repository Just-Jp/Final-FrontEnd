
function finalizarCompra() {
    Swal.fire({
      title: 'Compra Finalizada!',
      text: 'Obrigado por comprar com o Ateliê Alien 👽',
      icon: 'success',
      confirmButtonText: 'Fechar'
    });
  }
  
  document.querySelector('.checkout-btn').addEventListener('click', finalizarCompra);
  