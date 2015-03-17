<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
$json = passthru('python legal-holidays.py -s ' . escapeshellarg($_POST['state']) . ' -y ' . escapeshellarg($_POST['year']));
echo $json;
