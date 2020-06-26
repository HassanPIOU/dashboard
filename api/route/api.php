<?php

use Api\Controller\v1\ApiController;

$route->addGroup('/api/v1/', function ($route) {
    $route->addRoute('GET', 'users', [ApiController::class, 'index']);
    $route->addRoute('GET', '{clientID}/{access-token}/portfolio/index', [\Api\Controller\v1\portfolio\PorfolioAPIController::class, 'index']);
    $route->addRoute('POST', '{clientID}/{access-token}/contact/add', [\Api\Controller\v1\portfolio\PorfolioAPIController::class, 'addContact']);
});


