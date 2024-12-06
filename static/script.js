// static/script.js
document.addEventListener('DOMContentLoaded', function() {
    const nomeInput = document.getElementById('nome');
    const adicionarBtn = document.getElementById('adicionar');
    const finalizarBtn = document.getElementById('finalizar');
    const sortearBtn = document.getElementById('sortear');
    const novoSorteioBtn = document.getElementById('novo-sorteio');
    const reiniciarBtn = document.getElementById('reiniciar');
    const listaNomes = document.getElementById('lista-nomes');
    const listaGanhadores = document.getElementById('lista-ganhadores');

    const tamboresAudio = new Audio('/static/audio/furem_os_tambores.mp3');
    tamboresAudio.load();

    let listaFinalizada = false;
    let ganhadores = [];

    adicionarBtn.addEventListener('click', function() {
        const nome = nomeInput.value.trim();
        if (nome) {
            fetch('/adicionar_nome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nome })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    atualizarListaNomes(data.nomes);
                    nomeInput.value = '';
                    const msg = new SpeechSynthesisUtterance(`Nome ${nome} adicionado à lista`);
                    msg.lang = 'pt-BR';
                    window.speechSynthesis.speak(msg);
                }
            });
        } else {
            alert('Por favor, digite um nome!');
        }
    });

    finalizarBtn.addEventListener('click', function() {
        if (listaNomes.children.length > 0) {
            listaFinalizada = true;
            adicionarBtn.disabled = true;
            finalizarBtn.disabled = true;
            nomeInput.disabled = true;
            sortearBtn.disabled = false;
            
            const nomes = Array.from(listaNomes.children)
                .map(p => p.textContent)
                .join(', ');
            const msg = new SpeechSynthesisUtterance(`Os nomes incluídos na lista são: ${nomes}`);
            msg.lang = 'pt-BR';
            window.speechSynthesis.speak(msg);
        } else {
            alert('Adicione pelo menos um nome à lista!');
        }
    });

    async function realizarSorteio() {
        try {
            await tamboresAudio.play();

            const response = await fetch('/realizar_sorteio', {
                method: 'POST'
            });
            const data = await response.json();

            await new Promise(resolve => {
                tamboresAudio.onended = resolve;
            });

            if (data.success) {
                const ganhador = data.vencedor;
                ganhadores.push(ganhador);
                
                const p = document.createElement('p');
                p.textContent = `${ganhadores.length}º Lugar: ${ganhador}`;
                listaGanhadores.appendChild(p);

                const msg = new SpeechSynthesisUtterance(`${ganhadores.length}º lugar: ${ganhador}`);
                msg.lang = 'pt-BR';
                window.speechSynthesis.speak(msg);

                if (data.restantes > 0) {
                    novoSorteioBtn.disabled = false;
                    const msgRestantes = new SpeechSynthesisUtterance(`Restam ${data.restantes} nomes para sortear`);
                    msgRestantes.lang = 'pt-BR';
                    window.speechSynthesis.speak(msgRestantes);
                } else {
                    novoSorteioBtn.disabled = true;
                    const msgFinal = new SpeechSynthesisUtterance('Todos os nomes já foram sorteados');
                    msgFinal.lang = 'pt-BR';
                    window.speechSynthesis.speak(msgFinal);
                }
            } else if (data.todosSort) {
                alert('Todos os nomes já foram sorteados! Reinicie a aplicação para um novo sorteio.');
                novoSorteioBtn.disabled = true;
            }
        } catch (error) {
            console.error('Erro ao realizar sorteio:', error);
            alert('Ocorreu um erro ao realizar o sorteio!');
        }
    }

    sortearBtn.addEventListener('click', async function() {
        sortearBtn.disabled = true;
        novoSorteioBtn.disabled = true;
        await realizarSorteio();
    });

    novoSorteioBtn.addEventListener('click', async function() {
        novoSorteioBtn.disabled = true;
        await realizarSorteio();
    });

    reiniciarBtn.addEventListener('click', function() {
        listaNomes.innerHTML = '';
        listaGanhadores.innerHTML = '';
        ganhadores = [];
        
        nomeInput.value = '';
        nomeInput.disabled = false;
        adicionarBtn.disabled = false;
        finalizarBtn.disabled = false;
        sortearBtn.disabled = true;
        novoSorteioBtn.disabled = true;
        listaFinalizada = false;

        fetch('/reiniciar', {
            method: 'POST'
        });

        const msg = new SpeechSynthesisUtterance('Aplicação reiniciada');
        msg.lang = 'pt-BR';
        window.speechSynthesis.speak(msg);
    });

    function atualizarListaNomes(nomes) {
        listaNomes.innerHTML = '';
        nomes.forEach(nome => {
            const p = document.createElement('p');
            p.textContent = nome;
            listaNomes.appendChild(p);
        });
    }

    nomeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !listaFinalizada) {
            adicionarBtn.click();
        }
    });
});