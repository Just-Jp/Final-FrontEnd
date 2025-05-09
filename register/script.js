const urlApi = 'https://681e1b37c1c291fa663309e8.mockapi.io/v1/users';
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerPasswordConfirm = document.getElementById('register-password-confirm');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const registerButton = document.querySelector('.sign-up button');
const loginButton = document.querySelector('.sign-in button');

registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    registerUser();
});

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    loginUser();
});

async function registerUser() {
    const name = registerName.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const passwordConfirm = registerPasswordConfirm.value;

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
        }

    } catch (error) {
        alert("Erro de rede. Tente novamente mais tarde.");
        console.error(error);
    }
}

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
        }
    } catch (error) {
        alert("Erro.");
        console.error(error);
    }
}

function clearForms() {
    registerName.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    registerPasswordConfirm.value = '';
    loginEmail.value = '';
    loginPassword.value = '';
}