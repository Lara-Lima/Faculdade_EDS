# Informações do Projeto

`TÍTULO DO PROJETO`

FusOrienta

`CURSO`

Engenharia de Software

## Participantes

- Bernardo Elias Renttins Vasconcelos de Sousa
- João Augusto Aquino Campelo
- Juliana Parreiras Guimarães da Cunha
- Lara Lima Pereira
- Pedro Henrique Marques de Oliveira
- Rodrigo Garcia Ribas

# Estrutura do Documento

- [Informações do Projeto](#informações-do-projeto)
  - [Participantes](#participantes)
- [Estrutura do Documento](#estrutura-do-documento)
- [Introdução](#introdução)
  - [Problema](#problema)
  - [Objetivos](#objetivos)
  - [Justificativa](#justificativa)
  - [Público-Alvo](#público-alvo)
- [Especificações do Projeto](#especificações-do-projeto)
  - [Personas e Mapas de Empatia](#personas-e-mapas-de-empatia)
  - [Histórias de Usuários](#histórias-de-usuários)
  - [Requisitos](#requisitos)
    - [Requisitos Funcionais](#requisitos-funcionais)
    - [Requisitos não Funcionais](#requisitos-não-funcionais)
  - [Restrições](#restrições)
- [Projeto de Interface](#projeto-de-interface)
  - [User Flow](#user-flow)
  - [Wireframes](#wireframes)
- [Metodologia](#metodologia)
  - [Divisão de Papéis](#divisão-de-papéis)
  - [Ferramentas](#ferramentas)
  - [Controle de Versão](#controle-de-versão)
- [Projeto da Solução](#projeto-da-solução)
  - [Tecnologias Utilizadas](#tecnologias-utilizadas)
  - [Arquitetura da solução](#arquitetura-da-solução)
- [Avaliação da Aplicação](#avaliação-da-aplicação)
  - [Plano de Testes](#plano-de-testes)
  - [Registros de Testes](#registros-de-testes)
- [Referências](#referências)

# Introdução

## Problema

<p align="justify"> O aumento de empresas multinacionais tem sido um fator recorrente na atualidade, impulsionado pela globalização e pela busca por novos mercados. Entretanto, essa expansão também traz desafios para as empresas, como a dificuldade de gerir colaboradores que possuem fuso-horários diferentes. Muitas vezes, as empresas precisam lidar com funcionários em diferentes países, o que pode dificultar a comunicação e o trabalho em equipe.</p>

<p align="justify">Além disso, outra dificuldade enfrentada por empresas multinacionais é a questão da remuneração dos funcionários em moedas diferentes, sujeitas a flutuações no mercado financeiro. Isso pode causar problemas tanto para os colaboradores que recebem o pagamento em uma moeda diferente da sua, quanto para a própria empresa, que precisa lidar com as oscilações cambiais e garantir que os salários sejam justos e competitivos.</p>

<p align="justify">Outra questão relevante é a dificuldade em marcar reuniões que respeitem os fusos horários de todos os trabalhadores. As empresas precisam lidar com diferentes horários de trabalho e intervalos para refeição em cada país, o que pode tornar difícil encontrar um horário adequado para todos. É importante que as empresas adotem medidas para facilitar a comunicação entre colaboradores de diferentes países e horários, como o uso de ferramentas para reuniões.</p>

<p align="justify">Em resumo, o aumento de empresas multinacionais traz consigo desafios que devem ser superados para garantir o sucesso das operações. É necessário encontrar soluções para lidar com as dificuldades de gerir colaboradores em fusos horários diferentes, garantir a remuneração justa e competitiva em moedas diferentes e marcar reuniões que respeitem as diferenças de horário entre os trabalhadores.</p>

## Objetivos

<p align="justify">Assim, este trabalho busca contribuir com a sociedade por meio do desenvolvimento de uma ferramenta tecnológica que possa ser utilizada para gestão de reuniões em diferentes fusos horários e conversão de moedas para empresas multinacionais. Para alcançar esse objetivo, os seguintes objetivos específicos serão utilizados:</p>

<p align="justify">- Identificar as necessidades das pessoas que trabalham em empresas multinacionais em relação à gestão de reuniões em diferentes fusos horários e conversão de moedas;</p>
<p align="justify">- Desenvolver um software que permita marcar reuniões considerando as diferenças de fuso horário e converter automaticamente as moedas utilizadas pelos colaboradores da empresa;</p>
<p align="justify">- Facilitar o gerenciamento de usuários em fusos diferentes.</p>

## Justificativa

<p align="justify">Devido à importância dessas questões, torna-se cada vez mais necessário o desenvolvimento de soluções tecnológicas e estratégias eficientes capazes de auxiliar o cliente a conciliar o trabalho com as necessidades cotidianas. Portanto, o desenvolvimento de um software que automatize e facilite esse processo pode trazer diversos benefícios, como redução de erros, economia de tempo e aumento da eficiência operacional. Além disso, com a dificuldade de conversão de moedas acerca do pagamento e do suporte para atividades internacionais faz-se necessário a transparência da flutuação da moeda para com o funcionário. Portanto, contribuindo no meio empresarial e tecnológico.</p>

## Público-Alvo

<p align="justify">O público-alvo desse projeto são profissionais que trabalham em empresas multinacionais e enfrentam dificuldades para agendar reuniões com suas equipes devido ao fuso horário. Para melhor compreensão desses perfis, foram criadas três personas, sendo que serão detalhadas no decorrer do trabalho:</p>

<p align="justify">Persona 1:
  
Amélia Campos é uma mãe de 43 anos que trabalha em uma empresa de tecnologia colombiana. Ela tem dificuldades para organizar sua rotina e frequentemente se confunde com os horários das reuniões.</p>

<p align="justify">Persona 2:
  
Jorge é um senhor de 63 anos que trabalha em uma fábrica industrial multinacional e encontra dificuldades para se adaptar às novas tecnologias.</p>

<p align="justify">Persona 3:
  
Igor é um homem de 25 anos, pai de família e muito focado em seu trabalho. Ele está em constante contato com ferramentas de software e se adapta facilmente às tecnologias. No entanto, ele não gosta de distrações e valoriza a objetividade.</p>

<p align="justify">Portanto o Mapa de Stakeholders deste projeto inclui as seguintes pessoas:</p>

<p align="justify">Pessoas fundamentais: Pessoas que precisam converter fuso horário.</p>
<p align="justify">Pessoas importantes: Empresas, colegas de trabalho e familiares.</p>
<p align="justify">Pessoas influenciadoras: Estados, países e companhias aéreas.</p>

<p align="justify">Com base nesses perfis, a solução deve ser fácil de usar, explicativa e objetiva, apresentando informações precisas e relevantes. É importante lembrar que o problema em comum é o agendamento das reuniões, mas, cada persona possui diferentes níveis de conhecimento em tecnologia, e, portanto, a solução deve ser projetada para atender a essas diferenças.</p>

# Especificações do Projeto

<p align="justify">Foi utilizada a técnica de pesquisa entrevista quantitativa para a elaboração do projeto em questão, onde foram entrevistadas sete pessoas e suas respostas analisadas para a criação de três personas que representam os usuários reais da solução. Persona é uma técnica fundamental em projetos de design de produtos e serviços, pois elas permitem compreender as características, necessidades, desejos e comportamentos dos usuários, o que resulta em soluções mais adequadas e personalizadas. Além disso, foi criado um mapa de empatia para cada persona, que permite visualizar e compreender melhor as emoções, motivações e influências que afetam a jornada do usuário. Dessa forma, foi possível mapear as necessidades e desejos de cada persona de forma mais clara e objetiva.</p>

<p align="justify">Foram elaboradas histórias de usuário para o projeto, que são descrições simples das funcionalidades necessárias para atender às necessidades dos usuários. Essa técnica é importante para identificar os requisitos funcionais e não funcionais e as restrições da aplicação. Os requisitos funcionais são as funcionalidades que um produto ou serviço deve ter, enquanto os requisitos não funcionais referem-se às especificações que afetam a qualidade da experiência do usuário. As restrições, por sua vez, são as limitações que afetam o desenvolvimento ou uso do sistema, como orçamento, tempo e recursos humanos.</p>

## Personas e Mapas de Empatia

<p align="justify">Personas/ Mapa de Empatia

<p align="justify">Persona 1: Amélia Campos:
Amélia Campos é uma profissional de 43 anos que trabalha na área de atendimento ao cliente em uma empresa de tecnologia colombiana, onde faz palestras casualmente. Ela tem como hobby a academia e é uma pessoa relativamente tranquila, embora tenha picos de estresse de tempos em tempos devido à desorganização dentro de seu trabalho. Trabalhar para uma empresa de fora gera uma série de conflitos que inevitavelmente afetam sua rotina. Seus sonhos são subir na empresa para melhorar a qualidade de vida de sua família. Ela trabalha na sala de sua casa, o que nem sempre é um local tranquilo para realizar as reuniões, pois não possui muita privacidade. Amélia precisa apenas do computador, acesso à Internet e alguns utensílios de papelaria para realizar suas tarefas. Seus objetivos-chave com a solução são: organizar melhor o seu horário para a realização de reuniões empresariais, pois Amélia possui tanto tarefas domésticas quanto profissionais. Para atendê-la de forma adequada, é importante fornecer um atendimento humanizado, que possa responder suas possíveis dúvidas em relação ao uso de tecnologia e o tempo. O atendimento deve ser rápido e objetivo, para que não tome muito de seu tempo e ajude-a a alcançar seus objetivos com a aplicação.</p>

<p align="justify">Persona 2: Jorge Amado:
Jorge Amado, um senhor de 63 anos, é conhecido por seu hobby de colecionar itens de antiquário. Atualmente, ele é um empregado da área mecânica e Jorge trabalha dentro de uma fábrica industrial em uma multinacional e trabalha com ferramentas pesadas eletrônicas e mecânicas, além de estar sempre acompanhado do pacote office. Com uma personalidade bem-humorada e prestativa, Jorge é uma pessoa que preza pela tranquilidade em sua vida. Ele não mistura trabalho com lazer e sempre está pronto para ajudar quem precisa. Seus sonhos são simples, viver o resto de sua velhice tranquilamente e somar o dinheiro do trabalho com a aposentadoria. Seus objetivos-chave com a aplicação são: como Jorge é um empregado muito experiente na área industrial, ele costuma a participar frequentemente de reuniões internacionais importantes, e alega ter muitos problemas para chegar no horário por conta dessa diferenças de fusos, que pode ser suprida pela nossa solução. No entanto, ele não tem muita experiência no ramo da tecnologia e precisa de um tratamento especial para auxiliá-lo em suas dúvidas. É necessária uma equipe disponível para sanar suas dúvidas por meio de chat ou ligações. Em resumo, Jorge Amado é um trabalhador dedicado, que gosta de colecionar itens antigos e preza por sua tranquilidade. Com uma personalidade amigável e prestativa, ele é uma pessoa que merece um tratamento especial para que possa desenvolver suas habilidades e manter seu cargo na empresa.</p>

<p align="justify">Persona 3: Igor:
Igor Gonçalves é um jovem de 25 anos que tem uma personalidade extremamente séria e focada. Ele é graduado em bacharelado de engenharia elétrica e atualmente trabalha como coordenador de manutenção industrial, responsável pelas partes elétrica e mecânica. Seu hobby favorito é jogar xadrez e sonha em conseguir um emprego fora do país para proporcionar melhores condições de vida para sua família, com quem ele vive junto com sua esposa e filhos. No trabalho, Igor lida com ferramentas pesadas e softwares de manutenção, incluindo o SAP, que ele utiliza para gerenciar a manutenção na fábrica industrial onde trabalha. Embora tenha uma grande responsabilidade gerencial, seu escritório fica dentro da fábrica. Igor é extremamente competente na área da tecnologia, mesmo não trabalhando diretamente com ela. Ele é capaz de aprender rapidamente novos softwares e identificar funcionalidades específicas, mas prefere quando as funcionalidades são fáceis de encontrar. Embora seja uma pessoa muito séria, Igor não tolera muitas piadas no ambiente de trabalho. Os objetivos chaves de Igor com nossa solução são: marcar reuniões internacionais em horários justos para os envolvidos e conversão de moedas ao lidar com questões internacionais, pois o mesmo recebe seu salário em dólar, por conta de trabalhar em uma empresa multinacional indiana.</p>

## Histórias de Usuários

<p align="justify">Com base na análise das personas forma identificadas as seguintes histórias de usuários:</p>

| EU COMO... `PERSONA` | QUERO/PRECISO ... `FUNCIONALIDADE`                                           | PARA ... `MOTIVO/VALOR`                                                                   |
| -------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Gerente de Projeto   | Sugestão de horários para reuniões                                           | Melhorar o gerenciamento do tempo.                                                        |
| Gerente de Projeto   | Organizar os horários da minhas equipe.                                      | Melhorar a dinâmica do meu trabalho.                                                      |
| Gerente de Projeto   | Um calendário que mostre as reuniões marcadas                                | Organizar meus horários melhor.                                                           |
| Gerente de Projeto   | Visualizar os horários de cada funcionário.                                  | Respeitar o horário dos funcionarios                                                      |
| Usuario do Sistema   | Preciso uma solução fácil de utilizar.                                       | Conseguir compreender perfeitamente os procedimentos                                      |
| Usuario do Sistema   | uma funcionalidade de conversão de moedas integrada                          | para facilitar o planejamento de reuniões internacionais e entender os custos envolvidos. |
| Usuario do Sistema   | Quero uma solução que tenha um tutorial com passo a passo.                   | Para entender cada procedimento                                                           |
| Usuario do Sistema   | acessar a aplicação em diferentes dispositivos (computador, tablet, celular) | Para acessa-las de todo lugar.                                                            |

## Requisitos

<p align="justify">As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.</p>

### Requisitos Funcionais

| ID     | Descrição do Requisito                                                      | Prioridade |
| ------ | --------------------------------------------------------------------------- | ---------- |
| RF-001 | Permitir que o usuário visualize o fuso horário dos demais participantes    | ALTA       |
| RF-002 | Sugerir horários de reuniões que beneficiem a maior parte dos participantes | ALTA       |
| RF-003 | Permitir editar os participantes já cadastrados                             | ALTA       |
| RF-004 | Permitir excluir os participantes já cadastrados                            | ALTA       |
| RF-005 | Sugerir horários de reuniões que beneficiem a maior parte dos participantes | ALTA       |
| RF-006 | Agrupar participantes para uma mesma reunião                                | ALTA       |
| RF-007 | criar processos claros para a marcação de uma reunião                       | ALTA       |
| RF-008 | Emitir um relatório de tarefas no mês                                       | MÉDIA      |
| RF-009 | Permitir uma esperiência obbjetiva e de fácil entendimento ao usuário       | MÉDIA      |
| RF-010 | Criar um calendário para visualização de reuniões                           | BAIXA      |
| RF-011 | Criar um histórico dos horários das reuniões                                | BAIXA      |
| RF-012 | Permitir editar perfil dos usuários                                         | BAIXA      |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                             | Prioridade |
| ------- | ------------------------------------------------------------------ | ---------- |
| RNF-001 | O sistema deve ser responsivo para rodar em um dispositivos móvel  | ALTA       |
| RNF-002 | O sistema deve ser intuitivo                                       | ALTA       |
| RNF-003 | O sistema deve cadastrar participantes                             | ALTA       |
| RNF-004 | O sistema deve considerar diferentes fuso-horários                 | ALTA       |
| RNF-005 | O sistema deve considerar diferentes tipo de moedas                | MEDIA      |
| RNF-006 | Deve processar sugestões de horários para reuniões em no máximo 3s | BAIXA      |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID  | Restrição                                                                            |
| --- | ------------------------------------------------------------------------------------ |
| 01  | O projeto deverá ser entregue até o final do semestre                                |
| 02  | Os horários sugeridos não podem ser em algum horário de almoço de algum participante |
| 03  | Os horários sugeridos não podem ultrapassar o expediente o de algum participante     |
| 04  | Não pode ser desenvolvido um módulo de backend                                       |

# Projeto de Interface

<p align="justify">Com o objetivo de atender às exigências funcionais e não funcionais e às restrições, foram criadas soluções que atendam as nescessidades do usuário. Identificou-se que o projeto deveria ter uma interface intuitiva e fácil de usar, além de fornecer informações claras e explicativas sobre cada processo. Para atingir esses objetivos, optou-se por usar textos descritivos sempre que possível e planejar o posicionamento de cada elemento na interface com base em sua função, seguindo uma ordem lógica e coerente.</p>

<p align="justify">Um aspecto importante considerado foi a redução do tempo necessário para usar o sistema. Com esse objetivo, foram criadas soluções que evitam retrabalho e agilizam o uso do sistema. Por exemplo, quando um participante já está cadastrado em uma equipe, seu registro é automaticamente salvo para que possa ser facilmente acrescentado a outra equipe, sem a necessidade de um novo cadastro. Além disso, para uma ação de excluir ou editar algum elemento, optou-se por sempre alertar o usuário, visto que, se trata de açÕes que geram consequências importantes no sistema.</p>

<p align="justify">Em resumo, o foco principal ao criar essas soluções foi melhorar a experiência do usuário, oferecendo uma interface intuitiva, fácil de usar e com informações claras e objetivas, ao mesmo tempo em que se busca otimizar o tempo e reduzir a necessidade de retrabalho.</p>

## User Flow

<p align="justify">De modo a obter mais clareza no fluxo do usuário optou-se por dividido-lo nas partes:</p>

|     | Equipe                                  | Participante           | Fuso horários                   | Conversão de moedas            |                                            |
| --- | --------------------------------------- | ---------------------- | ------------------------------- | ------------------------------ | ------------------------------------------ |
| 01  | adicionar equipe                        | adicionar participante | Visualizar sugestão de reuniões | Pesquisar a cotação das moedas | Utilizar o conversor de cotação das moedas |
| 02  | criar uma equipe quando já se tem outra | editar participante    |                                 |                                |                                            |
| 03  | excluir equipe                          | excluir participante   |                                 |                                |                                            |

![image](https://user-images.githubusercontent.com/77630435/230778512-0e2af5ef-2776-47a9-9fbb-bfd4222ec0ed.png)

![image](https://user-images.githubusercontent.com/77630435/230779108-dfca5fb1-15af-4b95-92ee-692e58e3a03b.png)

![image](https://user-images.githubusercontent.com/77630435/230779279-4bfa73db-a53b-4ba1-a85c-91f742d1d78c.png)

![image](https://user-images.githubusercontent.com/77630435/230779331-f4183554-a1a4-4541-af36-3d755f106bc7.png)

![image](https://user-images.githubusercontent.com/77630435/230779143-0ce3c6ed-447d-4dea-affc-d7b10141740c.png)

![image](https://user-images.githubusercontent.com/77630435/230779256-40c4acdf-b2b9-47b4-9a72-5cf980c3c841.png)

![image](https://user-images.githubusercontent.com/77630435/230779188-bff622ee-50b1-470c-9e74-74eeebc6127a.png)

![image](https://user-images.githubusercontent.com/77630435/230779607-a8c7ce06-55a9-488e-9c16-d1c7a82af744.png)

## Wireframes

### Home

<p align="justify">Tela inicial. Primeiro contato do usuário com o projeto.</p>

|![image](https://user-images.githubusercontent.com/77630435/230779795-c47df17c-c3f5-4124-97b9-6471cdd39b42.png)

### Suas esquipes

<p align="justify">Tela responsável por aparecer as equipes já criadas. Essa tela também permite a criação de novas equipes.</p>

![image](https://user-images.githubusercontent.com/77630435/230780067-018c0dfb-994d-429e-891f-eae203846b1f.png)

### Adicionar Participantes

<p align="justify">Tela responsável para o usuário adicioanr os participantes. Essa mesma tela será a responsável por editar algum participante ja criado, nesse caso, o menu virá com o texto diferente.</p>

![image](https://user-images.githubusercontent.com/77630435/230780129-0d493e46-4e04-4639-82d6-6887c7091d49.png)

### Sugerir participantes já cadastrados

<p align="justify">Caso o usuário queira criar novas e quipes e já houver o cadastro de participantes essa tela aparecerá de modo a apresentar os participantes já cadastrados.</p>
  
![image](https://user-images.githubusercontent.com/77630435/230780268-e04fd29b-d5aa-49f3-824e-a2efd7569a2e.png)

### Modal de exclusão

<p align="justify">Para cada açao de excluir algo será apresentado esse modal. No caso de editar terá a mesma estrutura só que onde houver o texto "excluir" passará a ser "editar"</p>
  
![image](https://user-images.githubusercontent.com/77630435/230780304-8af9ceb0-9cd5-45e1-b0bf-730de5904d9a.png)

### Equipe

<p align="justify">Essa tela é a principal, será o local onde o sistema apresentará os melhores horários para reuniões e também no canto direito haverá um conversor de moedas com cada moeda dos participantes.</p>
  
![image](https://user-images.githubusercontent.com/77630435/230780497-6dc13c4c-9db8-4d1b-8a13-2770d6af19fc.png)

# Metodologia

<p align="justify">Fizemos primeiramente o levantamento do problema (conversão de medidas), e então pesquisamos alguma área da vida real na qual essa questão se fazia presente (empresas multinacionais). A partir disso, entrevistamos funcionários e outras pessoas da área para adquirir uma visão mais ampla e completa do problema, e dessas entrevistas também criamos nossas personas. A divisão de papéis foi feita por tópicos. Realizamos a maior parte das tarefas em conjunto, através de reuniões online ou pessoalmente, e gradualmente íamos passando as partes feitas para o Trello. Sempre que um novo tópico era adicionado ou editado, o texto era lido em seu todo para identificar problemas ou incongruências, revisamos constantemente para evitar falhas. Caso uma tarefa dependesse de outra que ainda estava em andamento optavamos por focar nela para que ela não fosse um impeditivo para a outra.</p>

Para o maior detalhamento das tarefas clique [aqui](https://trello.com/invite/b/t1pBjogo/ATTIb6e172da9e7f3937bc3c551757e7d2c2EDDF97FC/tiaw-sprint-1) para acessar o nosso Trello.

## Divisão de Papéis

<p align="justify">Na equipe a Juliana Cunha adotou o papel de Product Owner, Joao Augusto como Scrum Master, Lara Lima como designer e Rodrigo Ribas e Bernardo e Pedro Henrique como parte da equipe, a dinâmica de trabalho muitas vezes envolvia a participação direta de todos os membros em diversas tarefas.Apesar de possuírem papéis definidos, a equipe adotou uma abordagem colaborativa, em que todos trabalhavam em conjunto para atingir os objetivos do projeto. Isso resultou em uma troca constante de informações e ideias, além de uma maior flexibilidade para adaptação às mudanças. Segue as tarefas realizadas:</p>

| Participantes                               | Tarefas                                        |
| ------------------------------------------- | ---------------------------------------------- |
| TODOS                                       | Conferir o relatório do GitHub                 |
| TODOS                                       | Conferir o Miro                                |
| Juliana Cunha - Lara Lima - Pedro Henrique  | Criar o WireFrame no Figma                     |
| Bernardo - João Augusto -Lara Lima          | Criar protótipo interativo                     |
| TODOS                                       | Criar fluxo de usuário                         |
| TODOS                                       | Criar história de usuário                      |
| Rodrigo Ribas                               | Formatar o Miro - Design thinking              |
| Bernado - Juliana Cunha - Lara Lima         | Revisar a gramática dos textos                 |
| Bernado –Pedro Henrique                     | Criar Restrições                               |
| Bernardo- João Augusto - Pedro Henrique     | Criar Requisitos não funcionais                |
| Juliana Cunha - Lara Lima - Rodrigo Ribas   | Criar Requisitos funcionais                    |
| João Augusto -Pedro Henrique- Juliana Cunha | Criar Personas (3 total)                       |
| TODOS                                       | Entrevistar ao menos uma pessoa(6 no total)    |
| TODOS                                       | Elaborar Perguntas para entrevista qualitativa |
| João Augusto                                | Incluir justificativa                          |
| Pedro Henrique                              | Redigir sobre o público alvo                   |
| Rodrigo Ribas                               | Redigir os Objetivos Gerais e Específicos      |
| Lara Lima - Juliana Cunha                   | Dissertar sobre o Problema                     |
| TODOS                                       | Escolha do tema                                |

Para o maior detalhamento das tarefas clique [aqui](https://trello.com/invite/b/t1pBjogo/ATTIb6e172da9e7f3937bc3c551757e7d2c2EDDF97FC/tiaw-sprint-1) para acessar o nosso Trello.

## Ferramentas

| Ambiente                    | Plataforma      | Link de Acesso                                                                                            |
| --------------------------- | --------------- | --------------------------------------------------------------------------------------------------------- |
| Ferramenta de comunicaçao   | Microsoft Teams | [Microsoft Teams](https://www.microsoft.com/pt-br/microsoft-teams/log-in)                                 |
| Divisão de Tarefas(Kanbam)  | Trello          | [Trello](https://trello.com/invite/b/t1pBjogo/ATTIb6e172da9e7f3937bc3c551757e7d2c2EDDF97FC/tiaw-sprint-1) |
| Processo de Design Thinkgin | Miro            | [Miro](https://miro.com/app/board/uXjVMYe-H40=/)                                                          |
| Repositório de código       | GitHub          | [GitHub](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2023-1-ti1-2401100-fusorienta)                 |
| User Flow                   | Miro            | [Miro](https://miro.com/app/board/uXjVMUlVxL0=/)                                                          |
| Protótipo Interativo        | Figma           | [Figma](https://www.figma.com/file/IHZceYFnZbTBlowAw7pgUK/wireframe---TIAW?t=0ZeRotxS3Z5IAOXX-1)          |

<p align="justify">O uso das ferramentas supracitadas trazem muitos benefícios em um projeto. O Microsoft Teams é importante para comunicação e colaboração em equipe, permite que os membros da equipe trabalhem juntos em tempo real, compartilhem arquivos e documentos, e realizem chamadas. O Trello é uma ferramenta extremamente útil para criar um Kanban porque permite que as equipes visualizem o progresso de seus projetos em tempo real e possibilita múltiplas interações . O Miro é uma ferramenta importante para o processo de Design Thinking, ajuda as equipes a criar uma visão clara do que estão tentando alcançar, o que é essencial para o sucesso do projeto, além de possibilitar inserir formas e também sugerir templates que são úteis na criação de fluxogramas. O GitHub é uma plataforma valiosa para a hospedagem e gerenciamento do código fonte, permite a colaboração em projetos de software. Por fim, o Figma é uma ferramenta crucial para o design de interface de usuário e prototipagem interativa, fornce um ambiente completo para a elaboraçao das telas e dos protótipos.</p>

## Controle de Versão

<p align="justify">O projeto em questão segue uma convenção específica para nomear seus branchs, a fim de manter uma organização adequada e facilitar a compreensão de cada uma das versões. A branch "master" é utilizada para a versão estável e já testada do software, enquanto a branch "unstable" é destinada para uma versão que já foi testada, mas ainda é considerada instável. A branch "testing" é reservada para a versão em teste do software, e a branch "dev" é utilizada para a versão de desenvolvimento.</p>

<p align="justify">Além disso, a gerência de issues também segue uma convenção específica, onde são utilizadas etiquetas para categorizar os diferentes tipos de problemas encontrados no software. A etiqueta "bugfix" é utilizada para identificar uma funcionalidade que apresenta problemas, enquanto a etiqueta "enhancement" é utilizada para identificar uma funcionalidade que precisa ser melhorada. Por fim, a etiqueta "feature" é utilizada para identificar a necessidade de introduzir uma nova funcionalidade no software.</p>

<p align="justify">A utilização de convenções para a gestão de branchs e etiquetas é uma prática comum em projetos de desenvolvimento de software, pois ajuda a manter a organização e a rastreabilidade do projeto. No entanto, especificamente na primeira parte do projeto em que foram realizados acréscimos no relarotio sobre o produto e o pdf do design thinking, foi utilizado o recurso para documentar as ações realizadas em cada commit: os comentários com verbos referentes a ações. Essa abordagem é uma forma de garantir que as mudanças realizadas no código sejam documentadas de forma clara e objetiva, a utilização de verbos referentes a ações ajuda a identificar as atividades realizadas em cada commit, tornando mais fácil a compreensão das alterações realizadas e o rastreamento de problemas.</p>

# Projeto da Solução

<p align="justify">A solução utilizada consiste em um sistema que permite que cada usuário crie conexões entre si, possibilitando a formação de equipes. Cada equipe tem um propósito específico e é composta por pessoas diferentes. Os usuários têm acesso aos horários ideais para reuniões, bem como horários razoáveis, levando em consideração os intervalos de almoço. Isso auxilia na visibilidade do time. Além disso, dentro de cada equipe, há também a conversão de moedas.</p>

<p align="justify">No sistema, é possível adicionar e excluir equipes, bem como adicionar e excluir membros das equipes. Isso permite uma gestão flexível das equipes de acordo com as necessidades da empresa. Essa solução atinge as empresas multinacionais, onde é necessário conectar profissionais de diferentes países e facilitar a comunicação e colaboração entre eles. Com a possibilidade de formar equipes com base nos objetivos e habilidades específicos, o sistema oferece uma forma de aumentar a visibilidade e otimizar o tempo na escolha de horários de reuniões.</p>

## Tecnologias Utilizadas

<p align="justify">Foram utilizadas diversas tecnologias para criar uma aplicação web robusta e funcional. A base da plataforma é formada por HTML, CSS e JavaScript. Para facilitar o desenvolvimento e garantir uma aparência moderna e responsiva, o framework Bootstrap foi utilizado. Para obter as informações das moedas e suas conversões foi utilizada a API Awesomeapi. Essa API fornece dados atualizados sobre moedas, permitindo a consulta de valores, taxas de câmbio e outras informações relacionadas. A API Restcountries foi utilizada para obter informações sobre os países disponíveis na aplicação. Essa API oferece dados como nome, capital, população, idioma e outros detalhes relevantes sobre os países. Por fim, o Dicebear foi utilizado para criar uma imagem personalizada quando o usuário se cadastra na aplicação. O Dicebear é uma biblioteca que permite a geração de avatares aleatórios e exclusivos com base em um conjunto de características pré-definidas.</p>

## Arquitetura da solução

<p align="justify">O sistema foi dividido em duas partes principais: a parte pública e a parte privada.</p>

<p align="justify">Na parte pública, os visitantes têm acesso a informações gerais sobre a plataforma e podem realizar o registro para criar uma conta. Já na parte privada, após o login, os usuários autenticados têm acesso a recursos avançados, como visualização de horários disponíveis, agendamento de reuniões e acesso aos membros de equipes e usuários.</p>

<p align="justify">Foram criadas classes para representar entidades importantes, como Time, Usuário e Membro. Cada uma dessas classes encapsula os dados e comportamentos específicos relacionados à entidade correspondente, tornando o código mais modular e orientado a objetos. As classes permitem armazenar detalhes e realizar funções, o que facilita o acesso e a manipulação desses dados em diferentes partes do código.</p>

<p align="justify">Além disso, é utilizado a separação de pastas por página e funcionalidade, com arquivos HTML, CSS e JavaScript inclusos, contribui para um desenvolvimento mais organizado e uma manutenção simplificada.</p>

# Avaliação da Aplicação

**1.Cenário de teste: Teste de Tela Inicial**

<p align="justify">Funcionalidade avaliada: Tela inicial da aplicação com opções de login e cadastro.</p>

<p align="justify">Descrição: Verificar se o usuário é direcionado corretamente para as telas de login e cadastro ao clicar nas respectivas opções na tela inicial.</p>

**2.Cenário de teste: Teste de Cadastro**

<p align="justify">Funcionalidade avaliada: Cadastro de usuário na aplicação.</p>

<p align="justify">Descrição: Verificar se o usuário consegue preencher corretamente seus dados de cadastro e se os dados são armazenados corretamente para posterior login.</p>

**3.Cenário de teste: Teste de Login**

<p align="justify">Funcionalidade avaliada: Login do usuário na aplicação.</p>

<p align="justify">Descrição: Verificar se o usuário consegue efetuar o login com sucesso se os dados informados forem de um usuário cadastrado. Caso contrário, o acesso deve ser negado.</p>

**4.Cenário de teste: Teste de Perfil**

<p align="justify">Funcionalidade avaliada: Visualização e edição do perfil do usuário.</p>

<p align="justify">Descrição: Verificar se o usuário consegue visualizar corretamente suas informações pessoais e editar os campos desejados no perfil. Após salvar as alterações, um modal de confirmação deve ser exibido.</p>

**5.Cenário de teste: Teste de Tela de Equipe**

<p align="justify">Funcionalidade avaliada: Tela que exibe todas as equipes em que o usuário está cadastrado.</p>

<p align="justify">Descrição: Verificar se o usuário consegue visualizar corretamente a lista de equipes em que está cadastrado.</p>

**6.Cenário de teste: Teste de Adicionar Equipe**

<p align="justify">Funcionalidade avaliada: Adição de uma nova equipe pelo usuário.</p>

<p align="justify">Descrição: Verificar se o usuário consegue criar uma nova equipe preenchendo os campos necessários e se a equipe é adicionada com sucesso à lista de equipes do usuário.</p>

**7.Cenário de teste: Teste de Excluir Equipe**

<p align="justify">Funcionalidade avaliada: Exclusão de uma equipe existente pelo usuário.</p>

<p align="justify">Descrição: Verificar se o usuário consegue excluir uma equipe da qual faz parte, confirmar a exclusão e se a equipe é removida corretamente da lista de equipes do usuário.</p>

**8.Cenário de teste: Teste de Visualizar Conexões**

<p align="justify">Funcionalidade avaliada: Visualização das conexões entre pessoas do usuário cadastrado.</p>

<p align="justify">Descrição: Verificar se o usuário consegue visualizar corretamente a lista de suas conexões existentes.</p>

**9.Cenário de teste: Teste de Adicionar Conexão**

<p align="justify">Funcionalidade avaliada: Adição de uma nova conexão pelo usuário.</p>

<p align="justify">Descrição: Verificar se o usuário consegue adicionar uma nova conexão preenchendo os campos necessários e se a nova conexão é adicionada com sucesso à lista de conexões do usuário.</p>

**10.Cenário de teste: Teste de Excluir Conexão**

<p align="justify">Funcionalidade avaliada: Exclusão de uma conexão existente pelo usuário.</p>

<p align="justify">Descrição: Verificar se o usuário consegue excluir uma conexão da lista de conexões existentes e se a conexão é removida corretamente da lista de conexões do usuário.</p>

## Plano de Testes

- **Teste de Tela Inicial:**

<p align="justify">Funcionalidade avaliada: Tela inicial da aplicação com opções de login e cadastro.</p>
<p align="justify">Cenário: O usuário acessa a aplicação pela primeira vez.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário abre a aplicação.</p>
<p align="justify">O usuário visualiza a tela inicial.</p>
<p align="justify">O usuário clica na opção de login.</p>
<p align="justify">O usuário é direcionado para a tela de login.</p>
<p align="justify">O usuário clica na opção de cadastro.</p>
<p align="justify">O usuário é direcionado para a tela de cadastro.</p>
<p align="justify">Resultado esperado: O usuário é direcionado corretamente para as telas de login e cadastro ao clicar nas respectivas opções.</p>

- **Teste de Cadastro:**

<p align="justify">Funcionalidade avaliada: Cadastro de usuário na aplicação.</p>
<p align="justify">Cenário: O usuário deseja se cadastrar na aplicação.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário está na tela de cadastro.</p>
<p align="justify">O usuário preenche os dados necessários para o cadastro.</p>
<p align="justify">O usuário clica no botão de cadastrar.</p>
<p align="justify">Os dados informados são armazenados corretamente.</p>
<p align="justify">Resultado esperado: O usuário consegue preencher seus dados de cadastro e os dados são armazenados corretamente para posterior login.</p>

- **Teste de Login:**

<p align="justify">Funcionalidade avaliada: Login do usuário na aplicação.</p>
<p align="justify">Cenário: O usuário deseja efetuar o login na aplicação.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário está na tela de login.</p>
<p align="justify">O usuário informa seus dados de login.</p>
<p align="justify">O usuário clica no botão de login.</p>
<p align="justify">Os dados são verificados e o acesso é concedido se o usuário estiver cadastrado.</p>
<p align="justify">Resultado esperado: O usuário consegue efetuar o login se os dados informados forem de um usuário cadastrado. Caso contrário, o acesso é negado.</p>

- **Teste de Perfil:**

<p align="justify">Funcionalidade avaliada: Visualização e edição do perfil do usuário.</p>
<p align="justify">Cenário: O usuário deseja visualizar e editar suas informações no perfil.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário está na tela de perfil.</p>
<p align="justify">O usuário visualiza suas informações pessoais.</p>
<p align="justify">O usuário clica no botão de editar perfil.</p>
<p align="justify">O usuário realiza as alterações desejadas.</p>
<p align="justify">O usuário clica no botão de salvar alterações.</p>
<p align="justify">Um modal de confirmação é exibido informando que os dados foram alterados com sucesso.</p>
<p align="justify">Resultado esperado: O usuário consegue visualizar suas informações pessoais e editar os campos desejados. Após salvar as alterações, um alert onde é exibido uma mensagem indicando que os dados foram alterados com sucesso.</p>

- **Teste de Tela de Equipe:**

<p align="justify">Funcionalidade avaliada: Tela que exibe todas as equipes em que o usuário está cadastrado.</p>
<p align="justify">Cenário: O usuário deseja visualizar as equipes em que faz parte.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário está na tela de equipe.</p>
<p align="justify">O usuário visualiza a lista de equipes em que está cadastrado.</p>
<p align="justify">Resultado esperado: O usuário consegue visualizar corretamente a lista de equipes em que está cadastrado.</p>

- **Teste de Adicionar Equipe:**

<p align="justify">Funcionalidade avaliada: Adição de uma nova equipe pelo usuário.</p>
<p align="justify">Cenário: O usuário deseja criar uma nova equipe.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário está na tela de equipe.</p>
<p align="justify">O usuário clica no botão de adicionar equipe.</p>
<p align="justify">Um modal é exibido com os campos necessários para a criação da equipe (nome, descrição, membros, etc.).</p>
<p align="justify">O usuário preenche os campos obrigatórios.</p>
<p align="justify">O usuário clica no botão de confirmar criação da equipe.</p>
<p align="justify">Resultado esperado: Após preencher os campos e confirmar a criação da equipe, a nova equipe é adicionada com sucesso à lista de equipes do usuário.</p>

- **Teste de Excluir Equipe:**

<p align="justify">Funcionalidade avaliada: Exclusão de uma equipe existente pelo usuário.</p>
<p align="justify">Cenário: O usuário deseja excluir uma equipe da qual faz parte.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário está na tela de equipe.</p>
<p align="justify">O usuário seleciona a equipe que deseja excluir.</p>
<p align="justify">O usuário clica no botão de excluir equipe.</p>
<p align="justify">Um modal de confirmação é exibido para confirmar a exclusão da equipe.</p>
<p align="justify">O usuário confirma a exclusão da equipe.</p>
<p align="justify">Resultado esperado: Após confirmar a exclusão da equipe, a equipe é removida com sucesso da lista de equipes do usuário.</p>

- **Teste de Tela de Conexões:**

<p align="justify">Funcionalidade avaliada: Tela que exibe todas as conexões entre pessoas do usuário cadastrado.</p>
<p align="justify">Cenário: O usuário deseja visualizar, adicionar e excluir conexões com outras pessoas.</p>
<p align="justify">Fluxo:</p>
<p align="justify">O usuário está na tela de conexões.</p>
<p align="justify">O usuário visualiza a lista de suas conexões com outras pessoas.</p>
<p align="justify">O usuário clica no botão de adicionar conexão.</p>
<p align="justify">Um modal é exibido com os campos necessários para adicionar uma nova conexão (nome, perfil, etc.).</p>
<p align="justify">O usuário preenche os campos obrigatórios.</p>
<p align="justify">O usuário confirma a adição da nova conexão.</p>
<p align="justify">A nova conexão é adicionada à lista de conexões do usuário.</p>
<p align="justify">O usuário seleciona uma conexão existente na lista.</p>
<p align="justify">O usuário clica no botão de excluir conexão.</p>
<p align="justify">Um modal de confirmação é exibido para confirmar a exclusão da conexão.</p>
<p align="justify">O usuário confirma a exclusão da conexão.</p>
<p align="justify">A conexão é removida com sucesso da lista de conexões do usuário.</p>
<p align="justify">Resultado esperado: O usuário consegue visualizar corretamente a lista de suas conexões, adicionar novas conexões preenchendo os campos necessários e excluir conexões existentes conforme confirmado no modal de exclusão.</p>

<p align="justify">Os usuários usados para os testes internos (depois que entra no sistema pelo login) tinham o id 1, 2, 3 e 19. Em cada um dos testes mencionados acima, foram realizadas interações entre esses usuários. Foram escolhidos uma vez que cada um deles tinha uma quantidade diferente de conexões e equipes associadas. Além disso, também realizou-se testes com um dos três usuários que foram recentemente cadastrado, pois ele não possuía nenhuma equipe ou conexão. Esses testes destacaram possíveis erros no código, uma vez que não era esperado lidar com listas vazias de equipes ou conexões.</p>

## Registros de Testes

-Pontos fortes:

<p align="justify">Após a conclusão dos testes:
A funcionalidade de cadastro e login funcionou corretamente, permitindo que os usuários criem suas contas e acessem o sistema.
A visualização e edição do perfil do usuário também foram bem-sucedidas, permitindo que os usuários personalizem suas informações conforme desejado.
A adição de equipes e a exclusão delas funcionaram corretamente, fornecendo aos usuários a capacidade de gerenciar suas equipes de forma eficiente.
A tela de conexões permitiu que os usuários visualizassem, adicionassem e excluíssem conexões com outras pessoas, facilitando a colaboração.</p>

-Pontos fracos:

<p align="justify">Algumas falhas foram detectadas na validação dos dados de entrada durante o cadastro e login, o que pode comprometer a segurança e a integridade dos dados.
Visto que cada usuário vê os horários dos demais participantes de acordo com o seu horário, inicialmente, a lógica não funcionava em alguns casos como o horário ultrapassando o valor de 24 horas ou ficando com horas negativas.
Constantemente, a funcionalidade como edição, exclusão e adição não atualizavam na página o que foi solucionado quando elas eram rerenderizadas.
A conversão das moedas nem sempre funcionavam mas acontecia por conta da API não fornecer todas as conversões.</p>

-Para as próximas iterações, o grupo pretende abordar os seguintes pontos:

<p align="justify">Refinar a validação dos dados de entrada para garantir que apenas informações válidas sejam aceitas no cadastro e login(qualquer senha pode ser inserida e qualquer e-mail mesmo que ele não exista pode ser inserido).
Adicionar filtros para facilitar a visualização de todos os usuários e também de todas as equipes. Visto que, quando existe muito desses elementos foi observado que o usuário precisa dar scrol na tela muitas vezes.
Melhorar a indentidade visual e utilizar mais os mesmos componentes para funcionalidades parecidas, por exemplo quando se trata de membro da equipe e conexão são elementos diferentes mas se trata de pessoas da aplicação.</p>

# Referências

- [Stackoverflow](https://stackoverflow.com/)
- [Documentação JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions)
- [Documentação Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Alura e Classes](https://www.alura.com.br/artigos/as-classes-no-javascript?gclid=Cj0KCQjwy9-kBhCHARIsAHpBjHg-Yhu5sGaPWW5CfTFDUQP92Yryf6woS2siYdbTI8QwZF0Wy60Y5RcaAkW7EALw_wcB)
- [chatgpt](https://chat.openai.com/)
- [Documentação da Awesomeapi](https://docs.awesomeapi.com.br/)
- [Documentação da RestCountries](https://restcountries.com/)
- [Documentação da Dicebear](https://www.dicebear.com/)
- [Bootstrap Responsivo](https://www.youtube.com/watch?v=DFUT5s5SasA&t=47s&ab_channel=Divinector)
- [Bootstrap Elegante](https://www.youtube.com/watch?v=w2zix0oYyE8&ab_channel=SA7MAN)
- [Design com Bootstrap](https://www.youtube.com/watch?v=o_zyzFGLpBA&ab_channel=SA7MAN)
