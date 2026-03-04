import type { 
  OrganizationSettings, 
  Missionary, 
  Beneficiary, 
  UrgentProject, 
  Ministry, 
  EducationProject, 
  FarmProject, 
  Product, 
  BlogPost, 
  GalleryAlbum, 
  EGWQuote,
  VolunteerOpportunity,
  TransparencyReport
} from '@/types';

export const defaultOrganizationSettings: OrganizationSettings = {
  name: "Família Silva",
  familyName: "Silva",
  logo: "/images/logo.png",
  verseMotto: "Ide por todo o mundo e pregai o evangelho a toda criatura. - Marcos 16:15",
  coverPhoto: "/images/hero-family.jpg",
  missionStory: `Nosso chamado missionário começou em 2018, quando durante uma semana de oração, sentimos claramente o Espírito Santo nos direcionando para o campo missionário de Moçambique. Após meses de preparação, oração e confirmações, chegamos a este lindo país em março de 2019.

Desde então, temos trabalhado incansavelmente para levar esperança, educação e o evangelho às comunidades rurais mais necessitadas. Contamos com o apoio de diversas famílias aplicadoras e missionários locais que compartilham nossa visão.

Nossa missão é inspirada nos escritos de Ellen G. White, especialmente em sua ênfase na obra médico-missionária, educação rural e o cumprimento da mensagem dos três anjos.`,
  missionStartDate: "2019-03-15",
  currentField: {
    province: "Gaza",
    district: "Chokwé",
    country: "Moçambique"
  },
  contact: {
    phoneMozambique: "+258 84 123 4567",
    whatsapp: "+258 84 123 4567",
    email: "familia.silva.missao@gmail.com",
    physicalAddress: "Estrada Nacional 1, Km 230, Chokwé, Gaza, Moçambique",
    additionalLinks: [
      { id: "1", name: "Grupo de Oração", url: "https://chat.whatsapp.com/oracao", icon: "Users" },
      { id: "2", name: "Telegram", url: "https://t.me/familiasilvamissao", icon: "Send" },
      { id: "3", name: "Zoom", url: "https://zoom.us/j/meeting", icon: "Video" }
    ]
  },
  socialMedia: {
    facebook: "https://facebook.com/familiasilvamissao",
    instagram: "https://instagram.com/familiasilvamissao",
    youtube: "https://youtube.com/familiasilvamissao",
    tiktok: "https://tiktok.com/@familiasilvamissao",
    kwai: "https://kwai.com/familiasilvamissao"
  },
  adventistResources: {
    hopeChannel: "https://hopetv.org",
    adventistReview: "https://revistaadventista.com.br",
    sabbathSchool: "https://escolasabatina.com.br"
  },
  showBankDetails: false,
  bankDetails: {
    bim: {
      accountName: "Missão Família Silva",
      accountNumber: "1234567890",
      iban: "MZ59 0001 2345 6789 0123 45",
      swift: "BIMMZMX"
    },
    standardBank: {
      accountName: "Missão Família Silva",
      accountNumber: "9876543210",
      iban: "MZ59 0003 0000 9876 5432 10",
      swift: "SBICMZMX"
    },
    millenniumBim: {
      accountName: "Missão Família Silva",
      accountNumber: "5678901234",
      iban: "MZ59 0008 0000 5678 9012 34"
    }
  }
};

