<?php

namespace Api\Controller;


use App\Models\DeveloperToken;
use App\Models\User;
use Psr\Http\Message\ServerRequestInterface;

abstract class ResfulController
{

    public function __construct()
    {

    }

    protected function AuthChecker($clientID, $token){
         $checkUser = User::where(['clientID' => $clientID])->count();
          $checkToken = DeveloperToken::where(['token_key'  => $token])->count();
         if ($checkUser != 0 && $checkToken !=0){
            return [];
         }
         else if ($checkUser != 0 && $checkToken ==0){
             return [
                 'status' => 403,
                 'message' => 'Authentification failed check your Token key'
             ];
         }
         else if ($checkUser == 0 && $checkToken !=0){
             return [
                 'status' => 403,
                 'message' => 'Authentification failed check your ClientID key'
             ];
         }
         else if ($checkUser == 0 && $checkToken ==0){
             return [
                 'status' => 403,
                 'message' => 'Authentification failed'
             ];
         }
    }


    public function getParams(ServerRequestInterface $request) : array
    {
        $params = array_merge( $request->getParsedBody(), $request->getUploadedFiles());
        return $params;
    }
}