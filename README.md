# Sistema de Commercer de Ração para PET
 Sistema de e-commerce desenvolvido para comercialização de rações e produtos para pets, utilizando uma arquitetura baseada em microsserviços. O projeto foi desenvolvido com Java Spring Boot no backend, React no frontend e MySQL como banco de dados.

## Como Executar o Projeto

### Pré-requisitos

Certifique-se de que os seguintes softwares estejam instalados:

* Java JDK
* Node.js e npm
* MySQL
* IDE para Java (IntelliJ IDEA, Eclipse ou Spring Tool Suite)
* Visual Studio Code (ou outra IDE para React)

### Backend

1. Configure o banco de dados MySQL e atualize as credenciais no arquivo `application.properties` (ou `application.yml`) de cada microsserviço, se necessário.
2. Abra cada microsserviço em sua IDE Java.
3. Execute a classe principal do Spring Boot de cada serviço.
4. Verifique se todos os serviços estão em execução.

### Frontend

1. Abra a pasta do frontend no Visual Studio Code.
2. Execute os seguintes comandos no terminal:

```bash
npm install
npm start
```

O sistema será iniciado automaticamente no navegador.

## Endpoints da API

| Serviço    | Endpoint                                              |
| ---------- | ----------------------------------------------------- |
| Login      | `http://localhost:8084/projeto/api/v1/usuarios/login` |
| Usuários   | `http://localhost:8084/projeto/api/v1/usuarios`       |
| Produtos   | `http://localhost:8083/projeto/api/v1/produtos`       |
| Pedidos    | `http://localhost:8085/projeto/api/v1/pedidos`        |
| Pagamentos | `http://localhost:8086/projeto/api/v1/pagamentos`     |

## Arquitetura

![Diagrama de Entidade](https://github.com/user-attachments/assets/c4f73597-9ca1-4e9f-bde7-e70b87dc2716)


![Diagrama de Arquitetura](https://github.com/user-attachments/assets/ae4612c5-01ad-4718-9175-2017f28b37c5)
