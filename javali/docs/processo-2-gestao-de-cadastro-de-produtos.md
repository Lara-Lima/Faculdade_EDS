### 3.3.2 Processo 2 –Gestão de Cadastro de Produto

O processo de gestão de cadastro de produtos envolve as atividades relacionadas ao registro de novos produtos no sistema, abrangendo tanto produtos de hospedagem quanto experiências.

![diagram (8)](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2023-2-ti2-3740100-javali/assets/129118808/86460846-575d-4349-96e1-b4c71b68bb8a)

#### Detalhamento das atividades

- Selecionar cadastro de produto: para iniciar o processo de cadastro de um produto, o usuário seleciona a aba correspondente, escolhendo entre as opções de hospedagem ou experiência;
- Preencher informações do cadastro: o usuário preenche os campos necessários para o cadastro sendo, no caso de uma hospedagem, título, descrição, imagens, valor do aluguél, número de quartos, número de banheiros e área.
- Preencher informações do cadastro: o usuário preenche os campos necessários para o cadastro sendo, no caso de uma experiência, título, descrição, imagens e valor do produto.
- Hospedagem cadastrada: após verificar se as informações estão corretas, o sistema cadastra a hospedagem no banco de dados e informa ao usuário uma confirmação com agradecimento.
- Hospedagem cadastrada: após verificar se as informações estão corretas, o sistema cadastra a experiência no banco de dados e informa ao usuário uma confirmação com agradecimento.
- Editar informações: O cliente edita os campos desejado de um produto já cadastrado.
- Produto editado: As informações são salvas no banco de dados e o anúncio é atualizado na tela com as informações editadas pelo usuário.
- Selecionar produto que deseja excluir: O cliente seleciona um entre todos os produtos que possui cadastrado para realizar a exclusão.
- Pressionar botão de confirmação: Após selecionar o produto que deseja excluir, um botão de confirmar exclusão aparece na tela, o qual o usuário deverá pressionar.

Os tipos de dados a serem utilizados são:

- **Área de texto** - Campo texto de múltiplas linhas.
- **Caixa de texto** - Campo texto de uma linha.
- **Número** - Campo numérico.
- **Data e Hora** - campo do tipo data e hora. (dd-mm-aaaa, hh:mm:ss)
- **Imagem** - Campo para imagem.
- **Seleção única** - Campo com várias opções de valores que são mutuamente exclusivos. (tradicional radio button ou combobox)
- **Seleção múltipla** - Campo com várias opções que podem ser selecionadas mutuamente. (tradicional checkbox ou listbox)
- **Arquivo** - Campo de upload de documento.
- **Link** - Campo que armazena uma URL.

**Selecionar cadastro de produto**

| **Campo**       | **Tipo**      | **Restrições**    | **Valor default** |
| --------------- | ------------- | ----------------- | ----------------- |
| tipo do produto | seleção única | campo obrigatório | null              |

| **Comandos** | **Destino**                   | **Tipo** |
| ------------ | ----------------------------- | -------- |
| cadastrar    | ínicio do cadastro de produto | default  |

**Preencher informações do cadastro de hospedagem**

| **Campo**        | **Tipo**       | **Restrições**                    | **Valor default** |
| ---------------- | -------------- | --------------------------------- | ----------------- |
| titulo           | caixa de texto | mínimo 8 caracteres               |                   |
| descrição        | área de texto  | mínimo 50 e máximo 200 caracteres |                   |
| imagem           | imagem         | mínimo 1 imagem                   |                   |
| preço do aluguél | número         |                                   |                   |
| quartos          | número         |                                   |                   |
| banheiros        | número         |                                   |                   |
| área             | número         |                                   |                   |

| **Comandos** | **Destino**                        | **Tipo** |
| ------------ | ---------------------------------- | -------- |
| prosseguir   | prossegue para a próxima atividade | default  |
| cancelar     | retorna para a seleção de cadastro | default  |

**Preencher informações do cadastro de experiência**

| **Campo** | **Tipo**       | **Restrições**                    | **Valor default** |
| --------- | -------------- | --------------------------------- | ----------------- |
| titulo    | caixa de texto | mínimo 8 caracteres               |                   |
| descrição | área de texto  | mínimo 50 e máximo 200 caracteres |                   |
| imagem    | imagem         | mínimo 1 imagem                   |                   |
| preço     | número         |                                   |                   |

| **Comandos** | **Destino**                        | **Tipo** |
| ------------ | ---------------------------------- | -------- |
| prosseguir   | prossegue para a próxima atividade | default  |
| cancelar     | retorna para a seleção de cadastro | default  |

**Hospedagem cadastrada**

| **Campo**     | **Tipo**       | **Restrições** | **Valor default** |
| ------------- | -------------- | -------------- | ----------------- |
| agradecimento | caixa de texto |                |                   |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| prosseguir   | finaliza processo         | default  |
| editar       | editar produto cadastrado | default  |
| excluir      | exclui produto cadastrado | default  |

**Editar informações**

| **Campo**        | **Tipo**       | **Restrições**                    | **Valor default** |
| ---------------- | -------------- | --------------------------------- | ----------------- |
| titulo           | caixa de texto | mínimo 8 caracteres               |                   |
| descrição        | área de texto  | mínimo 50 e máximo 200 caracteres |                   |
| imagem           | imagem         | mínimo 1 imagem                   |                   |
| preço do aluguél | número         |                                   |                   |
| quartos          | número         |                                   |                   |
| banheiros        | número         |                                   |                   |
| área             | número         |                                   |                   |

| **Comandos** | **Destino**                        | **Tipo** |
| ------------ | ---------------------------------- | -------- |
| prosseguir   | prossegue para a próxima atividade | default  |
| cancelar     | retorna para a seleção de cadastro | default  |

**Produto editado**

| **Campo**     | **Tipo**       | **Restrições** | **Valor default** |
| ------------- | -------------- | -------------- | ----------------- |
| confirmação   | caixa de texto |                |                   |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| prosseguir   | finaliza processo         | default  |
| editar       | editar produto cadastrado | default  |
| excluir      | exclui produto cadastrado | default  |

**Selecionar produto que deseja excluir**

| **Campo**     | **Tipo**       | **Restrições** | **Valor default** |
| ------------- | -------------- | -------------- | ----------------- |
| produto       |seleção múltipla|                |                   |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| prosseguir   | finaliza processo         | default  |
| editar       | editar produto cadastrado | default  |
| excluir      | exclui produto cadastrado | default  |

**Produto excluído**

| **Campo**     | **Tipo**       | **Restrições** | **Valor default** |
| ------------- | -------------- | -------------- | ----------------- |
| confirmação   | caixa de texto |                |                   |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| prosseguir   | finaliza processo         | default  |
| editar       | editar produto cadastrado | default  |
| excluir      | exclui produto cadastrado | default  |
