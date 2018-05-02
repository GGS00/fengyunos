<?php

$longurl = $_GET['longurl'];
$addrresult = file_get_contents("http://api.t.sina.com.cn/short_url/shorten.json?source=3213676317&url_long=$longurl");
$addrinfo = json_decode($addrresult, true);
//print_r($addrinfo);exit();
$resultaddr = $addrinfo[0]['url_short'];
echo $resultaddr;exit();