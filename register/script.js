//escopo de variaveis
const urlApi = 'https://681e1b37c1c291fa663309e8.mockapi.io/v1/users';
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerPasswordConfirm = document.getElementById('register-password-confirm');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const registerButton = document.querySelector('.sign-up button');
const loginButton = document.querySelector('.sign-in button');

//sempre que o botão registrar é clicado a função de registro é executada
registerButton.addEventListener('click', (e) => {                                                   
    e.preventDefault();
    registerUser();
});

//sempre que o botão entrar é clicado a função de login é executada
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    loginUser();
});

//função de registro
async function registerUser() {                                                                    
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const passwordConfirm = registerPasswordConfirm.value;
    
    //a confirmação da senha deve coincidir com a primeira senha informada
    if (password !== passwordConfirm) {
        alert("As senhas não coincidem!");
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Usuário registrado.");
            clearForms();
        } else {
            alert("Erro ao registrar usuário.");
            clearForms();
        }

    } catch (error) {
        alert("Erro de rede. Tente novamente mais tarde.");
        console.error(error);
    }
}

//função de login 
async function loginUser() {
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
        const response = await fetch(`${urlApi}?email=${email}&password=${password}`);
        const users = await response.json();

        if (response.ok && users.length > 0) {
            alert("Login bem-sucedido!");
            clearForms();
        } else {
            alert("Usuário e/ou senhas incorretos. Tente novamente.");
            clearForms();
        }
    } catch (error) {
        alert("Erro.");
        console.error(error);
    }
}

//função para limpar os campos do site após operações de login ou registro que são bem sucedidas
function clearForms() {                                 
    registerName.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    registerPasswordConfirm.value = '';
    loginEmail.value = '';
    loginPassword.value = '';
}