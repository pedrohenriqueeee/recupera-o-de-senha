// Evento do botão de gerar senha
document.getElementById('gerar-senha').addEventListener('click', function () {
    const usarMaiusculas = document.getElementById('maiusculas').checked;
    const usarMinusculas = document.getElementById('minusculas').checked;
    const usarNumeros = document.getElementById('numeros').checked;
    const usarSimbolos = document.getElementById('simbolos').checked;

    // Caracteres possíveis
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()-_=+[]{}|;:,.<>?/';

    let caracteres = '';
    if (usarMaiusculas) caracteres += letrasMaiusculas;
    if (usarMinusculas) caracteres += letrasMinusculas;
    if (usarNumeros) caracteres += numeros;
    if (usarSimbolos) caracteres += simbolos;

    // Caso nenhuma opção tenha sido selecionada
    if (caracteres === '') {
        document.getElementById('senha').value = 'Selecione ao menos uma opção!';
        return;
    }

    // Gerar senha aleatória
    const tamanhoSenha = 12; // Tamanho fixo da senha (você pode personalizar isso)
    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {
        const rand = Math.floor(Math.random() * caracteres.length);
        senha += caracteres[rand];
    }

    // Exibir a senha gerada
    document.getElementById('senha').value = senha;
});
