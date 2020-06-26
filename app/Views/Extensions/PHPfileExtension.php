<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 07/05/2020
 * Time: 08:58
 */

namespace App\Views\Extensions;


class PHPfileExtension extends \Twig_Extension
{


    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('phpfile', array($this, 'phpfile'))
        );
    }

    public function phpfile($file)
    {
        $path = dirname(dirname(dirname(__DIR__)))."/renders/php/".$file.".php";
        require htmlspecialchars_decode($path);
    }

}