// Função para gerar uma senha segura
function gerarSenha() {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?/";
    const tamanhoSenha = 16; // Tamanho da senha gerada
    let senha = '';

    // Usar a data atual e funções matemáticas para criar um valor único
    let valorUnico = Math.random() * Date.now();
    valorUnico = Math.floor(valorUnico);

    // Gerar a senha combinando valores aleatórios e o valor único
    for (let i = 0; i < tamanhoSenha; i++) {
        let index = (valorUnico + i) % caracteres.length;
        senha += caracteres[index];
    }

    // Exibir a senha no campo de entrada
    document.getElementById('senha').value = senha;
}

// Adicionar evento ao botão para gerar a senha
document.getElementById('gerar-senha').addEventListener('click', gerarSenha);
