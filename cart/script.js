
// FINALIZAR COMPRA

function finalizarCompra() {
  Swal.fire({
    title: 'Compra Finalizada!',
    text: 'Obrigado por comprar com o Ateliê Alien 👽',
    icon: 'success',
    confirmButtonText: 'Ir para confirmação'
  }).then((result) => {
    if(result.isConfirmed) {
      window.location.href = "finalize.html";
    }
  });
}

document.querySelector('.checkout-btn').addEventListener('click', finalizarCompra);

// TOTAL COMPRA

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


// FRETE


// qd o botao id=calcFre for clicado, ele vai executar a funcao abaixo
document.getElementById('calcFre').addEventListener('click', () => {

  // pega o q o usuario digitar (é tipo um "leia")
  const cep = document.getElementById('cep').value;

  // SE o cep nao tiver exatamente 8 digitos, BOOMM! ele da erro :(
  // SE o cara meter letra ou emoji no campo do cep, BOOMM!! ele da erro de novo 
  // dando erro ele mostra a caixa de alerta (Swal.fire)
  // e vai dando return ate a condição ser verdadeira

  if (cep.length !== 8 || isNaN(cep)) {
    Swal.fire('CEP inválido', 'Digite um CEP com 8 números.', 'warning');
    return;
  }

  // aq eu botei qualquer valor pro frete pra nao usar uma API do correio

  const cepCalc = Math.floor(Math.random() * 30); // valor fixo fictício
  document.getElementById('cepTot').textContent = `Frete: R$ ${cepCalc.toFixed(2)}`;

  // aq eu pego o valor total da compra e somo com o valor do frete
  const subtotalTexto = document.getElementById('total').textContent.replace('R$ ', '');
  const subtotal = parseFloat(subtotalTexto.replace(',', '.'));
  const totalComFrete = subtotal + cepCalc;

  document.getElementById('total').textContent = `R$ ${totalComFrete.toFixed(2)}`;
});

// aqui ele da uma caixinha de alerta

const cep = document.getElementById('cep');
cep.addEventListener('blur', function() {
  const valorDigitado = cep.value;
  if (valorDigitado.trim() == '') {
     Swal.fire('Digite seu CEP');
    
    // aqui ele zera o valor do frete sempre que sai do campo
    document.getElementById('cepTot').textContent = `Frete: R$ 0.00`;
  }
} )
