document.getElementById('gerar-senha').addEventListener('click', function () {
    const usarMaiusculas = document.getElementById('maiusculas').checked;
    const usarMinusculas = document.getElementById('minusculas').checked;
    const usarNumeros = document.getElementById('numeros').checked;
    const usarSimbolos = document.getElementById('simbolos').checked;

    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

    let caracteres = '';
    if (usarMaiusculas) caracteres += letrasMaiusculas;
    if (usarMinusculas) caracteres += letrasMinusculas;
    if (usarNumeros) caracteres += numeros;
    if (usarSimbolos) caracteres += simbolos;

    if (caracteres === '') {
        document.getElementById('senha').value = 'Selecione ao menos uma opção!';
        return;
    }

    const tamanhoSenha = 12;
    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {
        const rand = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[rand];
    }

    document.getElementById('senha').value = senha;
});


