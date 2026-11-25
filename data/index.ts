export const WHATSAPP = "5537999754109";
export const CHECKUP_LINK = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
  "Olá! Quero agendar o checkup gratuito de TI."
)}`;

export const navItems = [
  { name: "Checkup grátis", link: "#checkup" },
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
      "Cuidamos dos computadores, do servidor e do sistema da sua empresa para que nada pare no meio do expediente.",
    icon: "server",
    img: "/infra-bg.avif",
    className: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    title: "Redes Wi-Fi empresarial",
    description:
      "Wi-Fi que pega em todo canto, com rede separada para clientes e pacientes.",
    icon: "wifi",
    className: "lg:col-span-1",
  },
  {
    id: 3,
    title: "Redes físicas estruturadas",
    description:
      "Cabos organizados e testados: fim da internet lenta por mau contato.",
    icon: "network",
    className: "lg:col-span-1",
  },
  {
    id: 4,
    title: "Suporte mensal de TI",
    description:
      "Plano mensal com suporte remoto no mesmo dia, visita presencial e backup automático.",
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
      "Internet estável para festas, feiras e eventos de qualquer tamanho.",
    icon: "broadcast",
    className: "lg:col-span-1",
  },
  {
    id: 7,
    title: "Consultoria de TI",
    description:
      "A gente avalia sua estrutura e diz o que vale a pena melhorar, sem empurrar o que você não precisa.",
    icon: "consulting",
    className: "lg:col-span-1",
  },
  {
    id: 8,
    title: "Venda de equipamentos de informática",
    description:
      "Computadores e equipamentos de rede entregues já configurados e com garantia.",
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
    id: 3,
    title: "Autos 037 - Loja de seminovos",
    des: "Site cinematográfico com estoque, 360° dos carros, detalhe por detalhe, ficha técnica e WhatsApp com a mensagem de cada carro.",
    img: "/autos037.webp",
    iconLists: ["/gsap.svg"],
    link: "https://www.autos037.com.br/",
  },
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
