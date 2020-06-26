<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 27/04/2020
 * Time: 20:16
 */

namespace App\Http\Controllers;


use Akuren\Sms\SmsSend;
use App\Models\Customer;
use App\Models\User;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class SMSController extends Controller
{

    public function index()
    {
        return View::render("message.sms");
   }

    public function multiple(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $numero = $params['numero'];
        $header = $params['header'];
        $message= $params['message'];
        $sms = new SmsSend();


        $usercontact = User::all();

        if ($numero == "users"){
            $c = 0;
            foreach ($usercontact as $user){
                $sen =  $sms->sender($header)->receiver($user->telephone)->message($message)->send();
                if ($sen){
                    $c++;
                }
            }
            if ($c == count($usercontact)){
              echo 'true';
            }else{
                echo 'false';
            }
        }

        if ($numero == "customer"){
            $c = 0;
            $customer = Customer::all();
            foreach ($customer as $custom){
                $sen = $sms->sender($header)->receiver($custom->telephone)->message($message)->send();
              if ($sen){
                  $c++;
              }
            }
            if ($c == count($customer)){
                echo 'true';
            }
            else{
                echo 'false';
            }
        }

        if ($numero != "customer" && $numero != "users" ){
            $numberstoarray = explode(";",$numero);
            $c = 0;
            foreach ($numberstoarray as $number){
                $sen =  $sms->sender($header)->receiver($number)->message($message)->send();
                if ($sen){
                    $c++;
                }
            }
            if ($c == count($numberstoarray)){
                echo 'true';
            }
            else{
                echo 'false';
            }
        }

          die;
   }

    public function single(ServerRequestInterface $request){
        $params = $this->getParams($request);
        $numero = $params['numero'];
        $header = $params['header'];
        $message= $params['message'];
        $sms = new SmsSend();
        $sen =  $sms->sender($header)->receiver($numero)->message($message)->send();
        if ($sen){
            echo 'true';
        }
        else{
            echo 'false';
        }

        die;
    }
}