<?php


namespace App\Http\Controllers;


use AkConfig\App;
use AkConfig\config\Config;
use Akuren\Auth\Auth;
use Akuren\Cookies\Cookie;
use App\Http\Handlers\Twitter\TwitterAPIExchange;
use App\Models\Social;
use Gregwar\Cache\Cache;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Component\Cache\Adapter\Psr16Adapter;


abstract class Controller
{

    public function __construct()
    {
         Auth::checkAuth();
    }

    /**
     * @param ServerRequestInterface $request
     * @return array
     */
    public function getParams(ServerRequestInterface $request) : array
    {
        $params = array_merge( $request->getParsedBody(), $request->getUploadedFiles());
        return $params;
    }


    public function root()
    {
        return $_SERVER['DOCUMENT_ROOT'];
    }

    public function getTwitterCount(){
        $settings = array(
            'oauth_access_token' => Config::Twitter__token,
            'oauth_access_token_secret' => Config::Twitter__token_secret,
            'consumer_key' => Config::consumer_token,
            'consumer_secret' =>  Config::consumer_token_secret
        );

        $ta_url = 'https://api.twitter.com/1.1/followers/ids.json';
        $getfield = '?screen_name=ImperialTechno3';
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $follow_count=$twitter->setGetfield($getfield)
            ->buildOauth($ta_url, $requestMethod)
            ->performRequest();
        $data = json_decode($follow_count);
        $toreturn = count($data->ids);

       return $toreturn;
    }




}