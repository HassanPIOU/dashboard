<?php


namespace App\Http\Middleware;

use AkConfig\config\Config;
use FastRoute\Dispatcher;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;


class NotFoundMiddleware  implements MiddlewareInterface
{


    /**
     * @var Dispatcher
     */
    private $fastroute;

    public function __construct (Dispatcher $fastroute)
    {

        $this->fastroute = $fastroute;
    }


    public function process (ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
       $dispatch = $this->fastroute->dispatch($request->getMethod(), $request->getUri()->getPath());


        if ($dispatch[0] === Dispatcher::NOT_FOUND) {
              return Config::NotFound();
        }

       return $handler->handle($request);


    }
}