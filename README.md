# demo

server:
    Java 8, maven

    run server with: mvnw spring-boot:run

client:
    cordova 9.0.0, cordova-android 8.0.0

    configure server address to: client/www/js/config.js
    install node packages: npm install
    run client with: cordova run android/cordova run android --device
