<?php
/**
 * Created by PhpStorm.
 * User: Ce
 * Date: 24/04/2020
 * Time: 11:35
 */

namespace App\Http\Controllers;


use AkConfig\config\Config;
use Akuren\Auth\Auth;
use Akuren\Auth\Lockscreen;
use Akuren\File\UploadPicture\Picture;
use Akuren\Mail\Mail;
use Akuren\PasswordHash\CryptChecker;
use App\Models\Team;
use App\Models\User;
use App\Models\UserProfil;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class UserController extends Controller
{

    public function profil(){

        $projets =  Team::join('projets', 'teams.projet_id', '=', 'projets.id')
            ->where(['teams.user_id' => Auth::user()->id])->get();

        $completed = Team::join('projets', 'teams.projet_id', '=', 'projets.id')
            ->where(['teams.user_id' => Auth::user()->id,"status" => 3])->count();

        $encours = Team::join('projets', 'teams.projet_id', '=', 'projets.id')
            ->where(['teams.user_id' => Auth::user()->id,"status" => 2])->count();

        $total = Team::join('projets', 'teams.projet_id', '=', 'projets.id')
            ->where(['teams.user_id' => Auth::user()->id])->count();
        return View::render("account.profil",compact("projets","total","completed",'encours'));
    }

    public function updateprofil(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $file =  Picture::to()->path('uploads/users/')->formats(300, 300)->upload($params['file']);
        $update = User::where(['id' => Auth::user()['id']])->update(['avatar' => $file]);
        if ( $update){
            echo "true";
            die;
        }

    }

    public function lockscreen(ServerRequestInterface $request)
    {
        Lockscreen::lock();
        if ($request->getMethod() == 'POST'){
            $params = $this->getParams($request);
                $password = $params['password'];
                if (Lockscreen::checkpass($password)){
                    if (Lockscreen::unlockscreen()){
                        echo "true";
                        die;
                    }
                }else{
                    echo 'false';
                    die;
                }

         }

        return View::render('account.lockscreen');
    }

    public function unlocktosignin()
    {
        Lockscreen::unlock('/logout');
        return redirect('/logout');
    }


    public function viewUsers()
    {
        $profils = UserProfil::Where(['status' => 1])->get();
        $users = User::Where('id' , '!=', Auth::user()->id)->get();
        //$users = User::all();
       return View::render('users.liste',compact('users','profils'));
    }

    public function addUser(ServerRequestInterface $request){
        $params = $this->getParams($request);
        $chechuser = User::where(['firstname' => $params['firstname'], 'lastname' => $params['lastname']])->count();
        if ($chechuser == 0){
            $mailcheck = User::where(['email' => $params['email']])->count();
             if ($mailcheck == 0) {
                 $params['username'] = str_shuffle(implode('', explode(' ', $params['firstname'])));
                 $params['password'] = CryptChecker::make($params['username']);
                   Mail::send()
                     ->setMessage('user', $params)
                     ->setSubjet('Connexion '.Config::AppName)
                     ->setToMail($params['email'])
                     ->exec();

                     $data = [
                         'firstname' =>  $params['firstname'],
                         'lastname' =>  $params['lastname'],
                         'username' =>  $params['username'],
                         'password' =>  $params['password'],
                         'hash_key' =>  sha1($params['firstname']),
                         'email' =>  $params['email'],
                         'poste' =>  $params['poste'],
                         'telephone' =>  $params['telephone'],
                         'adresse' =>  $params['adresse'],
                         'user_profil' =>  $params['profil']
                     ];
                     if (User::create($data)){
                         echo "true";
                     }else{
                         echo "false";
                     }
             }
             else{
                 echo "mailexist";
             }
        }
        else{
          echo "exist";
        }
        die;

    }



    public function actionUser(ServerRequestInterface $request){
        $id = $request->getAttribute("id");
        $type = $request->getAttribute('type');
        if ($type == 3){
            if (User::where(['id' => $id])->delete()){
                echo 'true';
            }
            else{
                echo 'false';
            }
        }
        else{
            if (User::where(['id' => $id])->update(['status' => $type])){
                echo 'true';
            }
            else{
                echo 'false';
            }

        }
        die;
    }


    public function detailUser(ServerRequestInterface $request)
    {
        $hash = $request->getAttribute('hash');
        $user = User::join('user_profils', 'users.user_profil', '=', 'user_profils.profil_id')
        ->where(['users.hash_key' => $hash])->first();

         echo json_encode($user);

      die;
   }




}