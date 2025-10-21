FROM openjdk:17-jdk-slim
WORKDIR /app
COPY AutoTrack-2.1.0.jar app.jar
EXPOSE 8585
ENTRYPOINT ["java", "-jar", "app.jar"]