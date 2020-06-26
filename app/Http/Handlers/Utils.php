<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 13/05/2020
 * Time: 22:12
 */

namespace App\Http\Handlers;


class Utils
{

    public static function generateRandomInt($length = 10) {
        return substr(str_shuffle(str_repeat($x='0123456789', ceil($length/strlen($x)) )),1,$length);
    }

    public static function generateRandomString($length = 32) {
        return substr(str_shuffle(str_repeat($x='0123456789azertyuiopqsdfghjklmwxcvbn,AZERTYUIOPQSDFGHJKLMWXCVBN', ceil($length/strlen($x)) )),1,$length);
    }
}