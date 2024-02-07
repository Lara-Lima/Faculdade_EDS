const teams = [
  {
    id: "23f56a89-4d7c-32e1-98a2-6b4cde0f9876",
    name: "Financeiro",
    color: "#008080",
    userId: "4",
    description:
      "Equipe altamente qualificada e experiente, responsável pela gestão financeira estratégica e eficiente da empresa. Utilizando as melhores práticas e ferramentas, trabalhamos para otimizar os recursos financeiros, ",
    meetings: [
      {
        dayMeeting: 5,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "7a2b34c5-9e8d-6f7a-5c4b-3a2b1c0d9e8d",
    name: "Marketing",
    color: "#FF7F50",
    userId: "2",
    description: "Equipe responsável pelo marketing da empresa.",
    meetings: [
      {
        dayMeeting: 1,
        hourMeeting: 1,
      },
      {
        dayMeeting: 2,
        hourMeeting: 2,
      },
      {
        dayMeeting: 3,
        hourMeeting: 1,
      },
      {
        dayMeeting: 4,
        hourMeeting: 3,
      },
      {
        dayMeeting: 5,
        hourMeeting: 9,
      },
      {
        dayMeeting: 6,
        hourMeeting: 4,
      },
    ],
  },
  {
    id: "c9b8a7d6-5f4e-3d2c-1b0a-9e8d7c6b5f4e",
    name: "Recursos Humanos",
    color: "#FFD700",
    userId: "6",
    description:
      "Equipe dedicada e especializada em recursos humanos, responsável por gerenciar estrategicamente os aspectos relacionados aos colaboradores da empresa.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "7a2b34c5-B-3a2b1c0d9e8d",
    name: "Gerência",
    color: "#AA8F54",
    userId: "2",
    description:
      "Equipe multifuncional e estratégica responsável por gerir a empresa em todos os aspectos, incluindo finanças, recursos humanos, operações, marketing e vendas. ",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "c9b8a7d6-C-9e8d7c6b5f4e",
    name: "Infraestrutura",
    color: "#CBC311",
    userId: "6",
    description:
      "Equipe altamente capacitada e especializada na gestão e manutenção da infraestrutura da empresa. Desde a administração dos sistemas de tecnologia da informação até a supervisão dos espaços físicos, nossa equipe garante o funcionamento eficiente e seguro de todos os recursos e ativos da empresa. ",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },

  {
    id: "54321cba-D-3210fedcba98",
    name: "Administrativo",
    color: "#FF1403",
    userId: "9",
    description:
      "Equipe setor administrativo. Com habilidades sólidas em organização, planejamento e tomada de decisões, nossa equipe atua na gestão eficiente dos processos internos, incluindo recursos humanos, finanças, compras, logística e documentação. ",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "a1b2c3d4-E-k1l2m3n4o5p",
    name: "Cultura Organizacional",
    color: "#116411",
    userId: "7",
    description:
      "Equipe dedicada e estratégica responsável por melhorar e fortalecer a cultura organizacional da empresa",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p",
    name: "Area Criativa",
    color: "#006400",
    userId: "7",
    description:
      "Com profissionais especializados em design gráfico, design de produto, redação publicitária e outras disciplinas criativas, trabalhamos para desenvolver conceitos inovadores, identidade visual atraente e estratégias de comunicação impactantes.",
    meetings: [
      {
        dayMeeting: 6,
        hourMeeting: 1,
      },

      {
        dayMeeting: 1,
        hourMeeting: 7,
      },
      {
        dayMeeting: 4,
        hourMeeting: 2,
      },
    ],
  },
  {
    id: "23f56a89-A-6b4cde0f9876",
    name: "Produto",
    color: "#998089",
    userId: "4",
    description:
      "Equipe com ampla expertise em pesquisa de mercado, design, engenharia e gerenciamento de projetos, nossa equipe trabalha em estreita colaboração para criar e aprimorar produtos inovadores que atendam às necessidades dos clientes.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "54321cba-edc9-ba98-7654-3210fedcba98",
    name: "Social Media",
    color: "#563574",
    userId: "9",
    description:
      "Equipe responsável pela gestão financeira da empresa. Equipe dinâmica e estratégica responsável pela gestão das redes sociais da empresa. ",
    meetings: [
      {
        dayMeeting: 6,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "27865abc-15hj-222-333-3230mitvkba98",
    name: "Solução de Problemas",
    color: "#FF1493",
    userId: "17",
    description: "Equipe responsável pela rotina de projetos da empresa.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "976458-abhjd422-jk200tvk800",
    name: "Design",
    color: "#0b0980",
    userId: "15",
    description:
      "Equipe responsável pelo desenvolvimento da imagem e design do produto.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "837362j-ksjdfh892-nk12",
    name: "Sonografia",
    color: "#5c16b8",
    userId: "18",
    description: "Equipe responsável pelos equipamentos de som dos eventos. ",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "8374628-jsgd527-jak23",
    name: "Regulamentação",
    color: "#068f90",
    userId: "20",
    description: "Equipe pela regulamentação dos equipamentos utilizados.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "923847-jshd-222-333-444-555",
    name: "Entrega",
    color: "#d22a82",
    userId: "15",
    description: "Equipe pela vistoria das entregas.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "207654-abcd-080808",
    name: "Revisão",
    color: "#8c1d3e",
    userId: "14",
    description: "Equipe responsável pela revisão e correção dos documentos.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "1237070-cdf-908765",
    name: "Estoque",
    color: "#25b455",
    userId: "11",
    description: "Equipe responsável pela atualização do estado do estoque.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "9876-kbn-2076",
    name: "Figurino",
    color: "#FF1493",
    userId: "15",
    description: "Equipe responsável pela elaboração do figurino.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "789-4jn-2hs79",
    name: "Ilustração",
    color: "#6959CD",
    userId: "1",
    description: "Equipe responsável pela ilustração e finalização.",
    meetings: [
      {
        dayMeeting: 4,
        hourMeeting: 1,
      },
      {
        dayMeeting: 4,
        hourMeeting: 9,
      },
      {
        dayMeeting: 5,
        hourMeeting: 12,
      },
      {
        dayMeeting: 6,
        hourMeeting: 1,
      },
    ],
  },
  {
    id: "7909090-kljmh-72643j",
    name: "Rotação",
    color: "#0b0980",
    userId: "1",
    description:
      "Equipe dedicada e responsável pela gestão da rotação dos turnos na empresa. Compreendendo a importância de um funcionamento contínuo e eficiente, nossa equipe assegura a cobertura adequada de pessoal em diferentes horários e turnos.",
    meetings: [
      {
        dayMeeting: 5,
        hourMeeting: 6,
      },

      {
        dayMeeting: 1,
        hourMeeting: 4,
      },
      {
        dayMeeting: 2,
        hourMeeting: 2,
      },
    ],
  },
];

export function mockTeam() {
  localStorage.removeItem("teams");
  localStorage.setItem("teams", JSON.stringify(teams));
}
