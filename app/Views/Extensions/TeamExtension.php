<?php


namespace App\Views\Extensions;


use App\Models\Team;
use Twig_Extension;

class TeamExtension extends Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('teamfilter', [$this , 'teamfilter'], ['is_safe' => ['html']])
        ];
    }


    public function teamfilter( string $value)
    {
      return Team::where(['projet_id' => $value])->get();
    }


}