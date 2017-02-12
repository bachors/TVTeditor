<?php

header('Content-Type: application/json');
// header('Access-Control-Allow-Origin: http://your-domain.com');

// Include class tvteditor.php
include_once('lib/TVTeditor.php');

// nama folder yang akan di scan.
// $dir = 'dir1/dir2';
$dir = './';

$tvteditor =  new TVTeditor($dir);

// Scan direktori
if(isset($_POST['path'])){

	// Jalankan fungsi scan->('SUB DIR NAME')
	$res = $tvteditor->scan($_POST['path']);
	
	// Output list direktori & file dalam format JSON
	echo json_encode($res);
	
}

// Read file
else if(!empty($_POST['file'])){

	$res = $tvteditor->read($_POST['file']);
	
	// Output isi file
	echo json_encode($res);

}

// Update file
else if(!empty($_POST['update'])){

	$isi = (empty($_POST['isi']) ? '' : $_POST['isi']);
	$res = $tvteditor->update($_POST['update'], $isi);
	
	echo json_encode($res);

}