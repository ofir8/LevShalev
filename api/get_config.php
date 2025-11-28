<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$configFile = '../data/site_config.json';

if (file_exists($configFile)) {
    echo file_get_contents($configFile);
} else {
    echo json_encode(['error' => 'Config file not found']);
}
?>
