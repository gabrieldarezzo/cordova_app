<?php

require_once('GCMPushMessage.php');


define('KEY_SERVER', 'AAAA_nIyxT4:APA91bFUB9FdM1gOul3IHkKdQN2BQRnPTgIb3wun1O65jd_7L_M5W4DaCffTEe1_KLwYO2iT6BOHEpK_-ErKeQFbwtIY0_ZDvUcs-lRVY4iipNeRQSGenrOPDi-F7VbOMmTk8m41-n6x');
$gcmPushMessage = new GCMPushMessage(KEY_SERVER);

$registerDevice = 'ev_5OhHnLsM:APA91bHHm4hHql590QhOhq2dNAMu69fZKdmfD4dWacM36mollYNjj1omXnRT9QlXV0yoVhVVObrvjI95s9_bAk8R9HeL3PfNtw_skJ_3IiIWspM6KxeeTTYJyz3sQN6qa9pqGHFx0TK0';

$gcmPushMessage->setDevices($registerDevice);

$response = $gcmPushMessage->send('Body Message', [
	 'title'	=> 'Subject'
	//,'image'	=> 'www/img/icon/icon4android.png' // (possivel mudar dinamicamente desde que na exista na pasta local do App)
]);

print_r($response);

