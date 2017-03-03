rd C:\wamp\www\cordova\inschool\www /s /q
mkdir C:\wamp\www\cordova\inschool\www


xcopy /s C:\wamp\www\inschool C:\wamp\www\cordova\inschool\www\
 


 
rd C:\wamp\www\cordova\inschool\www\api /s /q
del C:\wamp\www\cordova\inschool\www\.gitignore
del C:\wamp\www\cordova\inschool\www\build.bat /s /q
rd C:\wamp\www\cordova\inschool\www\_dump /s /q


cd C:\wamp\www\cordova\inschool
cordova run android --device

pause >nul