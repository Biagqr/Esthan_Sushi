# Esthan Sushi 🍣

Cardápio digital do Esthan Sushi — site com página inicial, cardápio filtrável,
carrinho e finalização de pedido pelo WhatsApp, além de uma área administrativa
simples.

## Tecnologias

- [Vite](https://vitejs.dev/)
- [React 18](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Como rodar localmente

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`.

Para gerar a build de produção:

```bash
npm run build
npm run preview
```

## Configuração

Copie `.env.example` para `.env` e ajuste o número de WhatsApp que recebe os
pedidos:

```bash
cp .env.example .env
```

| Variável                | Descrição                                            |
| ----------------------- | ---------------------------------------------------- |
| `VITE_WHATSAPP_NUMERO`  | Número (formato internacional, só dígitos) do pedido |

## Estrutura

```
src/
├── components/   # Navbar, Footer, ProductCard, CartDrawer, etc.
├── context/      # CartContext (estado do carrinho)
├── data/         # categorias e produtos do cardápio
├── layouts/      # MainLayout (navbar + footer + carrinho)
├── pages/        # Home, Cardapio, Login, Dashboard, NotFound
├── routes/       # AppRoutes
└── utils/        # formatação de moeda
```

## Rotas

| Rota         | Página                          |
| ------------ | ------------------------------- |
| `/`          | Início                          |
| `/cardapio`  | Cardápio com busca e filtros    |
| `/login`     | Login da área administrativa    |
| `/admin`     | Painel administrativo           |

As anotações originais do projeto foram preservadas em [`legacy/`](./legacy).
