<?php
$to = "mikhailivanko@gmail.com";
$subject = "Заказ с сайта Floraday";

$name = $_POST['name'];
$telephone = $_POST['telephone'];
$weight = $_POST['weight'];
$count = $_POST['count'];

$message = '
<html>
<head>
<title>HTML email</title>
</head>
<body>
<p>Имя: '.$name.'</p>
<p>Телефон: '.$telephone.'</p>
<p>'.$weight.'</p>
<p>Кол-во: '.$count.'</p>
</body>
</html>
';

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: <noreplay@floraday.ru>' . "\r\n";

mail($to,$subject,$message,$headers);

echo json_encode(array('response'=>'true'));
?>