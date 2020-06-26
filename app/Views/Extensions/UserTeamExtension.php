<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 27/04/2020
 * Time: 12:05
 */

namespace App\Views\Extensions;


use App\Models\User;
use Twig_Extension;

class UserTeamExtension  extends Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('teamuser', [$this , 'teamuser'], ['is_safe' => ['html']])
        ];
    }

    public function teamuser( string $value)
    {
        return User::where(['id' => $value])->first();
    }
}