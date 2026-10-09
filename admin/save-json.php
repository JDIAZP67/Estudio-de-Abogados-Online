<?php
header('Content-Type: application/json; charset=utf-8');
if($_SERVER['REQUEST_METHOD']!=='POST'){http_response_code(405);exit(json_encode(['ok'=>false,'err'=>'Method']));}
$raw=file_get_contents('php://input');
$data=json_decode($raw,true);
if(!$data||!isset($data['path'])||!isset($data['content'])){http_response_code(400);exit(json_encode(['ok'=>false,'err'=>'Payload']));}
$path=$data['path'];
$content=$data['content'];
$base=realpath(__DIR__.'/..');
$target=realpath($base.'/'.$path);
if($target===false||strpos($target,$base)!==0){http_response_code(403);exit(json_encode(['ok'=>false,'err'=>'Path']));}
@mkdir(dirname($target),0777,true);
file_put_contents($target,$content);
exit(json_encode(['ok'=>true]));