export const defaultMissionaries: Missionary[] = [
  {
    id: "1",
    name: "Pr. João e Maria Silva",
    photo: "/images/missionaries/joao-maria.jpg",
    field: "Chokwé, Gaza",
    arrivalDate: "2019-03-15",
    specialty: "Evangelista / Administrador",
    status: "active",
    isVisible: true,
    type: "main",
    bio: "João e Maria Silva são os líderes da missão. João é pastor ordenado com 15 anos de experiência, e Maria é enfermeira formada. Juntos com seus três filhos, dedicam suas vidas ao trabalho missionário em Moçambique.",
    familyMembers: [
      { name: "João Silva", relationship: "Pai", age: 42, role: "Pastor / Líder" },
      { name: "Maria Silva", relationship: "Mãe", age: 38, role: "Enfermeira / Educadora" },
      { name: "Pedro Silva", relationship: "Filho", age: 15 },
      { name: "Ana Silva", relationship: "Filha", age: 12 },
      { name: "Lucas Silva", relationship: "Filho", age: 8 }
    ],
    contact: {
      email: "joao.silva@missao.org",
      phone: "+258 84 123 4567"
    }
  },
  {
    id: "2",
    name: "Família Oliveira",
    photo: "/images/missionaries/oliveira.jpg",
    field: "Xai-Xai, Gaza",
    arrivalDate: "2020-07-20",
    specialty: "Médico / Professora",
    status: "active",
    isVisible: true,
    type: "applicator",
    bio: "Dra. Carla Oliveira e seu marido Roberto trabalham na área de saúde e educação. Carla atende na clínica missionária e Roberto coordena as aulas de alfabetização.",
    contact: {
      email: "oliveira@missao.org",
      phone: "+258 84 234 5678"
    }
  },
  {
    id: "3",
    name: "Família Santos",
    photo: "/images/missionaries/santos.jpg",
    field: "Chibuto, Gaza",
    arrivalDate: "2021-02-10",
    specialty: "Agricultor / Enfermeira",
    status: "active",
    isVisible: true,
    type: "applicator",
    bio: "Carlos Santos é agrônomo e coordena o projeto da fazenda missionária. Sua esposa Fernanda é enfermeira e trabalha na clínica local.",
    contact: {
      email: "santos@missao.org",
      phone: "+258 84 345 6789"
    }
  },
  {
    id: "4",
    name: "Irmão Mateus Chissano",
    photo: "/images/missionaries/mateus.jpg",
    field: "Chokwé, Gaza",
    arrivalDate: "2019-06-01",
    specialty: "Evangelista / Tradutor",
    status: "active",
    isVisible: true,
    type: "local",
    testimony: "Conheci a verdade através da Rádio Nova Vida. Depois de estudar a Bíblia, decidi me batizar e dedicar minha vida ao evangelho. Hoje sirvo como evangelista e tradutor, ajudando a levar a mensagem às comunidades que falam changana.",
    contact: {
      phone: "+258 84 456 7890"
    }
  },
  {
    id: "5",
    name: "Irmã Rosa Mabunda",
    photo: "/images/missionaries/rosa.jpg",
    field: "Xai-Xai, Gaza",
    arrivalDate: "2020-01-15",
    specialty: "Professora / Alfabetizadora",
    status: "active",
    isVisible: true,
    type: "local",
    testimony: "A alfabetização mudou minha vida. Aprendi a ler para poder ler a Bíblia. Hoje ensino outras pessoas a lerem e escreverem, para que também possam conhecer a Palavra de Deus.",
    contact: {
      phone: "+258 84 567 8901"
    }
  }
];

