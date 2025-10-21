FROM openjdk:17-jdk-slim
WORKDIR /app
COPY CRUDOperation-0.2-SNAPSHOT.jar app.jar
EXPOSE 8282
ENTRYPOINT ["java", "-jar", "app.jar"]