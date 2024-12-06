# Aplicação de Sorteio Web

Uma aplicação web para realizar sorteios de forma interativa, com suporte a áudio e feedback por voz.

## Funcionalidades

- Adição dinâmica de nomes à lista de sorteio
- Sorteios múltiplos sem repetição
- Feedback por voz para todas as ações
- Som de tambores durante o sorteio
- Histórico de ganhadores
- Interface responsiva e amigável
- Opção de reiniciar a aplicação

## Requisitos

- Python 3.6 ou superior
- Flask
- pyttsx3

## Instalação

1. Clone o repositório:
```bash
git clone https://seu-repositorio/sorteio-webapp.git
cd sorteio-webapp
```

2. Crie um ambiente virtual (opcional, mas recomendado):
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. Instale as dependências:
```bash
pip install flask pyttsx3
```

4. Estrutura de arquivos:
```
sorteio-webapp/
├── app.py
├── static/
│   ├── audio/
│   │   └── furem_os_tambores.mp3
│   ├── style.css
│   └── script.js
├── templates/
│   └── index.html
└── README.md
```

5. Adicione seu arquivo de áudio:
- Coloque o arquivo `furem_os_tambores.mp3` na pasta `static/audio/`

## Executando a Aplicação

1. Inicie o servidor:
```bash
python app.py
```

2. Acesse a aplicação no navegador:
```
http://localhost:5000
```

## Como Usar

1. **Adicionar Nomes**:
   - Digite um nome no campo de texto
   - Clique em "Adicionar Nome" ou pressione Enter
   - Repita para todos os participantes

2. **Finalizar Lista**:
   - Clique em "Finalizar Lista" quando todos os nomes estiverem adicionados
   - A aplicação lerá todos os nomes incluídos

3. **Realizar Sorteio**:
   - Clique em "Iniciar Sorteio"
   - Aguarde o som dos tambores
   - O resultado será anunciado e exibido na tela

4. **Sortear Novamente**:
   - Use o botão "Sortear Novamente" para mais sorteios
   - Cada nome só pode ser sorteado uma vez
   - O botão será desabilitado quando todos os nomes forem sorteados

5. **Reiniciar**:
   - Clique em "Reiniciar Aplicação" para começar um novo sorteio
   - Todos os dados serão limpos

## Recursos

- Interface web responsiva
- Síntese de voz para feedback
- Efeitos sonoros
- Histórico de ganhadores
- Prevenção de sorteios duplicados

## Contribuindo

Sinta-se à vontade para enviar pull requests com melhorias ou correções.

## Licença

Este projeto está licenciado sob a MIT License.

