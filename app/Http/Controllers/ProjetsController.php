<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 25/04/2020
 * Time: 15:34
 */

namespace App\Http\Controllers;


use Akuren\File\UploadFiles\Files;
use Akuren\Session\Session;
use App\Models\Customer;
use App\Models\Projet;
use App\Models\ProjetFile;
use App\Models\Tag;
use App\Models\Team;
use App\Models\User;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class ProjetsController extends Controller
{
    public function add()
    {
        $hash = sha1(time());
       return View::render('projet.add',compact('hash'));
    }
    public function addfiles(ServerRequestInterface $request)
    {
            $params = $this->getParams($request);
            $attach = $params['file'];
            $hash = $params['hash'];
            $data = [];
            $file = Files::to()->path("uploads/".$hash)->upload($attach);
            if (!empty($params['projet_id'])){
                $data = [
                    'hash_key' => $hash,
                    'name'=> $file,
                    'projet_id'=> $params['projet_id']
                ];
                ProjetFile::create($data);
                redirect('/projet-detail-'.$hash);
            }else{
                $data = [
                    'hash_key' => $hash,
                    'name'=> $file
                ];
                ProjetFile::create($data);
                die;
            }


    }
    public function addprojet(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $name = $params['name'];
        $budget = $params['budget'];
        $description = $params['description'];
        $start = $params['start'];
        $end = $params['end'];
        $haskey= $params['haskey'];

        $data = [
                  "name" => $name,
                  "budget" => $budget,
                 "description" =>  $description,
                 "start"  => $start,
                 "end"  => $end,
                 "hash_key" => $haskey
        ];
        $projet = Projet::create($data);
        if($projet){
           if (ProjetFile::where(['hash_key' => $haskey])->update(['projet_id' => $projet->id])){
               echo "true";
               die;
           }else{
               echo "false";
               die;
           }
        }

   }
    public function liste()
    {
        $projets = Projet::all();
        $teams = Team::all();
        $users = User::all();
        return View::render('projet.liste',compact('projets','teams','users'));
    }
    public function detailprojet(ServerRequestInterface $request)
    {
        $hash = $request->getAttribute('hash');
        $projet =  Projet::where(['projets.hash_key' => $hash])->first();
        $teams = Team::join('users', 'teams.user_id', '=', 'users.id')
        ->where(['projet_id' => $projet['id']])->get();

        $customers = Customer::where(['status' => 1])->get();

        $users = User::all();

        $customer = Customer::join('structures', 'customers.structure', '=', 'structures.sid')
            ->where(['customers.id' => $projet['customer']])->first();

        $files = ProjetFile::where(['hash_key' => $hash])->get();


        return View::render('projet.detail',compact("projet","files","teams","users","customers","customer"));
    }
    public function addteam(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $projet_id =$params['projet_id'];
        $team = $params['team'];
        $error = false;
         foreach ($team as $user):
           $data = [
               'projet_id' => $projet_id,
               'user_id' => $user['user_id']
           ];

         $check = Team::where($data)->count();

         if ($check == 0){
             if (Team::create($data)){
                 $error = false;
             }
             else{
                 $error = true;
             }
         }
         endforeach;

           if (!$error){
              echo "true";
           }else{
               echo "false";
           }
         die;

    }
    public function addtask(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $projet_id =$params['projet_id'];
        $user_id = $params['user_id'];
        $modaltask = $params['modaltask'];
        $data = [
            'projet_id' => $projet_id,
            'team_id' => $user_id,
            'task' => $modaltask,
        ];
        if (Tag::create($data)){
            echo 'true';
        }else{
            echo "false";
        }
   die;
    }
    public function deleteprojetteamtask(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $task = $request->getAttribute('task');
        if (Tag::where(['team_id' => $id, 'task' => $task ])->delete()){
            echo "true";
        }else{
            echo "false";
        }
        die;
    }
    public function detailfileadd(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $attach = $params['fichier'];
        $hash = $params['hash_key'];
        $projet_id= $params['projet_id'];
        $file = Files::to()->path("uploads/".$hash)->upload($attach);
        $data = [
            'hash_key' => $hash,
            'name'=> $file,
            'projet_id'=> $projet_id
        ];
        ProjetFile::create($data);
         echo "true";
        die;
    }
    public function customeradd(ServerRequestInterface $request){
        $params = $this->getParams($request);
        $projet_id = $params['projet_id'];
        $customer = $params['customer'];
        $data = [
            'customer' => $customer
        ];

        if (Projet::where(['id' => $projet_id])->update($data)){
            echo 'true';
        }else{
            echo 'false';
        }
        die;
    }
    public function projetstart(ServerRequestInterface $request)
    {
        $id  = $request->getAttribute('id');
        $action  = $request->getAttribute('action');
        if (Projet::where(['id' => $id])->update(["status" => $action])){
            echo 'true';
        }else{
            echo 'false';
        }
        die;
    }

    public function deleteprojet(ServerRequestInterface $request)
    {
        $id = $request->getAttribute("id");
        if (Projet::where(['id' => $id])->delete()){
            echo "true";
            die;
        }else{
            echo "false";
            die;
        }

    }

}