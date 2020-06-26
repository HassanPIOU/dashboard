<?php

namespace App\Http\Controllers;


use Akuren\File\UploadFiles\Files;
use Akuren\File\UploadPicture\Picture;
use App\Http\Handlers\DatabaseHandler\DbHandlers;
use App\Models\Apicheck;
use App\Models\Business;
use App\Models\Devise;
use App\Models\Paymethod;
use App\Models\Paymodalite;
use App\Views\View;
use Illuminate\Support\Facades\Bus;
use Psr\Http\Message\ServerRequestInterface;

class ParamsController extends Controller
{

    public function index()
    {
        $modalities = Paymodalite::all();
        $methods = Paymethod::all();
        $apis = Apicheck::all();
        $devises = Devise::all();
        return View::render("parametre.index",compact('methods',"modalities","apis","devises"));
    }

    public function addmethod(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $name = $params['name'];
        $cover = Picture::to()->path("uploads/methods/")->upload($params['cover']);
         $data = [
           'name' => $name,
           'cover' => $cover
         ];

         if (Paymethod::create($data)){
             echo "true";
         }else{
             echo "false";
         }

         die;
    }



    public function updateapi(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $number = $request->getAttribute('number');
          $data = [
              'status' => $number
          ];
        if (Apicheck::where(['id'=>$id])->update($data)){
            if ($number == 1){
                echo 'actif';
            }else{
                echo 'inactif';
            }

        }else{
            echo 'false';
        }
 die;
    }


    public function addDevise(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $devise = $params['devise'];
        $code = $params['code'];
        $data = [
            'name' => $devise,
            'code' => $code
        ];

        if (Devise::create($data)){
            echo "true";
        }else{
            echo "false";
        }

        die;
    }

    public function addApi(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $name= $params['name'];
        $data = [
            'name' => $name,
            'code' => strtolower($name)
        ];

        if (Apicheck::create($data)){
            echo "true";
        }else{
            echo "false";
        }

        die;
    }



    public function actionmethod(ServerRequestInterface $request){
        $id = $request->getAttribute("id");
        $type = $request->getAttribute('type');
        if ($type == 3){

             $check =  Paymethod::where(['id_method' => $id])->first();
            if (Paymethod::where(['id_method' => $id])->delete()){
                Picture::to()->path('uploads/methods')->delete($check['cover']);
                echo 'true';
            }
            else{
                echo 'false';
            }
        }
        else{
            if (Paymethod::where(['id_method' => $id])->update(['status' => $type])){
                echo 'true';
            }
            else{
                echo 'false';
            }

        }
        die;
    }


    public function actiondevise(ServerRequestInterface $request){
        $id = $request->getAttribute("id");
        $type = $request->getAttribute('type');
        if ($type == 3){
            if (Devise::where(['id' => $id])->delete()){
                echo 'true';
            }
            else{
                echo 'false';
            }
        }
        else{
            if (Devise::where(['id' => $id])->update(['status' => $type])){
                echo 'true';
            }
            else{
                echo 'false';
            }

        }
        die;
    }

    public function actionmodality(ServerRequestInterface $request){
        $id = $request->getAttribute("id");

        $type = $request->getAttribute('type');

            if (Paymodalite::where(['modal_id' => $id])->update(['status' => $type])){
                echo 'true';
            }
            else{
                echo 'false';
            }

        die;
    }


    public function addlogo(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $attach = $params['file'];

        $file = Picture::to()->path("uploads/logo")->upload($attach);

        $check = Business::where(['logo' => $file ])->first();

        if ($check['logo'] != NULL){
            Picture::to()->path('uploads/logo')->delete($check['logo']);

        }

        $data = [
            'logo'=> $file
        ];
        Business::where(['id' => 1 ])->update($data);
        die;


    }

    public function addInfo(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $count = Business::where(['id' => 1])->count();

        if ($count > 0){
            $data = [
                'name' => $params['name'],
                'email' => $params['email'],
                'adresse' => $params['adresse'],
                'telephone' => $params['telephone'],
                'description' => $params['description'],
            ];
            if (Business::where(['id' => 1])->update($data)){
                echo "true";
            }else{
                echo "false";
            }
        }

        die;
    }


    public function addInfoTerms(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $count = Business::where(['id' => 1])->count();

        if ($count > 0){
            $data = [
                'terme' => $params['terms'],
            ];
            if (Business::where(['id' => 1])->update($data)){
                echo "true";
            }else{
                echo "false";
            }
        }

        die;
    }


}