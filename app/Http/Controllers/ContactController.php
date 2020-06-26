<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 30/04/2020
 * Time: 19:38
 */

namespace App\Http\Controllers;


use App\Models\Customer;
use App\Models\Partenaire;
use App\Models\Social;
use App\Models\Structure;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class ContactController extends Controller
{

    public function customers()
    {
        $structures = Structure::all();
        $customers = Customer::join('structures', 'customers.structure', '=', 'structures.sid')->get();
        return View::render('contact.customers',compact("structures","customers"));
    }

    public  function customeradd(ServerRequestInterface $request){
                   $params = $this->getParams($request);
                    $structure = $params['structure'];
                    $denomination = $params['denomination'];
                    $email  = $params['email'];
                    $telephone = $params['telephone'];
                    $ville  =  $params['ville'];
                    $pays = $params['pays'];
                    $adresse = $params['adresse'];
                    $site = $params['site'];
                    $check = Customer::where(['denomination' => $denomination])->count();
                    if ($check > 0){
                        echo "exist";
                    }
                    else{
                        $data = [
                            'structure' => $structure,
                            'denomination' => $denomination,
                            'email'  => $email,
                            'telephone' => $telephone,
                            'city'  => $ville,
                            'country' => $pays,
                            'address' => $adresse,
                            'siteweb' => $site
                        ];

                        if (Customer::create($data)){
                            echo "true";
                        }else{
                            echo "false";
                        }
                    }
               die;
    }
    public  function Updatecustomer(ServerRequestInterface $request){
                   $params = $this->getParams($request);

                    $id = $params['id'];
                    $structure = $params['structure'];
                    $denomination = $params['denomination'];
                    $email  = $params['email'];
                    $telephone = $params['telephone'];
                    $ville  =  $params['ville'];
                    $pays = $params['pays'];
                    $adresse = $params['adresse'];
                    $site = $params['site'];
                        $data = [
                            'structure' => $structure,
                            'denomination' => $denomination,
                            'email'  => $email,
                            'telephone' => $telephone,
                            'city'  => $ville,
                            'country' => $pays,
                            'address' => $adresse,
                            'siteweb' => $site
                        ];

                        if (Customer::where(['id' => $id])->update($data)){
                            echo "true";
                        }
                        else{
                            echo "false";
                        }

               die;
    }
    public function deletecustomer(ServerRequestInterface $request)
    {
        $id = $request->getAttribute("id");
        if (Customer::where(['id' => $id])->delete()){
            echo "true";
            die;
        }else{
            echo "false";
            die;
        }

    }

    public function partenaires()
    {
        $structures = Structure::all();
        $partenaires = Partenaire::join('structures', 'partenaires.type_structure', '=', 'structures.sid')->get();
        return View::render('contact.partenaires',compact("partenaires","structures"));
    }

    public function actionpartenaire(ServerRequestInterface $request){
        $id = $request->getAttribute("id");
        $type = $request->getAttribute('type');
        if ($type == 3){
            if (Partenaire::where(['id_part' => $id])->delete()){
                echo 'true';
            }
            else{
                echo 'false';
            }
        }
        else{
            if (Partenaire::where(['id_part' => $id])->update(['otr' => $type])){
                echo 'true';
            }
            else{
                echo 'false';
            }

        }
        die;
    }

    public function reseauxSociaux()
    {
        $socials = Social::all();
        return View::render('social.index',compact("socials"));
    }

    public function delSocial(ServerRequestInterface $request)
    {
        $id = $request->getAttribute("id");
        if (Social::where(['id' => $id])->delete()){
            echo "true";
            die;
        }else{
            echo "false";
            die;
        }

    }

    public function addSocial(ServerRequestInterface $request)
    {

        $params = $this->getParams($request);

        $data = [
         'reseau' => $params['reseau'],
         'username' => $params['username'],
         'password' => $params['password'],
        ];

        if ($params['type'] == 1){
            if (Social::create($data)){
                echo "true";
            }else{
                echo "false";
            }
        }else{
            if (Social::where(['id' => $params['id']])->update($data)){
                echo "true2";
            }else{
                echo "false";
            }
        }


       die;
    }



    public  function addpartenaire(ServerRequestInterface $request){
        $params = $this->getParams($request);
        $structure = $params['structure'];
        $denomination = $params['denomination'];
        $email  = $params['email'];
        $titre = $params['titre'];
        $secteur  =  $params['secteur'];
        $check = Partenaire::where(['fullname' => $denomination])->count();
        if ($check > 0){
            echo "exist";
        }
        else{
            $data = [
                'type_structure' => $structure,
                'fullname' => $denomination,
                'email'  => $email,
                'titre' => $titre,
                'secteur'  => $secteur,
            ];

            if (Partenaire::create($data)){
                echo "true";
            }else{
                echo "false";
            }
        }
        die;
    }

}