AngularJs v1.5.6


Exemplo de persistencia de dados (Online/Offline)  + PushNotification no Cordova



npm install -g cordova  


cordova create MyApp  
cd MyApp  
cordova platform add android  
cordova run android --device  

//--device é o Android emulado xD  


Joga essa pasta na 'www'   
Descomenta a linha do index.html   


Pronto sucesso.  



-- PushNotification:
cordova plugin add phonegap-plugin-push



-- Liberar para a prod:
cordova build --release android --stacktrace