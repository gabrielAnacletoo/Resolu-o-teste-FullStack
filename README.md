# 🚀 Resolução de Teste Full Stack
 ### Bem vindo(a)!
 
Resumo do Projeto
Este projeto consiste no desenvolvimento de uma aplicação web onde é possível cadastrar clientes com suas coordenadas geográficas (latitude e longitude) e, em seguida, calcular a menor rota possível entre esses clientes, retornando ao ponto inicial.


### Solução Utilizada

Para resolver esse desafio, recorri a duas principais soluções encontradas online:
### Fórmula de Haversine: 
Encontrei essa fórmula no Stack Overflow em C#, e a adaptei para JavaScript. A fórmula de Haversine é utilizada para calcular a distância entre dois pontos geográficos em uma esfera, como a Terra, considerando suas coordenadas de latitude e longitude.

### Algoritmo do Vizinho Mais Próximo (Nearest Neighbor): 
Este algoritmo é uma heurística simples e eficaz para encontrar uma solução aproximada para o problema do caixeiro-viajante. Ele me permitiu determinar a ordem dos clientes na rota, escolhendo iterativamente o cliente mais próximo do ponto atual.


Para resolver esse desafio, utilizei as seguintes tecnologias:

- **Node.js**: Plataforma de execução de JavaScript utilizada para desenvolver o backend da aplicação.
- **NestJS**: Um framework para construir aplicativos da Web eficientes e escaláveis em Node.js.
- **PostgreSQL**: Banco de dados relacional usado para armazenar informações dos clientes e calcular rotas.
- **Class Validator e Class Transformer**: Utilizados para validar e transformar os DTOs (Data Transfer Objects) utilizados na comunicação entre o frontend e o backend.
- **Styled Components**: Biblioteca para estilizar componentes React com CSS em JavaScript.
- **Bootstrap**: Framework front-end para desenvolvimento ágil de interfaces responsivas e mobile-first.
- **Axios**: Cliente HTTP baseado em Promise para o navegador e Node.js. Foi utilizado para fazer requisições AJAX no frontend.
- **Beekeeper Studio**: Utilizado como ferramenta de interface gráfica para facilitar a consulta e gerenciamento do banco de dados PostgreSQL.


## 💻 Instalação

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.
```bash
# Clone esse repositório
- $ git clone https://github.com/gabrielAnacletoo/Resolu-o-teste-FullStack

# Vá para o repositório Back-end
- $ cd Resolu-o-teste-FullStack

# Instale as dependencias
- $ npm install

# Rode a aplicação
- $ npm run start:dev
```
## 👨‍💻 Entidades utilizadas no projeto
```bash
- # Clients
- $ Responsavel pelo cadastros dos clientes.

```


## 🛣️ Rotas da API

### 🔵 GET /routes
- **Descrição**: Retorna a menor rota calculada entre todos os clentes.

### 🔵 GET /clients
- **Descrição**: Retorna todos os clientes, porém com paginação, Também é possivel pesquisar utiliando filtros como (name, email, phone), além de paginar o resultando enviando page, e limit, onde pagina é a pagina que quer receber e limite o total de registro por pagina. Por padrão eu defini como page 1 e limit 10. isso por ser ajustado como quiser na requisição. 

- **Exemplo**:
/clients?name=cross%20fit**
- **Retorno**:
```javascript
{
id: 13,
name: "Cross fit Iron Fox",
email: "crossfit@example.com",
phone: "123456789",
latitude: "-22.33114798",
longitude: "-49.04693552",
createdat: "2024-03-07T14:39:57.229Z",
updatedat: "2024-03-07T14:39:57.229Z",
deletedat: null
}
```
ou 

- **Exemplo**:
clients?phone=14991302799

- **Retorno**:
```javascript
{
id: 17,
name: "zoo",
email: "zoo@example.com",
phone: "14991302799",
latitude: "-22.34065002",
longitude: "49.01996372",
createdat: "2024-03-07T17:02:32.468Z",
updatedat: "2024-03-07T17:02:32.468Z",
deletedat: null
}
```

- **Exemplo de paginação**:
clients?page=1&limit=12

```
Retorna a pagina 1 com 12 registros.
```


### 🟢 POST /clients
- **Descrição**: Cria um novo cliente no banco de dados, se já existe um email cadastrado um erro vai ser retornado.
- **Corpo da Requisição**:
```javascript
{
name: "Cross fit Iron Fox",
email: "crossfit@example.com",
phone: "123456789",
latitude: -22.33114798042712,
longitude: -49.04693551889008
}
```

- **Exemplo de erro**: 

```javascript
{
message: "There is already a client with this email.",
error: "Bad Request",
statusCode: 400
}
```



### Detalhes Adicionais
- **Autores da API:** [Gabriel Anacleto](https://www.linkedin.com/in/gabriel-anacletoo/)  
- **Contato:** gabrielanacleto159@live.com
