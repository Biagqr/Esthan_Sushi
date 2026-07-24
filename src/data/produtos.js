export const produtos = [
  {
    id: 1,
    nome: "Temaki Salmão",
    categoria: "Temakis",
    preco: 29.9,
    imagem: "/produtos/temaki-salmao.jpg",
    emoji: "🌯",
    descricao: "Temaki de salmão fresco com cream cheese e cebolinha.",
    destaque: true,
  },
  {
    id: 2,
    nome: "Hot Roll Filadélfia",
    categoria: "Hot Rolls",
    preco: 24.9,
    imagem: "/produtos/hot-roll-filadelfia.jpg",
    emoji: "🔥",
    descricao: "Hot roll empanado com salmão e cream cheese.",
    destaque: true,
  },
  {
    id: 3,
    nome: "Combinado 20 peças",
    categoria: "Combinados",
    preco: 79.9,
    imagem: "/produtos/combinado-20.jpg",
    emoji: "🍱",
    descricao: "Seleção do chef com 20 peças variadas.",
    destaque: true,
  },
  {
    id: 4,
    nome: "Uramaki Skin",
    categoria: "Uramakis",
    preco: 22.5,
    imagem: "/produtos/uramaki-skin.jpg",
    emoji: "🍣",
    descricao: "Uramaki com pele de salmão crocante.",
  },
  {
    id: 5,
    nome: "Coca-Cola Lata",
    categoria: "Bebidas",
    preco: 6.0,
    imagem: "/produtos/coca-lata.jpg",
    emoji: "🥤",
    descricao: "Refrigerante gelado 350ml.",
  },
  {
    id: 6,
    nome: "Barca 40 peças",
    categoria: "Barcas",
    preco: 139.9,
    imagem: "/produtos/barca-40.jpg",
    emoji: "🚤",
    descricao: "Barca completa com 40 peças para compartilhar.",
    destaque: true,
  },
  {
    id: 7,
    nome: "Hossomaki Pepino",
    categoria: "Hossomakis",
    preco: 15.9,
    imagem: "/produtos/hossomaki-pepino.jpg",
    emoji: "🥒",
    descricao: "Hossomaki tradicional de pepino (8 unidades).",
  },
  {
    id: 8,
    nome: "Sashimi Salmão (10 fatias)",
    categoria: "Sashimis",
    preco: 39.9,
    imagem: "/produtos/sashimi-salmao.jpg",
    emoji: "🐟",
    descricao: "10 fatias generosas de salmão fresco.",
  },
  {
    id: 9,
    nome: "Porção de Gyoza",
    categoria: "Porções",
    preco: 26.9,
    imagem: "/produtos/gyoza.jpg",
    emoji: "🥟",
    descricao: "6 gyozas de porco grelhadas com molho tarê.",
  },
  {
    id: 10,
    nome: "Petit Gâteau",
    categoria: "Sobremesas",
    preco: 18.9,
    imagem: "/produtos/petit-gateau.jpg",
    emoji: "🍮",
    descricao: "Bolo quente de chocolate com sorvete de creme.",
  },
  {
    id: 11,
    nome: "Temaki Filadélfia",
    categoria: "Temakis",
    preco: 27.9,
    imagem: "/produtos/temaki-filadelfia.jpg",
    emoji: "🌯",
    descricao: "Temaki com salmão, cream cheese e cebolinha.",
  },
  {
    id: 12,
    nome: "Guaraná Lata",
    categoria: "Bebidas",
    preco: 6.0,
    imagem: "/produtos/guarana-lata.jpg",
    emoji: "🥤",
    descricao: "Refrigerante de guaraná gelado 350ml.",
  },
];

export function getProdutoById(id) {
  return produtos.find((produto) => produto.id === Number(id)) || null;
}

export function getProdutosByCategoria(categoria) {
  return produtos.filter((produto) => produto.categoria === categoria);
}

export function getDestaques() {
  return produtos.filter((produto) => produto.destaque);
}
