document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const passwordField = document.getElementById('password');
    const lengthInput = document.getElementById('length');
    const complexitySelect = document.getElementById('complexity');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.getElementById('strength-text');
    const entropyDisplay = document.getElementById('entropy');

    // Caracteres para diferentes níveis de complexidade
    const charSets = {
        simple: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        medium: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        complex: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
        math: '+-*/=<>≤≥≠≈πτΣ√∞∫≈∝≅∼≃≅≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫≬≭≮≯≰≱≲≳≴≵≶≷≸≹≺≻≼≽≾≿⊀⊁⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿'
    };

    // Gerar senha aleatória
    function generateRandomPassword(length, charset) {
        let password = '';
        const chars = charset || charSets.complex;
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            password += chars[randomIndex];
        }
        
        return password;
    }

    // Gerar senha baseada em padrão matemático
    function generateMathPassword(length) {
        // Padrão alternado entre operadores e números
        const operators = '+-*/=<>';
        const numbers = '0123456789';
        let password = '';
        
        for (let i = 0; i < length; i++) {
            if (i % 2 === 0) {
                // Posições pares: números
                const randomIndex = Math.floor(Math.random() * numbers.length);
                password += numbers[randomIndex];
            } else {
                // Posições ímpares: operadores
                const randomIndex = Math.floor(Math.random() * operators.length);
                password += operators[randomIndex];
            }
        }
        
        return password;
    }

    // Calcular entropia da senha
    function calculateEntropy(password, charset) {
        const charsetLength = charset ? charset.length : 
            (password.match(/[a-z]/) ? 26 : 0 +
            (password.match(/[A-Z]/) ? 26 : 0 +
            (password.match(/[0-9]/) ? 10 : 0 +
            (password.match(/[^a-zA-Z0-9]/)) ? 32 : 0;
        
        const length = password.length;
        return Math.log2(Math.pow(charsetLength, length));
    }

    // Avaliar força da senha
    function evaluatePasswordStrength(password) {
        let score = 0;
        
        // Comprimento
        score += password.length * 4;
        
        // Tipos de caracteres
        if (password.match(/[a-z]/)) score += 2;
        if (password.match(/[A-Z]/)) score += 2;
        if (password.match(/[0-9]/)) score += 2;
        if (password.match(/[^a-zA-Z0-9]/)) score += 3;
        
        // Penalidades para padrões simples
        if (password.match(/^[a-zA-Z]+$/)) score -= password.length;
        if (password.match(/^[0-9]+$/)) score -= password.length;
        if (password.match(/(.)\1{2,}/)) score -= 5; // caracteres repetidos
        
        // Normalizar score para 0-100
        score = Math.max(0, Math.min(100, score));
        
        return score;
    }

    // Atualizar visualização da força
    function updateStrengthVisual(score) {
        const strengthBar = document.querySelector('.strength-bar::after');
        const bar = document.querySelector('.strength-bar');
        const pseudoElement = window.getComputedStyle(bar, '::after');
        
        let width = score;
        let color;
        
        if (score < 30) {
            color = 'red';
            strengthText.textContent = 'Força: Fraca';
        } else if (score < 70) {
            color = 'orange';
            strengthText.textContent = 'Força: Média';
        } else {
            color = 'green';
            strengthText.textContent = 'Força: Forte';
        }
        
        // Atualizar a barra de força usando CSS custom properties
        bar.style.setProperty('--strength-width', `${width}%`);
        bar.style.setProperty('--strength-color', color);
        
        // Forçar atualização do pseudo-elemento
        bar.classList.remove('strength-animate');
        void bar.offsetWidth; // Trigger reflow
        bar.classList.add('strength-animate');
    }

    // Gerar senha quando o botão é clicado
    generateBtn.addEventListener('click', function() {
        const length = parseInt(lengthInput.value);
        const complexity = complexitySelect.value;
        
        let password;
        let charset;
        
        if (complexity === 'math') {
            password = generateMathPassword(length);
            charset = charSets.math;
        } else {
            charset = charSets[complexity];
            password = generateRandomPassword(length, charset);
        }
        
        passwordField.value = password;
        
        // Calcular e mostrar entropia
        const entropy = calculateEntropy(password, charset);
        entropyDisplay.textContent = `Entropia: ${entropy.toFixed(2)} bits`;
        
        // Avaliar e mostrar força
        const strengthScore = evaluatePasswordStrength(password);
        updateStrengthVisual(strengthScore);
    });

    // Copiar senha para área de transferência
    copyBtn.addEventListener('click', function() {
        passwordField.select();
        document.execCommand('copy');
        
        // Feedback visual
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    });

    // Inicializar com uma senha gerada automaticamente
    generateBtn.click();
});

// Adicionar estilos dinâmicos para a barra de força
const style = document.createElement('style');
style.textContent = `
.strength-bar::after {
    width: var(--strength-width, 0);
    background-color: var(--strength-color, red);
    transition: width 0.5s ease, background-color 0.5s ease;
}

.strength-animate::after {
    transition: width 0.5s ease, background-color 0.5s ease;
}
`;
document.head.appendChild(style);