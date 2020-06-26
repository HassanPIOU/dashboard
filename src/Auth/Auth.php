<?php


namespace Akuren\Auth;


use Akuren\PasswordHash\CryptChecker;
use Akuren\Session\Session;
use App\Http\Handlers\Url\Baseurl;
use App\Models\User;
use Zend\Diactoros\Request;

class Auth implements AuthInterface
{



    /**
     * @param array $username
     * @param array $password
     * @return mixed
     */
    public static function login (array $username, array $password)
    {
        $tableaux = [];
        $attribute = [];
        $attributes = [];
        $tableau = [];
        foreach ( $username as $k => $v){
            $tableaux[] = "$k";
            $attribute[] = $v;
        }

        foreach ( $password as $k => $v){
            $tableau[] = "$k";
            $attributes[] = $v;
        }

        $name = implode(' ' , $tableaux);
        $nameValue  = implode(' ' , $attribute);
        $passValue = implode(',', $attributes);

        $user = User::where([$name  =>  $nameValue])->first();
        if (CryptChecker::make($passValue) ===  $user->password){
            Session::logged($user->id);
            return true;
        }
        else{
            return false;
        }

    }

    /**
     * @return mixed
     */
    public static function user ()
    {
        $auth = (new Session())->get('auth');
        if (!is_null($auth)) {
            $user = User::join('user_profils', 'users.user_profil', '=', 'user_profils.profil_id')->where(['users.id'=>$auth->id])->first();
            return !is_null($user) ? $user : false;
        } else {
            return false;
        }
    }


    public static function checkAuth()
    {
        $session = new Session();
        $url = $_SERVER['REQUEST_URI'];
        if (empty($session->get('auth')) && $url != "/" ) {
            redirect('/');
        }
        return true;
    }
}