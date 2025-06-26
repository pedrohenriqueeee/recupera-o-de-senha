document.getElementById('gerar-senha').addEventListener('click', function () {
    const incluirMaiusculas = document.getElementById('maiusculas').checked;
    const incluirMinusculas = document.getElementById('minusculas').checked;
    const incluirNumeros = document.getElementById('numeros').checked;
    const incluirSimbolos = document.getElementById('simbolos').checked;

    const comprimentoSenha = 12; // Você pode permitir que o usuário defina esse valor futuramente

    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+[]{}|;:,.<>?';

    let caracteres = '';
    if (incluirMaiusculas) caracteres += letrasMaiusculas;
    if (incluirMinusculas) caracteres += letrasMinusculas;
    if (incluirNumeros) caracteres += numeros;
    if (incluirSimbolos) caracteres += simbolos;

    if (caracteres === '') {
        document.getElementById('senha').value = 'Selecione pelo menos uma opção!';
        return;
    }

    let senha = '';
    for (let i = 0; i < comprimentoSenha; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        senha += caracteres.charAt(indice);
    }

    document.getElementById('senha').value = senha;
});