export const defaultBeneficiaries: Beneficiary[] = [
  {
    id: "1",
    name: "Família Mabunda",
    age: 35,
    location: { province: "gaza", district: "Chokwé", village: "Machava" },
    photo: "/images/beneficiaries/mabunda.jpg",
    story: "A família Mabunda perdeu tudo nas enchentes de 2023. O pai, Manuel, trabalha como agricultor diarista, mas não consegue juntar dinheiro suficiente para reconstruir a casa. A família está atualmente abrigada em uma escola local.",
    needAmount: 75000,
    raisedAmount: 25000,
    status: "urgent",
    category: "reconstrucao",
    deadline: "2024-04-15",
    isFeatured: true,
    updates: [
      { date: "2024-01-15", content: "Família cadastrada no programa de assistência" }
    ]
  },
  {
    id: "2",
    name: "Crianças do Orfanato Luz",
    age: 8,
    location: { province: "gaza", district: "Xai-Xai", village: "Zongoene" },
    photo: "/images/beneficiaries/orfanato.jpg",
    story: "O orfanato Luz abriga 45 crianças órfãs de guerra e HIV/AIDS. Precisamos de ajuda para comprar alimentos, material escolar e medicamentos. As crianças também precisam de roupas e calçados.",
    needAmount: 150000,
    raisedAmount: 85000,
    status: "urgent",
    category: "orfanato",
    deadline: "2024-03-30",
    isFeatured: true,
    updates: [
      { date: "2024-01-20", content: "Compra de alimentos para 1 mês realizada" },
      { date: "2024-02-01", content: "Material escolar parcial adquirido" }
    ]
  },
  {
    id: "3",
    name: "Comunidade de Massingir",
    age: 0,
    location: { province: "gaza", district: "Massingir", village: "Massingir Velho" },
    photo: "/images/beneficiatives/massingir.jpg",
    story: "A comunidade de Massingir precisa de um poço artesiano. A água atual é de um rio contaminado, causando doenças. Mais de 200 famílias serão beneficiadas com a construção do poço.",
    needAmount: 250000,
    raisedAmount: 120000,
    status: "urgent",
    category: "agua",
    deadline: "2024-05-01",
    isFeatured: true,
    updates: [
      { date: "2024-01-10", content: "Estudo de viabilidade realizado" },
      { date: "2024-02-05", content: "Orçamentos coletados" }
    ]
  },
  {
    id: "4",
    name: "Irmã Amelia",
    age: 67,
    location: { province: "gaza", district: "Chibuto", village: "Chibuto Sede" },
    photo: "/images/beneficiaries/amelia.jpg",
    story: "Irmã Amelia é viúva e cuida sozinha de 5 netos órfãos. Ela vende mandioca no mercado, mas a renda é insuficiente. Precisa de ajuda para comprar material escolar e cobertores para o inverno.",
    needAmount: 15000,
    raisedAmount: 8000,
    status: "in_progress",
    category: "assistencia",
    isFeatured: false
  },
  {
    id: "5",
    name: "Jovens do Curso de Alfabetização",
    age: 18,
    location: { province: "gaza", district: "Chokwé", village: "Lionde" },
    photo: "/images/beneficiaries/alfabetizacao.jpg",
    story: "Grupo de 30 jovens e adultos que estão aprendendo a ler e escrever. Precisamos de livros didáticos, cadernos, lápis e lousas para continuar o trabalho de alfabetização.",
    needAmount: 25000,
    raisedAmount: 12000,
    status: "in_progress",
    category: "educacao",
    isFeatured: false
  }
];

export const defaultUrgentProjects: UrgentProject[] = [
  {
    id: "1",
    title: "Reconstrução Casa Família Mabunda",
    description: "Ajude a reconstruir o lar da família Mabunda que perdeu tudo nas enchentes.",
    image: "/images/projects/reconstrucao-mabunda.jpg",
    needAmount: 75000,
    raisedAmount: 25000,
    deadline: "2024-04-15",
    status: "urgent",
    beneficiaryId: "1"
  },
  {
    id: "2",
    title: "Alimentos e Material Escolar - Orfanato Luz",
    description: "45 crianças precisam de alimentos, material escolar e medicamentos.",
    image: "/images/projects/orfanato-luz.jpg",
    needAmount: 150000,
    raisedAmount: 85000,
    deadline: "2024-03-30",
    status: "urgent",
    beneficiaryId: "2"
  },
  {
    id: "3",
    title: "Poço Artesiano - Comunidade Massingir",
    description: "Água potável para mais de 200 famílias. Um poço pode salvar vidas.",
    image: "/images/projects/poco-massingir.jpg",
    needAmount: 250000,
    raisedAmount: 120000,
    deadline: "2024-05-01",
    status: "urgent",
    beneficiaryId: "3"
  }
];

