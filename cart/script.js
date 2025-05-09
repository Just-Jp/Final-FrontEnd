
function finalizarCompra() {
  Swal.fire({
    title: 'Compra Finalizada!',
    text: 'Obrigado por comprar com o Ateliê Alien 👽',
    icon: 'success',
    confirmButtonText: 'Fechar'
  });
}

document.querySelector('.checkout-btn').addEventListener('click', finalizarCompra);

// esse document queryselector pega todos os produtos no carrinho p tal função
// o let subtotal é pra somar o total de todos os itens

function atualizarResumo() {
  const itens = document.querySelectorAll('.cart-item');
  let subtotal = 0;

  // o foreach anda todos os itens do carrinho e faz o q eu peço
  // o querySelector('p:nth-of-type(2)') pega so o paragrafo que tem o preço
  // o querySelector('p:nth-of-type(3)') pega o paragrafo q tem a quantidade

  itens.forEach(item => {
    const precoTexto = item.querySelector('p:nth-of-type(2)').textContent;
    const quantidadeTexto = item.querySelector('p:nth-of-type(3)').textContent;

    // o parse transforma txt em num., tanto int como decimal

    const preco = parseFloat(precoTexto.replace('Preço: R$ ', '').replace(',', '.'));
    const quantidade = parseInt(quantidadeTexto.replace('Quantidade: ', ''));

    // aq literalmente so multiplica e dps soma

    const totalItem = preco * quantidade;
    subtotal += totalItem;

    // aq ele pega o total que deu e atualiza o texto
    // o tofixed(2) se nao me engano formata em 2 casas decimais

    const totalItemEl = item.querySelector('.item-total');
    if (totalItemEl) {
      totalItemEl.textContent = `Total: R$ ${totalItem.toFixed(2)}`;
    }
  });

  // atualiza o total geral

  document.getElementById('total').textContent = `R$ ${subtotal.toFixed(2)}`;
}

// aq faz com que a função atualizarResumo() rode assim q a pag carregar, isso faz que o valor apareca certinho desde o inicio

document.addEventListener('DOMContentLoaded', () => {
  atualizarResumo();
});