# CaseCellShop

Projeto full stack simples para um desafio tecnico. A aplicacao simula um checkout de capinhas de celular com produtos e estoque em memoria.

## Tecnologias

- Backend: Node.js, Express e TypeScript
- Frontend: React, Vite e TypeScript

## Estrutura

```text
case-cell-shop/
  backend/
    src/
      data/
      routes/
      services/
      types/
  frontend/
    src/
      components/
      services/
      types/
```

## Como executar

Instale as dependencias:

```bash
npm run install:all
```

Em um terminal, rode o backend:

```bash
npm run dev:backend
```

Em outro terminal, rode o frontend:

```bash
npm run dev:frontend
```

URLs padrao:

- Backend: `http://localhost:3333`
- Frontend: `http://localhost:5173`

## Endpoints

- `GET /health`: verifica se a API esta no ar
- `GET /products`: lista produtos com estoque atual
- `POST /checkout`: recebe `productId` e `quantity`, cria uma tentativa de compra e desconta estoque em memoria

Exemplo de checkout:

```json
{
  "productId": "case-iphone-15-clear",
  "quantity": 1
}
```

## Observacoes

O estoque fica somente em memoria. Ao reiniciar o backend, os produtos voltam para o estado inicial.

## Decisoes e trade-offs

Para manter a solucao simples e alinhada ao escopo pedido, o checkout permite a compra de um produto por vez. A ideia foi evitar um fluxo de carrinho com multiplos itens, regras adicionais de validacao e tratamento parcial de estoque, ja que o desafio pede que o usuario tente comprar um produto informando uma quantidade.
