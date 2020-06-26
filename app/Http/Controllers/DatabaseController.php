<?php
/**
 * Created by PhpStorm.
 * User: Ce
 * Date: 23/04/2020
 * Time: 15:52
 */

namespace App\Http\Controllers;


use AkConfig\config\Config;
use Akuren\Mysql\Dumps;
use Akuren\Session\Session;
use App\Http\Handlers\Url\Baseurl;
use App\Models\Bdd;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class DatabaseController extends Controller
{

    public function index()
    {


        $bdd = Bdd::all();
        return View::render('utils.index',compact('bdd'));
    }


    public function dump()
    {
        $date = date('d-m-Y');
        $filename = "database".$date;
        $user =  $auth = (new Session())->get("auth");
        Dumps::data(Config::DB_NAME)->filename($filename)->dump();
        $data = [
            'fichier' => $filename,
            'hash_key' => sha1($filename),
            'user_fullname' => $user->lastname." ".$user->firstname,
        ];

        $database = Bdd::where(['fichier' => $filename])->count();

        if ($database > 0){
           echo  "false";
           die;
        }else{
            if (Bdd::create($data)){
                echo  "true";
                die;
            }else{
                echo  "false";
                die;
            }

        }
    }

    public function download(ServerRequestInterface $request)
    {
        $hash_key = $request->getAttribute("hash_key");


        $database = Bdd::where(['hash_key' => $hash_key])->first();

        $nbre = $database['nbre_download'] + 1;
        $fichier = $database['fichier'];
        $data = [
            'nbre_download' => $nbre
        ];

        if (Bdd::where(['hash_key' => $hash_key])->update($data)){
            echo "/dumps/".$fichier.'.sql';
            die;
        }else{
            echo "false";
            die;
        }

    }


    public function deletedatabase(ServerRequestInterface $request)
    {
        $hash_key = $request->getAttribute("hash_key");
        $database = Bdd::where(['hash_key' => $hash_key])->first();
        $fichier = $database['fichier'];
       $filetodel = $this->root()."/dumps/".$fichier.'.sql';
       if (unlink($filetodel)){
           Bdd::where(['hash_key' => $hash_key])->delete();
           echo "true";
           die;
       }else{
           echo "false";
           die;
       }

    }
    
}