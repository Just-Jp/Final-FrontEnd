//escopo de variaveis
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

//sempre que o botão registrar é clicado a tag active é adicionada a div do container
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

//sempre que o botão iniciar sessão é clicado a tag active é removida a div do container
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});