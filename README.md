<h1 align="center" style="font-weight: bold;">Food Order Delivery Backend
 💻</h1>

<p align="center">
 <a href="#Tecnologias">Tecnologias</a> • 
 <a href="#started">Getting Started</a> • 
  <a href="#routes">Endpoints</a> •
</p>

<p align="center">
    <b><p>Aplicação de pedido de itens em um cardápio que integra diversas funcionalidades, contendo sistema de autenticação, onde apenas o usuário logado consegue realizar o pedido.</p> <p>Os clientes podem navegar por uma lista de items, selecionar os itens desejados e adicioná-los ao carrinho de compras de forma intuitiva. O sistema de carrinho permite ajustes de quantidade e remoção de itens antes do checkout.</p> <p>Para processar os pagamentos de maneira eficiente e segura, integrei o serviço Stripe, oferecendo várias opções de pagamento aos usuários, como cartões de crédito e outros métodos eletrônicos.</p></b>
</p>

<h2 id="Tecnologias">Tecnologias</h2>

- NestJS
- Typescript
- PostgreSQL
- JWT
- Bcrypt
- Multer
- TypeORM
- Stripe
- Swagger

<h2 id="started">🚀 Getting started</h2>

<h3>Pré Requisitos</h3>

Instale esses softwares necessários para execução do seu projeto.

- NodeJS
- Git
- VS Code  

<h3>Clonando o Projeto</h3>
 

```bash
git clone https://github.com/matheushenriquecsb/food-delivery-nestjs
 ```

<h3>Configue suas variáveis de ambiente (.env)</h2>

Use a `.env.example` como referência para criar seu arquivo de configuração `.env` com suas credenciais 

```yaml
JWT_SECRET={YOUR_JWT_SECRET}
STRIPE_SECRET_KEY={YOUR_STRIPE_SECRET} 
FRONTEND_URL={YOUR_FRONTEND_URL}
PORT={YOUR_PORT}

ORDER_DB_HOST={YOUR_DB_HOST}
ORDER_DB_PORT={YOUR_DB_PORT} 
ORDER_DB_USERNAME={YOUR_DB_USERNAME} 
ORDER_DB_PASSWORD={YOUR_DB_PASSWORD} 
ORDER_DB_DATABASE={YOUR_DB_DATABASE}
```

<h3>Rodando o projeto</h3>

```bash
cd food-delivery-nestjs

npm install

npm run start
```

<h3>Documentação</h3>

```bash
Swagger

http://localhost:3000/food-delivery-nestjs
``` 


<h2 id="routes">Endpoints</h2>

​
| rotas               | descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /users/login</kbd>     | login do usuário 
| <kbd>POST /users/register</kbd>     | cadastro do usuário na base de dados  
| <kbd>POST /food</kbd>     | criaçao de item do cardápio  
| <kbd>GET /food</kbd>     | lista todos os items do cardápios  
| <kbd>DELETE /food/:id</kbd>     | deleta um item do cardárpio baseado no id   
| <kbd>POST /cart/add</kbd>     | adiciona um item do cardápio no carrinho  
| <kbd>POST /order</kbd>     | criação do pedido 
| <kbd>POST /order/verify</kbd>     | verifica se o pedido foi realizado 
| <kbd>POST /order/my-orders</kbd>     | lista de pedidos do usuario

 
  
 <h3>Deploy</h3>

```bash
https://delivery-food-order.netlify.app/
``` 