export const defaultMinistries: Ministry[] = [
  {
    id: "1",
    title: "Evangelismo e Plantio de Igrejas",
    description: "Pregamos o evangelho em aldeias e comunidades rurais, plantando igrejas e formando líderes locais.",
    icon: "Church",
    image: "/images/ministries/evangelismo.jpg",
    quote: "A obra de Cristo na terra foi uma obra de misericórdia. Andava fazendo bem.",
    quoteAuthor: "AA, p. 12",
    stats: [
      { label: "Igrejas Plantadas", value: "12" },
      { label: "Batismos", value: "340" },
      { label: "Grupos Pequenos", value: "28" }
    ]
  },
  {
    id: "2",
    title: "Obra Médico-Missionária",
    description: "Atendimento médico gratuito, distribuição de medicamentos e programas de saúde preventiva.",
    icon: "Heart",
    image: "/images/ministries/medico.jpg",
    quote: "A obra médico-missionária é a mão direita do evangelho.",
    quoteAuthor: "7T, p. 59",
    stats: [
      { label: "Atendimentos", value: "2.500" },
      { label: "Vacinas", value: "800" },
      { label: "Cirurgias", value: "45" }
    ]
  },
  {
    id: "3",
    title: "Educação e Alfabetização",
    description: "Programa 'Escola de Esperança' - alfabetização de adultos e jovens, escolinha primária comunitária.",
    icon: "BookOpen",
    image: "/images/ministries/educacao.jpg",
    quote: "A educação é a obra de toda a vida.",
    quoteAuthor: "ED, p. 30",
    stats: [
      { label: "Alunos", value: "180" },
      { label: "Turmas", value: "8" },
      { label: "Taxa de Aprovação", value: "92%" }
    ]
  },
  {
    id: "4",
    title: "Fazenda Missionária Sustentável",
    description: "'Fazenda Esperança' - sustentabilidade da missão através da agricultura orgânica e criação de animais.",
    icon: "Wheat",
    image: "/images/ministries/fazenda.jpg",
    quote: "Deveríamos considerar a obra de cultivar a terra como um ramo da educação.",
    quoteAuthor: "ED, p. 219",
    stats: [
      { label: "Hectares", value: "5" },
      { label: "Produtos", value: "25" },
      { label: "Famílias Ajudadas", value: "60" }
    ]
  },
  {
    id: "5",
    title: "Assistência Social",
    description: "Distribuição de cestas básicas, roupas, cobertores e ajuda em emergências como enchentes.",
    icon: "HandHeart",
    image: "/images/ministries/assistencia.jpg",
    stats: [
      { label: "Cestas Entregues", value: "500" },
      { label: "Famílias Atendidas", value: "200" },
      { label: "Emergências", value: "15" }
    ]
  },
  {
    id: "6",
    title: "Apoio a Órfãos e Vulneráveis",
    description: "Apoio a orfanatos, crianças órfãs de guerra e HIV/AIDS, idosos vulneráveis.",
    icon: "Baby",
    image: "/images/ministries/orfaos.jpg",
    stats: [
      { label: "Crianças Ajudadas", value: "120" },
      { label: "Orfanatos", value: "3" },
      { label: "Idosos", value: "35" }
    ]
  }
];

export const defaultEducationProject: EducationProject = {
  name: "Escola de Esperança",
  description: `A Escola de Esperança é um programa de alfabetização que visa ensinar adultos e jovens a lerem e escreverem, para que possam ter acesso à Palavra de Deus e melhorar suas condições de vida.

Nossas aulas são ministradas em português e changana, respeitando a cultura local. Utilizamos material didático cristão que integra a alfabetização com valores bíblicos.

O programa inclui:
- Alfabetização básica (ler e escrever)
- Matemática fundamental
- Noções de higiene e saúde
- Valores cristãos e bíblicos
- Oficinas de artesanato`,
  students: 180,
  classes: 8,
  passRate: 92,
  materials: [
    "Livros didáticos de alfabetização",
    "Cadernos e lápis",
    "Lousas e giz",
    "Material de artesanato",
    "Livros infantis ilustrados"
  ],
  successStories: [
    {
      name: "Ana Mabunda",
      age: 32,
      photo: "/images/education/ana.jpg",
      beforeStory: "Não sabia ler nem escrever. Dependia dos outros para assinar documentos.",
      afterStory: "Hoje leio a Bíblia sozinha e ajudo meus filhos na lição de casa. Sou líder do grupo de alfabetização da minha comunidade."
    },
    {
      name: "Carlos Matsinhe",
      age: 45,
      photo: "/images/education/carlos.jpg",
      beforeStory: "Trabalhava como ajudante porque não sabia assinar o nome. Sentia vergonha.",
      afterStory: "Aprendi a ler e agora trabalho como encarregado de obra. Posso ler contratos e ajudar minha comunidade."
    }
  ],
  gallery: [
    "/images/education/aula1.jpg",
    "/images/education/aula2.jpg",
    "/images/education/alunos1.jpg",
    "/images/education/alunos2.jpg"
  ]
};

