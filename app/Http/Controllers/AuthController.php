<?php

namespace App\Http\Controllers;

use AkConfig\config\Config;
use Akuren\PasswordHash\CryptChecker;
use Akuren\Session\Session;
use App\Http\Handlers\DatabaseHandler\DbHandlers;
use App\Http\Handlers\Paypal\Paypalpayment;
use App\Models\Customer;
use App\Models\Partenaire;
use App\Models\Projet;
use App\Models\Social;
use App\Models\User;
use App\Views\View;
use Psr\Http\Message\RequestInterface;


class AuthController extends  Controller
{

    public function index(RequestInterface $request)
    {
        $dbHandler = new DbHandlers();
        if ($dbHandler->check() == "exist"){
            if ($request->getMethod() == "POST"){
                $params = $this->getParams($request);
                $username = $params['username'];
                $password = $params['password'];

                $user = User::whereUsername($username)->first();
                if ($user && CryptChecker::check($password, $user->password)) {
                    if($user->status === 1) {
                        (new Session())->set('auth', $user);
                        echo "true";
                        die;
                    } else {
                        echo "Votre compte est bloqué, veuillez contacter un administrateur";
                        die;
                    }
                } else {
                    echo "Identifiant / mot de passe incorrect";
                    die;
                }

            }
            return  View::render('login');
        }else{
            $bdd = Config::DB_NAME;
            return View::render('install.index',compact('bdd'));
        }

   }


   public function dashboard(){

       $waiting = Projet::where(['status' => 1])->count();
       $onprocessing = Projet::where(['status' => 2])->count();
       $completed = Projet::where(['status' => 3])->count();
       $usercount = User::count();
       $partenairecount = Partenaire::count();

       $twitterfollowers = $this->getTwitterCount();
        $data = [
            "En attente" => $waiting,
            "En cours" => $onprocessing,
            "Terminer" => $completed,
        ];


        $customers = Customer::count();
        $projets = Projet::count();

       return  View::render('dashboard',compact('customers','projets',"data","waiting","onprocessing","completed","usercount","partenairecount",'twitterfollowers'));
   }


    public function logout()
    {
        (new Session())->delete('auth');
        (new Session())->set('info', 'Vous êtes déconnecter avec success');
        redirect('/');
    }



}