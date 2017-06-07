# WebApp Angular with PushNotification  


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


Tutorial muito bom:
http://macdonst.github.io/push-workshop/



----
Acesse:
https://console.firebase.google.com/  

[ Selecione o projeto ] 


Clique aqui:

![Scheme](readme_imgs/config.php)   

Seu Token vai estar aqui...
![Scheme](readme_imgs/get_token.png)     