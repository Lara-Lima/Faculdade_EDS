### 3.3.6 Processo 3 – Gestão de desconto

Atividades referêntes à disponibilização de cupons de desconto.

![diagram (1)](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2023-2-ti2-3740100-javali/assets/77630435/7074b486-edd3-46fb-b919-423b07a4d3f6)

#### Detalhamento das atividades

- Acessa opção de cadastro de cupom: direciona para a tela de cadastro de cupom;
- Preencher dados: preencher dados do cadastro;
- Especificar validade do cupom: especificar para quais produtos o cupom é válido;
- Salvar cupom: sistema salva cupom no banco de dados;
- Disponibilizar cupom: o sistema disponibiliza o cupom para uso;
- Receber sugestão: o cliente recebe a sugestão de cupom;
- Confirmar inativação do cupom: o usuário confirma que quer inativar o cupom;
- Desativar o cupom: o cupom é inativado;

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

**Acessar opção de cadastro de cupom**

| **Campo**        | **Tipo**         | **Restrições** | **Valor default** |
| ---------        | ---------------- | -------------- | ----------------- |
| Área de texto    | Área de texto    |                |                   |

| **Comandos** | **Destino**          | **Tipo** |
| ------------ | -------------------- | -------- |
| Prosseguir   | Continua             | default  |


**Preencher dados**

| **Campo**        | **Tipo**         | **Restrições** | **Valor default** |
| ---------        | ---------------- | -------------- | ----------------- |
| Área de texto    | Área de texto    |                |                   |
| Múltipla escolha | Múltipla escolha |                |                   |

| **Comandos** | **Destino**          | **Tipo** |
| ------------ | -------------------- | -------- |
| Salvar       | Salva                | default  |

**Especificar validade do cupom**

| **Campo**        | **Tipo**         | **Restrições** | **Valor default** |
| ---------        | ---------------- | -------------- | ----------------- |
| Múltipla escolha | Múltipla escolha |                |                   |

| **Comandos** | **Destino**          | **Tipo** |
| ------------ | -------------------- | -------- |
| Salvar       | Salva                | default  |

**Receber sugestão**

| **Comandos** | **Destino**          | **Tipo** |
| ------------ | -------------------- | -------- |
| Aceitar      | Prosseguir           | default  |

**Confirmar inativação do cupom**

| **Comandos** | **Destino**          | **Tipo** |
| ------------ | -------------------- | -------- |
| Confirmar    | Prosseguir           | default  |