export const defaultFarmProject: FarmProject = {
  name: "Fazenda Esperança",
  description: `A Fazenda Esperança é um projeto de sustentabilidade que visa gerar alimentos para a equipe missionária, doar para a comunidade e gerar renda para os projetos da missão.

Baseados no conselho de Ellen G. White sobre a importância da educação rural, treinamos agricultores locais em técnicas sustentáveis de plantio e criação de animais.

Nosso objetivo é demonstrar que é possível cultivar a terra de forma produtiva e sustentável, honrando o Criador.`,
  areas: [
    {
      id: "1",
      name: "Horta Orgânica",
      description: "Vegetais frescos cultivados sem agrotóxicos: couve, repolho, tomate, cebola, alface.",
      icon: "Carrot",
      photo: "/images/farm/horta.jpg"
    },
    {
      id: "2",
      name: "Pomar Frutífero",
      description: "Mangueiras, cajueiros, coqueiros, laranjeiras e limoeiros.",
      icon: "Apple",
      photo: "/images/farm/pomar.jpg"
    },
    {
      id: "3",
      name: "Criação de Animais",
      description: "Galinhas para ovos e carne, coelhos, cabras para leite.",
      icon: "Beef",
      photo: "/images/farm/animais.jpg"
    },
    {
      id: "4",
      name: "Plantação de Grãos",
      description: "Milho, feijão, mandioca e amendoim para segurança alimentar.",
      icon: "Wheat",
      photo: "/images/farm/graos.jpg"
    },
    {
      id: "5",
      name: "Compostagem",
      description: "Produção de adubo orgânico natural a partir de resíduos vegetais.",
      icon: "Recycle",
      photo: "/images/farm/compostagem.jpg"
    },
    {
      id: "6",
      name: "Irrigação Solar",
      description: "Sistema de bombeamento de água usando energia solar.",
      icon: "Sun",
      photo: "/images/farm/irrigacao.jpg"
    }
  ],
  impact: {
    teamFeeding: "80%",
    communityDonation: "15%",
    projectIncome: "5%",
    farmersTrained: 45
  },
  needs: [
    "Ferramentas agrícolas (enxadas, pás, picaretas)",
    "Sementes de qualidade",
    "Expansão do sistema de irrigação",
    "Cercas de proteção",
    "Animais para reprodução"
  ],
  raisedAmount: 85000,
  goalAmount: 200000,
  gallery: [
    "/images/farm/geral1.jpg",
    "/images/farm/geral2.jpg",
    "/images/farm/trabalho1.jpg",
    "/images/farm/colheita1.jpg"
  ]
};

export const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Capulana Tradicional",
    description: "Tecido tradicional moçambicano, 100% algodão, estampas variadas.",
    price: 450,
    currency: "MZN",
    image: "/images/products/capulana.jpg",
    category: "artesanato",
    stock: 20,
    isAvailable: true
  },
  {
    id: "2",
    name: "Cesto de Palha",
    description: "Cesto artesanal feito à mão com palha natural.",
    price: 280,
    currency: "MZN",
    image: "/images/products/cesto.jpg",
    category: "artesanato",
    stock: 15,
    isAvailable: true
  },
  {
    id: "3",
    name: "Sementes Orgânicas",
    description: "Pacote com sementes de hortaliças orgânicas da fazenda.",
    price: 150,
    currency: "MZN",
    image: "/images/products/sementes.jpg",
    category: "fazenda",
    stock: 50,
    isAvailable: true
  },
  {
    id: "4",
    name: "Devocional Diário",
    description: "Livro de devocionais escritos pela equipe missionária.",
    price: 350,
    currency: "MZN",
    image: "/images/products/devocional.jpg",
    category: "livros",
    stock: 30,
    isAvailable: true
  },
  {
    id: "5",
    name: "Camiseta Missão",
    description: "Camiseta 100% algodão com logo da missão.",
    price: 400,
    currency: "MZN",
    image: "/images/products/camiseta.jpg",
    category: "vestuario",
    stock: 25,
    isAvailable: true
  },
  {
    id: "6",
    name: "Escultura em Madeira",
    description: "Escultura artesanal em madeira local.",
    price: 600,
    currency: "MZN",
    image: "/images/products/escultura.jpg",
    category: "artesanato",
    stock: 8,
    isAvailable: true
  }
];

