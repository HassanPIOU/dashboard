<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 20/05/2020
 * Time: 10:03
 */

namespace App\Http\Middleware;


use AkConfig\config\Config;
use FastRoute\Dispatcher;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response;

class APINotFoundMiddleware implements MiddlewareInterface
{

    /**
     * APINotFoundMiddlewire constructor.
     * @param \FastRoute\Dispatcher $router
     */
    public function __construct($router)
    {
        $this->fastroute = $router;
    }

    /**
     * Process an incoming server request and return a response, optionally delegating
     * response creation to a handler.
     * @param ServerRequestInterface $request
     * @param RequestHandlerInterface $handler
     * @return ResponseInterface
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $dispatch = $this->fastroute->dispatch($request->getMethod(), $request->getUri()->getPath());

        if ($dispatch[0] === Dispatcher::NOT_FOUND) {
            $response = new Response();
            $response = $response->withStatus(404);
            $response->getBody()->write(Config::APINotFound());
            return $response;
        }

        return $handler->handle($request);
    }
}