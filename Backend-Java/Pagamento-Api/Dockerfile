# Use uma imagem base com o JDK e Maven instalados
FROM maven:3.8.4-openjdk-11-slim AS builder

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo pom.xml e baixe as dependências do Maven (isso será armazenado em cache pelo Docker)
COPY pom.xml .

# Baixe as dependências do Maven
RUN mvn dependency:go-offline -B

# Copie todo o código-fonte
COPY src ./src

# Compile o projeto com o Maven
RUN mvn package

# Segunda etapa: criar uma imagem mínima com apenas o artefato compilado
FROM openjdk:8-jdk-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o artefato compilado do estágio anterior
COPY --from=builder /app/target/*.jar ./app.jar

# Exponha a porta que o aplicativo irá usar (se necessário)
EXPOSE 8086

# Comando para executar o aplicativo quando o contêiner for iniciado
CMD ["java", "-jar", "app.jar"]