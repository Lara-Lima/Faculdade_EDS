## 7. Testes da solução

Nesta sessão são apresentados os dois tipos de testes realizados:

 - O **Teste de Unidade**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

_Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)._

# Teste de Unidade

_Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software. Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe quais testes unitários são responsáveis por verificar a conformidade com o caso de teste. Associe também o componente que está sendo testado. Veja a tabela de exemplo._


**Caso de Teste** | **CT01 - Cadastrar usuário**
 :--------------: | ------------ |
**Procedimento**  | Cadastrar novo usuário. |
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro. |
**Resultado obtido** | Dado cadastrado com sucesso. |
**Teste unitário associado** | `UsuarioTest.testNewUser()` |

**Caso de Teste** | **CT02 - Cadastrar usuário com dados inválidos**
 :--------------: | ------------ |
**Procedimento**  | Cadastrar novo usuário. |
**Dados de entrada** | Inserção de dados inválidos no formulário de cadastro. |
**Resultado obtido** | Dado não cadastrado. |
**Teste unitário associado** | `UsuarioTest.testNewInvalidUser()` |

**Caso de Teste** | **CT03 - Cadastrar usuário já existente**
 :--------------: | ------------ |
**Procedimento**  | Cadastrar usuário já existente. |
**Dados de entrada** | Inserção de dados válidos com CPF já existente no banco. A
**Resultado obtido** | Dado não cadastrado. |
**Teste unitário associado** | `UsuarioTest.testExistingUser()` |

**Caso de Teste** | **CT04 - Editar Usuário**
 :--------------: | ------------ |
**Procedimento**  | Preencher informações de edição. |
**Dados de entrada** | Dados válidos de edição de usuário. |
**Resultado obtido** | Usuário editado com sucesso. |
**Teste unitário associado** | `UsuarioTest.testEditUser()` |

**Caso de Teste** | **CT05 - Editar Usuário com dados inválidos**
 :--------------: | ------------ |
**Procedimento**  | Preencher informações de edição. |
**Dados de entrada** | Dados inválidos de edição de usuário. |
**Resultado obtido** | Usuário não editado. |
**Teste unitário associado** | `UsuarioTest.testEditInvalidUserData()` |

**Caso de Teste** | **CT06 - Inativar Usuário**
 :--------------: | ------------ |
**Procedimento**  | Inativar usuário atual. |
**Dados de entrada** | Id do usuário que se deseja inativar. |
**Resultado obtido** | Dado editado com sucesso. |
**Teste unitário associado** | `UsuarioTest.testInativateUser()` |

**Caso de Teste** | **CT07 - Logar com Usuário Inativo**
 :--------------: | ------------ |
**Procedimento**  | Preencher informações de login. |
**Dados de entrada** | Dados do usuário invativo. |
**Resultado obtido** | Usuário não encontrado. |
**Teste unitário associado** | `UsuarioTest.testLoginWithInativeUser()` |

**Caso de Teste** | **CT08 - Cadastrar Hospedagem**
 :--------------: | ------------ |
**Procedimento**  | Cadastrar nova hospedagem. |
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro. |
**Resultado obtido** | Dado cadastrado com sucesso. |
**Teste unitário associado** | `hostingTest.testNewHosting()` |

**Caso de Teste** | **CT09 - Cadastrar Hospedagem com Dados Inválidos**
 :--------------: | ------------ |
**Procedimento**  | Cadastrar nova hospedagem com dados inválidos. |
**Dados de entrada** | Inserção de dados inválidos no formulário de cadastro. |
**Resultado obtido** | Dado não cadastrado. |
**Teste unitário associado** | `hostingTest.testInvalidNewHosting()` |

**Caso de Teste** | **CT10 - Cadastrar Experiência**
 :--------------: | ------------ |
**Procedimento**  | Cadastrar nova experiência. |
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro. |
**Resultado obtido** | Dado cadastrado com sucesso. |
**Teste unitário associado** | `experienceTest.testNewHosting()` |

**Caso de Teste** | **CT11 - Cadastrar Experiência com Dados Inválidos**
 :--------------: | ------------ |
**Procedimento**  | Cadastrar nova experiência com dados inválidos. |
**Dados de entrada** | Inserção de dados inválidos no formulário de cadastro. |
**Resultado obtido** | Dado não cadastrado. |
**Teste unitário associado** | `experienceTest.testInvalidNewHosting()` |

**Caso de Teste** | **CT12 - Edição de Hospedagem**
 :--------------: | ------------ |
**Procedimento**  | Editar hospedagem existente.
**Dados de entrada** | Inserção de dados válidos no formulário de edição. |
**Resultado obtido** | Dados editados com sucesso. |
**Teste unitário associado** | `hostingTest.testEditHosting()` |

**Caso de Teste** | **CT13 - Edição de Hospedagem com dados inválidos**
 :--------------: | ------------ |
**Procedimento**  | Editar hospedagem existente.
**Dados de entrada** | Inserção de dados inválidos no formulário de edição. |
**Resultado obtido** | Dados não editados. |
**Teste unitário associado** | `hostingTest.testEditInvalidHostingData()` |

