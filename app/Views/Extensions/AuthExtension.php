<?php


namespace App\Views\Extensions;




use Akuren\Session\Session;
use App\Models\User;

class AuthExtension extends  \Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('auth', [$this , 'auth'])
        ];
    }


    public function auth(string $type = 'auth')
    {
        $auth = (new Session())->get($type);
        if (!is_null($auth)) {
            $user = User::join('user_profils', 'users.user_profil', '=', 'user_profils.profil_id')->where(['users.id'=>$auth->id])->first();
            return !is_null($user) ? $user : false;
        } else {
            return false;
        }
    }

}