<?php


namespace App\Views\Extensions;


use App\Models\Team;
use Twig_Extension;

class SizeExtension extends Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('sizeof', [$this , 'sizeof'], ['is_safe' => ['html']])
        ];
    }


    public function sizeof( string $hash,string $value)
    {
      $sizeof = filesize("uploads/".$hash."/".$value);
        $sizes = "";
      if ($sizeof < 1000000){
          $size = $sizeof / 1000;
          $sizes = round($size, 2)." Kb";
      }

        if ($sizeof > 1000000){
            $size = $sizeof / 1000000;
            $sizes = round($size, 2)." Mb";
        }

      return $sizes;
    }

}