### 3.3.5 Processo 4 – Gestão de Compra de Produtos

As atividades nesse processo vão desde a pesquisa realizada pelo cliente à finalização da compra de um serviço.

![image](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2023-2-ti2-3740100-javali/blob/95626f482674b71f8a23ca56cd9927c1f9c6441b/docs/images/PROCESSO-DE-COMPRA.png)


#### Detalhamento das atividades

- Procurar produto desejado: Usuário busca pelo produto
- Adicionar produto ao carrinho: Usuário adiciona o produto no carrinho de compras
- Prosseguir para o pagamento: Usuário clica para prosseguir para o pagamento
- Aplicar cupom: Caso possua, o usuário utiliza cupom de desconto
- Gerar QR Code PIX: O sistema gera um QR code para pagamento
- Finalizar pagamento: O usuário efetua o pagamento


**Procurar produto desejado**

| **Campo** | **Tipo**       | **Restrições** | **Valor default** |
| --------- | -------------- | -------------- | ----------------- |
| Pesquisa  | Caixa de texto |                |                   |

| **Comandos**               | **Destino**                          | **Tipo** |
| -------------------------- | ------------------------------------ | -------- |
| Pesquisar serviço desejado | Valor da pesquisa enviado ao sistema |          |


**Adicionar produto ao carrinho**

| **Campo** | **Tipo**       | **Restrições** | **Valor default** |
| --------- | -------------- | -------------- | ----------------- |
| Botão     | Caixa de texto |                |                   |

| **Comandos**               | **Destino**                          | **Tipo** |
| -------------------------- | ------------------------------------ | -------- |
| Adicionar produto ao carrinho | Carrinho de compras |          |


**Prosseguir para o pagamento**

| **Campo**           | **Tipo**      | **Restrições** | **Valor default** |
| ------------------- | ------------- | -------------- | ----------------- |
| Produto selecionado | Seleção única |                |                   |

| **Comandos**         | **Destino**                    | **Tipo** |
| -------------------- | ------------------------------ | -------- |
| Prosseguir pagamento | Botão para página de pagamento |          |


**Aplicar cupom**

| **Campo** | **Tipo**       | **Restrições** | **Valor default** |
| --------- | -------------- | -------------- | ----------------- |
| Cupom  | Caixa de texto |                |                   |

| **Comandos**               | **Destino**                          | **Tipo** |
| -------------------------- | ------------------------------------ | -------- |
| Aplicar cupom | Valor do cupom enviado ao sistema |          |


**Gerar QR Code PIX**

| **Campo**           | **Tipo**      | **Restrições** | **Valor default** |
| ------------------- | ------------- | -------------- | ----------------- |
| QR Code PIX | Seleção única |                |                   |

| **Comandos**         | **Destino**                    | **Tipo** |
| -------------------- | ------------------------------ | -------- |
| Gerar QR Code PIX | Gerar QR Code |          |

