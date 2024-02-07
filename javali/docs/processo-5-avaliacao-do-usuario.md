### 3.3.6 Processo 5 – Avaliação do Usuário

Atividades referêntes à análise de preferências e personalização da interface do usuário.

![diagram_avaliacao](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2023-2-ti2-3740100-javali/blob/8b079f6dde01bd51151c9f9ad82db61096402adb/docs/images/PROCESSO-AVALIACAO.png)

#### Detalhamento das atividades

- Enviar formulário de avaliação:  o sistema abre o menu de avaliação;
- Preencher avaliação: O usuário preenche a avaliação;
- Solicitar feedback: O sistema solicita ao usuário o feedback;
- Preencher feedback: O usuário preenche o feedback;
- Confirmar realização do feedback: O sistema confirma o feedback;
- Confirmar realização da avaliação: O sistema confirma a avaliação.

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

**Enviar formulário de avaliação**

| **Campo** | **Tipo** | **Restrições**    | **Valor default** |
| --------- | -------- | ----------------- | ----------------- |
| nota      | número   | campo obrigatório | null              |

| **Comandos** | **Destino**              | **Tipo** |
| ------------ | ------------------------ | -------- |
| avaliar      | registra o valor da nota | default  |

**Preencher avaliação**

| **Campo** | **Tipo** | **Restrições**    | **Valor default** |
| --------- | -------- | ----------------- | ----------------- |
| nota      | número   | campo obrigatório | null              |

| **Comandos** | **Destino**              | **Tipo** |
| ------------ | ------------------------ | -------- |
| avaliar      | registra o valor da nota | default  |

**Solicitar feedback**

| **Campo** | **Tipo**       | **Restrições** | **Valor default** |
| --------- | -------------- | -------------- | ----------------- |
| feedback  | caixa de texto |                | null              |

| **Comandos**    | **Destino**              | **Tipo** |
| --------------- | ------------------------ | -------- |
| enviar feedback | registra o valor da nota | default  |

**Preencher feedback**

| **Campo** | **Tipo** | **Restrições**    | **Valor default** |
| --------- | -------- | ----------------- | ----------------- |
| nota      | número   | campo obrigatório | null              |

| **Comandos** | **Destino**              | **Tipo** |
| ------------ | ------------------------ | -------- |
| avaliar      | registra o valor da nota | default  |

**Confirmar realização do feedback**

| **Campo**              | **Tipo**       | **Restrições** | **Valor default** |
| ---------------------- | -------------- | -------------- | ----------------- |
| texto de agradecimento | caixa de texto |                |                   |

| **Comandos** | **Destino**        | **Tipo** |
| ------------ | ------------------ | -------- |
| fechar       | encerra o processo | default  |

**Confirmar realização do feedback**

| **Campo**              | **Tipo**       | **Restrições** | **Valor default** |
| ---------------------- | -------------- | -------------- | ----------------- |
| texto de agradecimento | caixa de texto |                |                   |

| **Comandos** | **Destino**        | **Tipo** |
| ------------ | ------------------ | -------- |
| fechar       | encerra o processo | default  |
