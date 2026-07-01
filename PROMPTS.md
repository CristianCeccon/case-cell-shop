# Uso de IA no desenvolvimento

Durante o desenvolvimento deste desafio técnico, utilizei IA como ferramenta de apoio para criação da estrutura inicial do projeto, organização dos arquivos, implementação base do backend, frontend e testes automatizados.

A IA foi utilizada como apoio, mas o código gerado foi revisado manualmente. Após a geração inicial, realizei ajustes necessários em regras de negócio, integração entre frontend e backend, validações e organização geral do projeto.

Nenhuma outra ferramenta de IA foi utilizada além do ChatGPT/Codex.

## Decisões gerais

Como o desafio solicitava uma solução simples, funcional e de fácil execução, optei por manter o projeto com:

- Backend em Node.js, Express e TypeScript;
- Frontend em React, Vite e TypeScript;
- Dados em memória;
- Sem banco de dados;
- Sem autenticação;
- Sem pagamento;
- Sem Docker;
- Sem layout complexo.

A ideia foi priorizar clareza, simplicidade, validações básicas, tratamento de erros e uma entrega executável.

## Prompts utilizados

### 1. Estrutura inicial do projeto

Crie a estrutura de um projeto full stack simples para um desafio técnico chamado CaseCellShop.

Backend: Node.js, Express e TypeScript.
Frontend: React, Vite e TypeScript.

O sistema deve ter um fluxo simples de checkout de capinhas de celular com produtos e estoque em memória.

Não use banco de dados, autenticação, pagamento, Docker ou layout complexo.
Priorize código simples, organizado e fácil de executar.

### 2. Implementação do backend

No backend, implemente um endpoint POST /checkout que receba productId e quantity.

Regras:

- productId é obrigatório
- quantity deve ser maior que zero
- produto inexistente retorna 404
- estoque insuficiente retorna 409
- sucesso reduz o estoque em memória e retorna 201 com mensagem e dados do pedido
- simule indisponibilidade da API quando productId for 999, retornando 503

Organize em routes, services e data.

### 3. Implementação do frontend

No frontend React, crie uma tela simples para selecionar um produto, informar quantidade e chamar o endpoint POST /checkout.

A tela deve:

- exibir produtos disponíveis
- mostrar loading durante a compra
- desabilitar o botão durante o loading
- mostrar mensagem de sucesso ou erro compreensível
- evitar múltiplos cliques duplicados durante o processamento

### 4. Testes automatizados

Crie testes automatizados para o endpoint POST /checkout usando Jest e Supertest.

Testar:

- compra com sucesso
- quantidade inválida
- produto inexistente
- estoque insuficiente
- API indisponível simulada

## Ajustes manuais realizados

Após a geração inicial com apoio da IA, revisei manualmente os arquivos e realizei ajustes para garantir que o comportamento do sistema estivesse coerente com o desafio.

Entre os pontos revisados estão:

- validações de entrada no checkout;
- respostas HTTP adequadas para cada cenário;
- mensagens de erro compreensíveis para o usuário;
- integração entre frontend e backend;
- carregamento dos produtos;
- atualização do estoque após uma compra;
- bloqueio do botão durante o processamento;
- organização e clareza dos arquivos.
