<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 02/05/2020
 * Time: 12:12
 */

namespace Akuren\Auth;


use Akuren\PasswordHash\CryptChecker;
use Akuren\Session\Session;

class Lockscreen implements LockscreenInterface
{
    private $locksreen = "/ecran-de-verouillage";

    public function lockoption()
    {
        $server = $_SERVER['REQUEST_URI'];
            $session = new Session();
            $lock = $session->get('lockscreen');
            if ($lock == "true"){
               if ($server != $this->locksreen && $server != "/unlocktosignin"){
                  redirect($this->locksreen);
               }
            }
    }

    private function unlockoption():bool
    {
        $session = new Session();
            $session->set('lockscreen','false');
            return true;

    }

    public static function checkpass(string $password): bool
    {
        if (CryptChecker::check($password, Auth::user()->password)) {
          return true;
        } else {
           return false;
        }
    }

    public static function lock(): bool
    {
        $session = new Session();
        $server = $_SERVER['REQUEST_URI'];
        if ($server == (new Lockscreen())->locksreen){
           $session->set('lockscreen','true');
            return true;
        }
        return false;
    }

    public static function unlock(string  $link): bool
    {
        if ((new Lockscreen())->unlockoption()){
            redirect($link);
        }
        return false;
    }

    public static function unlockscreen(): bool
    {
        if ((new Lockscreen())->unlockoption()){
           return true;
        }
        return false;
    }

}