export const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Carta de Fevereiro - O Início das Aulas",
    excerpt: "Este mês reiniciamos as aulas na Escola de Esperança com 45 novos alunos...",
    content: `Queridos amigos e apoiadores,

Este mês de fevereiro foi marcado pelo reinício das aulas na nossa Escola de Esperança. Com muita alegria, recebemos 45 novos alunos que iniciam sua jornada de alfabetização.

Entre eles está a irmã Amelia, de 52 anos, que sempre sonhou em aprender a ler para poder ler a Bíblia sozinha. Sua determinação é inspiradora!

Também inauguramos uma nova turma na aldeia de Lionde, graças à doação de lousas e livros didáticos que recebemos no mês passado.

Agradecemos a Deus e a cada um de vocês que tornam este trabalho possível.

Na missão,
Família Silva`,
    author: "Família Silva",
    date: "2024-02-28",
    category: "Alfabetização",
    image: "/images/blog/fevereiro.jpg"
  },
  {
    id: "2",
    title: "Batismo na Aldeia Machava",
    excerpt: "12 almas entregaram suas vidas a Jesus em cerimônia de batismo...",
    content: `Foi um dia de grande alegria na aldeia Machava! Após meses de estudo bíblico, 12 pessoas decidiram seguir a Jesus e foram batizadas nas águas do rio Limpopo.

Entre os batizados estava o chefe da aldeia, que agora testemunha para sua comunidade sobre o poder transformador do evangelho.

A cerimônia foi acompanhada por mais de 100 pessoas, incluindo membros de outras aldeias que vieram ver o que Deus está fazendo.

Louvamos a Deus por Sua fidelidade!`,
    author: "Pr. João Silva",
    date: "2024-02-15",
    category: "Evangelismo",
    image: "/images/blog/batismo.jpg"
  },
  {
    id: "3",
    title: "Colheita na Fazenda Esperança",
    excerpt: "Primeira colheita do milho de safra. Deus é fiel!",
    content: `A fazenda nos presenteou este mês com uma abundante colheita de milho. Foram mais de 2 toneladas de grãos de excelente qualidade!

Parte da colheita será usada para alimentar nossa equipe missionária, parte será doada para famílias em situação de vulnerabilidade, e o excedente será vendido para gerar renda para os projetos.

Também conseguimos treinar mais 8 agricultores locais nas técnicas de plantio que utilizamos. Eles agora podem replicar em suas próprias terras.

Agradecemos a Deus pela chuva na hora certa e pela proteção sobre a plantação.`,
    author: "Carlos Santos",
    date: "2024-02-10",
    category: "Fazenda",
    image: "/images/blog/colheita.jpg"
  }
];

export const defaultGalleryAlbums: GalleryAlbum[] = [
  {
    id: "1",
    title: "Batismos",
    description: "Momentos de alegria quando novos irmãos entregam suas vidas a Jesus.",
    coverImage: "/images/gallery/batismos/cover.jpg",
    images: [
      "/images/gallery/batismos/1.jpg",
      "/images/gallery/batismos/2.jpg",
      "/images/gallery/batismos/3.jpg"
    ]
  },
  {
    id: "2",
    title: "Escola de Alfabetização",
    description: "Aulas, alunos e momentos de aprendizado na Escola de Esperança.",
    coverImage: "/images/gallery/alfabetizacao/cover.jpg",
    images: [
      "/images/gallery/alfabetizacao/1.jpg",
      "/images/gallery/alfabetizacao/2.jpg",
      "/images/gallery/alfabetizacao/3.jpg",
      "/images/gallery/alfabetizacao/4.jpg"
    ]
  },
  {
    id: "3",
    title: "Fazenda Esperança",
    description: "Trabalho na terra, plantio, colheita e criação de animais.",
    coverImage: "/images/gallery/fazenda/cover.jpg",
    images: [
      "/images/gallery/fazenda/1.jpg",
      "/images/gallery/fazenda/2.jpg",
      "/images/gallery/fazenda/3.jpg"
    ]
  },
  {
    id: "4",
    title: "Ações Sociais",
    description: "Distribuição de alimentos, roupas e assistência às famílias.",
    coverImage: "/images/gallery/acoes/cover.jpg",
    images: [
      "/images/gallery/acoes/1.jpg",
      "/images/gallery/acoes/2.jpg",
      "/images/gallery/acoes/3.jpg"
    ]
  },
  {
    id: "5",
    title: "Nossa Equipe",
    description: "Missionários, famílias aplicadoras e colaboradores locais.",
    coverImage: "/images/gallery/equipe/cover.jpg",
    images: [
      "/images/gallery/equipe/1.jpg",
      "/images/gallery/equipe/2.jpg",
      "/images/gallery/equipe/3.jpg"
    ]
  },
  {
    id: "6",
    title: "Paisagens de Moçambique",
    description: "A beleza da terra moçambicana onde servimos.",
    coverImage: "/images/gallery/paisagens/cover.jpg",
    images: [
      "/images/gallery/paisagens/1.jpg",
      "/images/gallery/paisagens/2.jpg",
      "/images/gallery/paisagens/3.jpg"
    ]
  }
];

