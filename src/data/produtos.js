export const produtos = [
  {
    id: 1,
    nome: "Temaki Salmão",
    categoria: "Temakis",
    preco: 29.9,
    imagem: "/produtos/temaki-salmao.jpg",
    descricao: "Temaki de salmão fresco com cream cheese.",
  },
  {
    id: 2,
    nome: "Hot Roll Filadélfia",
    categoria: "Hot Rolls",
    preco: 24.9,
    imagem: "/produtos/hot-roll-filadelfia.jpg",
    descricao: "Hot roll empanado com salmão e cream cheese.",
  },
  {
    id: 3,
    nome: "Combinado 20 peças",
    categoria: "Combinados",
    preco: 79.9,
    imagem: "/produtos/combinado-20.jpg",
    descricao: "Seleção do chef com 20 peças variadas.",
  },
  {
    id: 4,
    nome: "Uramaki Skin",
    categoria: "Uramakis",
    preco: 22.5,
    imagem: "/produtos/uramaki-skin.jpg",
    descricao: "Uramaki com pele de salmão crocante.",
  },
  {
    id: 5,
    nome: "Coca-Cola Lata",
    categoria: "Bebidas",
    preco: 6.0,
    imagem: "/produtos/coca-lata.jpg",
    descricao: "Refrigerante gelado 350ml.",
  },
];

export function getProdutoById(id) {
  return produtos.find((produto) => produto.id === Number(id)) || null;
}

export function getProdutosByCategoria(categoria) {
  return produtos.filter((produto) => produto.categoria === categoria);
}