**Caso de Teste** | **CT14 - Filtrar hospedagem por data**
 :--------------: | ------------ |
**Procedimento**  | Adicionar intervalo de data desejado ao filtro na aba explorar.
**Dados de entrada** | Inserção de dados do intervalo de data desejado. |
**Resultado obtido** | Hospedagens disponíveis no intervalo retornadas. |
**Teste unitário associado** | `hostingTest.testReturnHostingByDateFilter()` |

**Caso de Teste** | **CT15 - Edição de Experiência**
 :--------------: | ------------ |
**Procedimento**  | Editar experiencia existente. |
**Dados de entrada** | Inserção de dados válidos no formulário de edição. |
**Resultado obtido** | Dados editados com sucesso. |
**Teste unitário associado** | `experienceTest.testEditExperience()` |

**Caso de Teste** | **CT16 - Edição de Experiência com dados Inválidos**
 :--------------: | ------------ |
**Procedimento**  | Editar experiencia existente. |
**Dados de entrada** | Inserção de dados inválidos no formulário de edição. |
**Resultado obtido** | Dados não editados. |
**Teste unitário associado** | `experienceTest.testEditInvalidExperienceData()` |

**Caso de Teste** | **CT17 - Exclusão de Hospedagem**
 :--------------: | ------------ |
**Procedimento**  | Excluir hospedagem existente. |
**Dados de entrada** | Id da hospedagem que se deseja excluir. |
**Resultado obtido** | Dados removidos com sucesso. |
**Teste unitário associado** | `hostingTest.testDeleteHosting()` |

**Caso de Teste** | **CT18 - Exclusão de Experiência**
 :--------------: | ------------ |
**Procedimento**  | Excluir experiência existente. |
**Dados de entrada** | Id da experiência que se deseja excluir. |
**Resultado obtido** | Dados removidos com sucesso. |
**Teste unitário associado** | `experienceTest.testDeleteExperience()` |

**Caso de Teste** | **CT19 - Cadastrar Cupom**
 :--------------: | ------------ |
**Procedimento**  | Preencher informações de cadastro de cupom. |
**Dados de entrada** | Inserção de dados válidos no formulário de cadastro. |
**Resultado obtido** | Dados salvos com sucesso. |
**Teste unitário associado** | `CupomTest.testCreateCupom()` |

**Caso de Teste** | **CT20 - Aplicar Cupom**
 :--------------: | ------------ |
**Procedimento**  | Selecionar cupom durante o processo de compra. |
**Dados de entrada** | Dados do cupom selecionado. |
**Resultado obtido** | Dados da compra editados com sucesso. |
**Teste unitário associado** | `CupomTest.testUseCupom()` |

**Caso de Teste** | **CT21 - Aplicar Cupom em Hospedagem cadastradsa**
 :--------------: | ------------ |
**Procedimento**  | Selecionar cupom durante de desconto para a hospedagem em questão. |
**Dados de entrada** | Dados do cupom selecionado. |
**Resultado obtido** | Dados da hospedagem editados com sucesso. |
**Teste unitário associado** | `CupomTest.testApplyCupomToHostig()` |

**Caso de Teste** | **CT22 - Inativar Cupom após Uso**
 :--------------: | ------------ |
**Procedimento**  | Cupom deve ser inativado após uso dentro da interface do usuário logado. |
**Dados de entrada** | Dados do cupom utilizado após a compra. |
**Resultado obtido** | Cupom inativado com sucesso. |
**Teste unitário associado** | `CupomTest.testInativateCupom()` |

**Caso de Teste** | **CT23 - Selecionar Produtos no Carrinho**
 :--------------: | ------------ |
**Procedimento**  | Selecionar opção de enviar produto ao carrinho. |
**Dados de entrada** | Dados do produto selecionado. |
**Resultado obtido** | Inserção do produto ao carrinho. |
**Teste unitário associado** | `PurchaseTest.testAddProductToCart()` |

**Caso de Teste** | **CT24 - Realizar Reserva**
 :--------------: | ------------ |
**Procedimento**  | Selecionar opção de finalizar compra. |
**Dados de entrada** | Dados da compra em questão. |
**Resultado obtido** | Compra finalizada. |
**Teste unitário associado** | `PurchaseTest.testMakeReservation()` |


## Avaliação dos Testes de Unidade

Com base nos testes realizados, conseguimos identificar os pontos fortes e fracos da aplicação. Iniciando pelos pontos fracos, encontram-se entre eles problemas relacionados à tipagem de dados e questões com algumas rotas de edição de objetos.

Os pontos de fragilidade mencionados acima manifestam-se nos seguintes processos:

1) Durante a tentativa de cadastrar e/ou editar com dados de ou objetos relacionados a usuário, experiência e hospedagem.

2) Ao tentar editar as informações de um usuário, algumas são setadas nulas no banco de dados.
   
3) Falta de verificação em horários de checkIn e checkOut para cadastro de hospedagens.
   
4) Opção de aplicar cupom no carrinho de compra está em falta. 

Portanto, conclua-se que, apesar do fluxo da aplicação encontrar-se estável, tais questões levantadas anteriormente ainda hão de ser revisadas, corrigidas e testadas.
