<?php


use Akuren\Auth\Lockscreen;

require  __DIR__."/../vendor/autoload.php";

// Start Session @session_start()

$session = new \Akuren\Session\Session();

$locksreen = new Lockscreen();
$locksreen->lockoption();

$router = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $route){

    // Web Router File Loading
    require __DIR__ . "/../routes/web.php";

    // Rest Api Router File Loading
    require __DIR__ . "/../Api/route/api.php";
});


$session->set('SeeFox', "framework");



$harmony = new WoohooLabs\Harmony\Harmony(Zend\Diactoros\ServerRequestFactory::fromGlobals(), new Zend\Diactoros\Response());








