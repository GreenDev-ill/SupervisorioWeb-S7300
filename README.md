# SupervisorioWeb-S7300
Supervosrio SCADA de um CLP S7300 com conexão via CP343-1 Lean Ethernet

Passo 1: Configuração do Projeto (Backend)
Crie uma pasta para o seu projeto e navegue até ela no terminal:

Bash

mkdir scada-test-s7
cd scada-test-s7
Inicie um projeto Node.js:

Bash

npm init -y
Instale as dependências necessárias:

Bash

npm install express socket.io node-snap7
Crie uma subpasta chamada public para guardar os arquivos do frontend:

Bash

mkdir public

Passo 2: Configuração das Variáveis no CLP (Exemplo)
Para este exemplo, vamos assumir que você configurou um Data Block (DB), por exemplo, o DB1, com as seguintes variáveis:

Endereço	Símbolo	Tipo de Dado	Descrição
DB1.DBX0.0	g_bTeste	BOOL	Bit de teste que será setado/resetado.
DB1.DBW2	g_iTeste	INT	Variável inteira de teste.
DB1.DBD4	g_rTeste	REAL	Variável real de teste.

Passo 5: Rodando a Aplicação
Certifique-se de que seu CLP S7-300 está ligado e conectado à mesma rede que o seu computador.

No terminal, na raiz do seu projeto (scada-test-s7), execute o servidor:

Bash

node server.js
Você deverá ver a mensagem: Servidor SCADA rodando em http://localhost:3000 e, em seguida, uma mensagem de sucesso ou erro da conexão com o CLP.

Abra seu navegador de internet (Chrome, Firefox, etc.) e acesse o endereço:
http://localhost:3000

Você verá a interface web. Se tudo estiver correto, o status da conexão aparecerá como "Conectado" e os valores lidos do CLP serão exibidos e atualizados a cada segundo. Você poderá usar os botões e campos para alterar os valores diretamente no Data Block do seu S7-300.
