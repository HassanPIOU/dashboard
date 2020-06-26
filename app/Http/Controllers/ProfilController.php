<?php

namespace App\Http\Controllers;


use App\Models\UserProfil;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class ProfilController extends Controller
{

    public function add()
    {
        return View::render('profil.add');
    }

    public function addprofil(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $name = $params['nomprofil'];
        $description = $params["descriptionprofil"];
        $option = $params['option'];

        $chat = 0;
        $apps = 0;
        $utils = 0;
        $admin = 0;

        foreach($option as $op){
            if ($op['option'] == 'chat'){
                $chat = 1;
            }
            if ($op['option'] == 'app'){
                $apps = 1;
            }
            if ($op['option'] == 'utils'){
                $utils = 1;
            }
            if ($op['option'] == 'admin'){
                $admin = 1;
            }
        }


        if ($description == ""){
            $data = [
                'designation' => $name,
                'chat' => $chat,
                'app' => $apps,
                'util' => $utils,
                'admin' => $admin
            ];
        }else{
            $data = [
                'designation' => $name,
                'description' => $description,
                'chat' => $chat,
                'app' => $apps,
                'util' => $utils,
                'admin' => $admin
            ];
        }

        if (UserProfil::create($data)){
            echo 'true';
        }else{
            echo 'false';
        }

        die;
    }

    public function liste()
    {
         $profils = UserProfil::all();
        return View::render('profil.liste',compact('profils'));
    }
}