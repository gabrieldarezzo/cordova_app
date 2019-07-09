<?php

require_once('FCMPushMessage.php');


define('KEY_SERVER', 'AAAA_nIyxT4:APA91bFUB9FdM1gOul3IHkKdQN2BQRnPTgIb3wun1O65jd_7L_M5W4DaCffTEe1_KLwYO2iT6BOHEpK_-ErKeQFbwtIY0_ZDvUcs-lRVY4iipNeRQSGenrOPDi-F7VbOMmTk8m41-n6x');
$fcmPushMessage = new FCMPushMessage(KEY_SERVER);

$registerDevice = 'fYB6SWgmQUM:APA91bHHCZYGFCTvQbjYzzGFHgzikh2OSB0HBeSS3TzT1taHQiwcJ-ZLo5THdWsmGDwJACMaPqZmDY5FIxlWp6gMlTKsv2G29e_va07ttxwh_PwslfOLjZQl6Kv5u7V0hKBSLOqqCeN3';

$fcmPushMessage->setDevices($registerDevice);

$response = $fcmPushMessage->send('Body Message', [
	 'title'	=> 'Subject'
	//,'image'	=> 'www/img/icon/icon4android.png' // (possivel mudar dinamicamente desde que na exista na pasta local do App)
]);

print $response;