export const defaultEGWQuotes: EGWQuote[] = [
  {
    id: "1",
    quote: "A obra de Cristo na terra foi uma obra de misericórdia. Andava fazendo bem.",
    reference: "AA, p. 12",
    category: "missões"
  },
  {
    id: "2",
    quote: "A educação é a obra de toda a vida.",
    reference: "ED, p. 30",
    category: "educacao"
  },
  {
    id: "3",
    quote: "Deveríamos considerar a obra de cultivar a terra como um ramo da educação.",
    reference: "ED, p. 219",
    category: "agricultura"
  },
  {
    id: "4",
    quote: "A obra médico-missionária é a mão direita do evangelho.",
    reference: "7T, p. 59",
    category: "saude"
  },
  {
    id: "5",
    quote: "Cristo veio em busca e para salvar o que se havia perdido.",
    reference: "DA, p. 15",
    category: "missões"
  },
  {
    id: "6",
    quote: "A volta de Cristo está próxima. Temos pouco tempo para trabalhar.",
    reference: "9T, p. 25",
    category: "volta-de-jesus"
  }
];

export const defaultVolunteerOpportunities: VolunteerOpportunity[] = [
  {
    id: "1",
    title: "Profissionais de Saúde",
    description: "Médicos, enfermeiros, dentistas e outros profissionais de saúde para atuar na clínica missionária.",
    requirements: [
      "Formação na área de saúde",
      "Disponibilidade mínima de 2 semanas",
      "Vacinação atualizada"
    ],
    duration: "2 semanas a 6 meses",
    image: "/images/volunteer/saude.jpg"
  },
  {
    id: "2",
    title: "Professores e Alfabetizadores",
    description: "Professores para auxiliar no programa de alfabetização e escolinha primária.",
    requirements: [
      "Experiência em ensino",
      "Disponibilidade mínima de 1 mês",
      "Paciente e dedicado"
    ],
    duration: "1 mês a 1 ano",
    image: "/images/volunteer/professores.jpg"
  },
  {
    id: "3",
    title: "Agrônomos e Agricultores",
    description: "Profissionais para auxiliar no desenvolvimento da fazenda missionária e treinamento de agricultores locais.",
    requirements: [
      "Conhecimento em agricultura sustentável",
      "Disponibilidade mínima de 2 semanas",
      "Gosto pelo trabalho rural"
    ],
    duration: "2 semanas a 3 meses",
    image: "/images/volunteer/agronomos.jpg"
  },
  {
    id: "4",
    title: "Construtores e Pedreiros",
    description: "Auxílio na construção de escolas, igrejas e casas para famílias necessitadas.",
    requirements: [
      "Experiência em construção civil",
      "Disponibilidade mínima de 2 semanas",
      "Disposição para trabalho físico"
    ],
    duration: "2 semanas a 2 meses",
    image: "/images/volunteer/construcao.jpg"
  },
  {
    id: "5",
    title: "Jovens Missão Calebe",
    description: "Programa para jovens de 16-25 anos que querem experimentar a vida missionária.",
    requirements: [
      "Idade entre 16-25 anos",
      "Membro da IASD",
      "Carta de recomendação do pastor"
    ],
    duration: "1-3 meses",
    image: "/images/volunteer/calebe.jpg"
  }
];

export const defaultTransparencyReport: TransparencyReport = {
  id: "1",
  quarter: "4º Trimestre",
  year: 2023,
  totalRaised: 450000,
  totalSpent: 425000,
  categories: [
    { name: "Assistência Social", amount: 120000, percentage: 28 },
    { name: "Educação", amount: 85000, percentage: 20 },
    { name: "Saúde", amount: 75000, percentage: 18 },
    { name: "Fazenda", amount: 60000, percentage: 14 },
    { name: "Evangelismo", amount: 50000, percentage: 12 },
    { name: "Administrativo", amount: 35000, percentage: 8 }
  ],
  metrics: {
    livesImpacted: 2500,
    baptisms: 45,
    churchesPlanted: 2,
    peopleFed: 800,
    studentsEducated: 180
  },
  pdfUrl: "/reports/relatorio-4t-2023.pdf"
};
