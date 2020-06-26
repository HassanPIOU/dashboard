<?php

namespace App\Views;


use Akuren\Session\FlashMessageService;
use Akuren\Session\Session;
use App\Views\Extensions\AssetExtension;
use App\Views\Extensions\AuthExtension;
use App\Views\Extensions\BusinessExtension;
use App\Views\Extensions\CompteExtension;
use App\Views\Extensions\CountExtension;
use App\Views\Extensions\DeviseExtension;
use App\Views\Extensions\FlashMessageExtension;
use App\Views\Extensions\FormExtension;
use App\Views\Extensions\ItemExtension;
use App\Views\Extensions\LanguageExtension;
use App\Views\Extensions\LocaleExtension;
use App\Views\Extensions\MarkdownExtension;
use App\Views\Extensions\PercentExtension;
use App\Views\Extensions\PhpFileExtension;
use App\Views\Extensions\RouteLinkExtension;
use App\Views\Extensions\SizeExtension;
use App\Views\Extensions\TagsExtension;
use App\Views\Extensions\TeamExtension;
use App\Views\Extensions\UserTeamExtension;
use Psr\Http\Message\ResponseInterface;
use Twig_Environment;
use Twig_Loader_Filesystem;
use Zend\Diactoros\Response;



class View
{
    protected $twig;


    /**
     * @param $view
     * @param array $data
     * @return ResponseInterface
     * @throws \Twig_Error_Loader
     * @throws \Twig_Error_Runtime
     * @throws \Twig_Error_Syntax
     */
    public  static function render($view, array $data = []) : ResponseInterface
    {
        $response = new Response();
        $view = implode('/', explode('.', $view)) . '.twig';
         $folders = [
             __DIR__.'/../../renders',
         ];
        $loader = new Twig_Loader_Filesystem($folders);
        $twig = new  Twig_Environment($loader, [
            'cache' =>  false //__DIR__.'/../../common/cache',
        ]);

        $twig->addExtension(new MarkdownExtension());

        $twig->addExtension(new FormExtension());

        $twig->addExtension(new AssetExtension());

        $flash = new FlashMessageService(new Session());

        $twig->addExtension(new FlashMessageExtension($flash));


        $twig->addExtension(new LocaleExtension());

        $twig->addExtension(new AuthExtension());

        $twig->addExtension(new TeamExtension());

        $twig->addExtension(new SizeExtension());

        $twig->addExtension(new TagsExtension());

        $twig->addExtension(new ItemExtension());

        $twig->addExtension(new DeviseExtension());

        $twig->addExtension(new UserTeamExtension());

        $twig->addExtension(new PHPfileExtension());

        $twig->addExtension(new PercentExtension());

        $twig->addExtension(new CompteExtension());

         $twig->addExtension(new CountExtension());

         $twig->addExtension(new BusinessExtension());


        $twig->addExtension(new RouteLinkExtension());

             $response->getBody()->write($twig->render($view, $data));
             return $response;
    }

    /**
     * @param array $data
     * @return ResponseInterface
     */
    public static function Json(array $data = []) : ResponseInterface
    {
        $response = new Response();
        $response->getBody()->write(json_encode($data));
        return $response->withStatus(200)
            ->withAddedHeader("Content-Type" , "application/json; charset=UTF-8")
            ->withAddedHeader("Access-Control-Allow-Methods","*")
            ->withAddedHeader("Access-Control-Max-Age", 3600)
            ->withAddedHeader("Access-Control-Allow-Origin","*")
            ->withAddedHeader("Access-Control-Allow-Headers", " Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    }


    public static function error() :ResponseInterface{
        $response = new Response();
        $response->getBody()->write(Config::NotFound());
        return $response->withStatus(404);
     }


}