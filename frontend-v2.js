// public/client.js

// Conecta ao servidor Socket.IO que está rodando no mesmo endereço
const socket = io();

// --- Elementos da UI ---
const plcStatusElem = document.getElementById('plc-status');
const bitValueElem = document.getElementById('bit-value');
const intValueElem = document.getElementById('int-value');
const realValueElem = document.getElementById('real-value');

const setBitBtn = document.getElementById('set-bit-btn');
const resetBitBtn = document.getElementById('reset-bit-btn');
const writeIntBtn = document.getElementById('write-int-btn');
const writeRealBtn = document.getElementById('write-real-btn');

const intInput = document.getElementById('int-input');
const realInput = document.getElementById('real-input');

// --- Lógica para atualizar a UI com dados do CLP ---
socket.on('plc-data', (data) => {
    // Atualiza o status da conexão
    plcStatusElem.textContent = data.status;
    if (data.status === 'Conectado') {
        plcStatusElem.className = 'connected';

        // Atualiza os valores na tela
        const { bitTeste, intTeste, realTeste } = data.values;
        bitValueElem.textContent = bitTeste ? 'LIGADO (1)' : 'DESLIGADO (0)';
        intValueElem.textContent = intTeste;
        realValueElem.textContent = realTeste.toFixed(3); // Formata para 3 casas decimais

    } else {
        plcStatusElem.className = 'disconnected';
        bitValueElem.textContent = '--';
        intValueElem.textContent = '--';
        realValueElem.textContent = '--';
    }
});

// --- Lógica para enviar comandos para o CLP ---

// Botão SETAR BIT
setBitBtn.addEventListener('click', () => {
    console.log('Enviando comando para SETAR o bit');
    socket.emit('write-bit', { value: true });
});

// Botão RESETAR BIT
resetBitBtn.addEventListener('click', () => {
    console.log('Enviando comando para RESETAR o bit');
    socket.emit('write-bit', { value: false });
});

// Botão ENVIAR INT
writeIntBtn.addEventListener('click', () => {
    const value = intInput.value;
    if (value !== '') {
        console.log(`Enviando valor INT: ${value}`);
        socket.emit('write-int', { value: value });
    } else {
        alert('Por favor, insira um valor inteiro.');
    }
});

// Botão ENVIAR REAL
writeRealBtn.addEventListener('click', () => {
    const value = realInput.value;
    if (value !== '') {
        console.log(`Enviando valor REAL: ${value}`);
        socket.emit('write-real', { value: value });
    } else {
        alert('Por favor, insira um valor real.');
    }
});
