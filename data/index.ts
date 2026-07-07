export const navItems = [
  { name: "Serviços", link: "#about" },
  { name: "Projetos", link: "#projects" },
  { name: "Feedbacks", link: "#testimonials" },
  { name: "Contatos", link: "#contact" },
];

export type ServiceIcon =
  | "server"
  | "headset"
  | "wifi"
  | "network"
  | "broadcast"
  | "consulting"
  | "laptop"
  | "code";

export const services: {
  id: number;
  title: string;
  description: string;
  icon: ServiceIcon;
  img?: string;
  className: string;
}[] = [
  {
    id: 1,
    title: "Infraestrutura",
    description:
      "Projetamos, implantamos e gerenciamos toda a base tecnológica da sua empresa: servidores, storage, virtualização e ambientes híbridos.",
    icon: "server",
    img: "/infra-bg.avif",
    className: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    title: "Redes Wi-Fi empresarial",
    description:
      "Cobertura corporativa de alta densidade, com segurança, gestão centralizada e desempenho estável.",
    icon: "wifi",
    className: "lg:col-span-1",
  },
  {
    id: 3,
    title: "Redes físicas estruturadas",
    description:
      "Cabeamento estruturado com certificação, organização de racks e documentação completa.",
    icon: "network",
    className: "lg:col-span-1",
  },
  {
    id: 4,
    title: "Suporte On e Offsourcing",
    description:
      "Equipe técnica dedicada, presencial ou remota, com atendimento contínuo e SLAs sob medida.",
    icon: "headset",
    img: "/manutencao-bg.avif",
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    id: 5,
    title: "Desenvolvimento de sites e landing pages",
    description:
      "Sites institucionais e landing pages de alta conversão, com design moderno, performance e SEO.",
    icon: "code",
    img: "/b1.webp",
    className: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 6,
    title: "Wi-Fi para eventos",
    description:
      "Conectividade temporária de alta capacidade para eventos de qualquer porte.",
    icon: "broadcast",
    className: "lg:col-span-1",
  },
  {
    id: 7,
    title: "Consultoria de TI personalizada",
    description:
      "Diagnóstico e planejamento estratégico de tecnologia alinhados ao momento do seu negócio.",
    icon: "consulting",
    className: "lg:col-span-1",
  },
  {
    id: 8,
    title: "Venda de equipamentos de informática",
    description:
      "Fornecimento de computadores, servidores e ativos de rede com configuração, entrega e garantia.",
    icon: "laptop",
    className: "md:col-span-2 lg:col-span-2",
  },
];

export const projects: {
  id: number;
  title: string;
  des: string;
  img: string;
  /** Exibe a imagem como logo centralizada em vez de capa */
  isLogo?: boolean;
  iconLists: string[];
  /** Sem link = card sem botão "Ver projeto" */
  link?: string;
}[] = [
  {
    id: 1,
    title: "Página de Links - Cintia Resende",
    des: "Página de Links feita para designer de sobrancelha Cintia Resende",
    img: "/P2.webp",
    iconLists: ["/re.svg", "/tail.svg", "photoshop.svg"],
    link: "https://cintia-resende-links.vercel.app/",
  },
  {
    id: 2,
    title: "PEVT - Pesca Esportiva Velho da Taipa",
    des: "Reestruturação de rede e implementação de novos pontos de Wi-Fi na propriedade.",
    img: "/pevt-logo.png",
    isLogo: true,
    iconLists: [],
  },
];

export const testimonials: {
  quote: string;
  name: string;
  title: string;
  /** Logo da empresa do cliente; sem logo, exibe avatar com a inicial */
  logo?: string;
}[] = [
  {
    quote:
      "A TriUnity criou minha página de links do jeito que eu imaginava: bonita, rápida e com a minha cara. Minhas clientes agora encontram tudo em um só lugar — agendamento, redes sociais e localização. O atendimento foi atencioso do início ao fim e o resultado elevou a presença digital do meu negócio. Recomendo de olhos fechados!",
    name: "Cintia Resende",
    title: "Empreendedora no ramo de estética feminina",
  },
  {
    quote:
      "Nossa rede já não dava conta da demanda e o sinal falhava em vários pontos da propriedade. A equipe da TriUnity reestruturou toda a infraestrutura e implementou novos pontos de Wi-Fi, com um planejamento muito bem executado. Hoje temos cobertura estável em todas as áreas e nossos visitantes sentem a diferença. Só tenho a agradecer pelo profissionalismo e pela agilidade do time!",
    name: "Walter Oliveira",
    title: "Pesca Esportiva Velho da Taipa - PEVT",
    logo: "/pevt-logo.png",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Inovação e Tecnologia de ponta",
    desc: "Destacamos por prezar e adotar e implementar as tecnologias mais recentes e inovadoras do mercado para melhor lhe atender.",
    className: "md:col-span-2",
    thumbnail: "/D-3.svg",
  },
  {
    id: 2,
    title: "Entrega rápida e eficiente",
    desc: "Garantimos que os clientes recebam suas soluções tecnológicas no menor tempo possível, mantendo altos padrões de qualidade.",
    className: "md:col-span-2",
    thumbnail: "/D-2.svg",
  },
  {
    id: 3,
    title: "Excelência no atendimento",
    desc: "Nossa equipe está sempre disponível para oferecer suporte técnico especializado e resolver quaisquer problemas ou dúvidas que os clientes possam ter de forma eficaz.",
    className: "md:col-span-2",
    thumbnail: "/D-1.svg",
  },
  {
    id: 4,
    title: "Parceria de longo prazo",
    desc: "Atuaremos como consultores de confiança, colaborando de perto para impulsionar o crescimento e o sucesso contínuo de seus negócios.",
    className: "md:col-span-2",
    thumbnail: "/D-4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/TriUnityTech",
  },
  {
    id: 2,
    img: "/insta.svg",
    link: "https://www.instagram.com/triunity_tech/",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/company/triunity-tech-services/about/?viewAsMember=true",
  },
];
