<?php

namespace App\Http\Controllers;


use Akuren\Auth\Auth;
use App\Http\Handlers\Utils;
use App\Models\Apicheck;
use App\Models\DeveloperToken;
use App\Models\Paramconfig;
use App\Models\User;
use App\Views\View;
use Firebase\JWT\JWT;
use Psr\Http\Message\ServerRequestInterface;

class DevController extends Controller
{
    public function token()
    {
        $apis = Apicheck::where(['status' => 1])->get();
        $tokens = DeveloperToken::join('apichecks', 'developer_tokens.api_id', '=', 'apichecks.id')->where(['developer_tokens.user_id' => Auth::user()->id])->get();
        return View::render('developer.token',compact('tokens','apis'));
   }
    public function tokencreate(ServerRequestInterface $request)
    {

         $l = Paramconfig::where(['config_id' => 1])->first();

         $limit = $l->token_limit;
         $tokencount = DeveloperToken::where(['user_id' => Auth::user()->id])->count();
         if ($limit > $tokencount){
             $params = $this->getParams($request);
             $key = $params['name'] ;
             $app = $params['app'] ;

             $jeton =  Utils::generateRandomString(32);

             $checkapp = DeveloperToken::where(['user_id' => Auth::user()->id,"api_id" => $app])->count();
             $checkname = DeveloperToken::where(['user_id' => Auth::user()->id,"name_token" => $key])->count();
            if ($checkapp  > 0){
              echo 'existnapp';
            }else if ($checkname > 0){
                echo 'existname';
            }else{
                $data = [
                    "name_token" => $key,
                    "token_key" => $jeton,
                    "api_id" => $app,
                    "user_id" => Auth::user()->id,
                ];
                $dev = DeveloperToken::create($data);
                if ($dev){
                    echo $jeton;
                }
                else{
                    echo "false";
                }
            }
         }
         else{
             echo "limit";
         }
        die;
    }

    public function clientID(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $hash_key = $params['hash_key'] ;

        $clientID = Utils::generateRandomInt(32);
         $check  = User::where(['clientID' => $clientID])->count();
         if ($check > 0){
             $clientID = Utils::generateRandomInt(32);
             $user = User::where(['hash_key' => $hash_key])
                 ->update(['clientID' =>$clientID]);
         }else{
             $user = User::where(['hash_key' => $hash_key])
                 ->update(['clientID' =>$clientID ]);
         }

         if ($user){
             echo $clientID;
         }else{
             echo "false";
         }
         die;
    }

















}