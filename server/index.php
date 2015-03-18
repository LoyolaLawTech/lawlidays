<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$json = passthru('python lawlidays.py -s ' . escapeshellarg($_POST['state']) . ' -y ' . escapeshellarg($_POST['year']));
if (strpos($json, 'Error:')){
    echo json_encode(array('error' => true, 'message' => $json));
} else {
    echo $json;
}
