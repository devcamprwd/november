<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$file = file_get_contents('template.html');

if(preg_match('/Chrome[.0-9]*/', $_SERVER['HTTP_USER_AGENT'])) {
	$file = preg_replace('/\.jpg/', '.webp', $file);
}

echo $file;
?>
