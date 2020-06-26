<?php


namespace App\Views\Extensions;




use App\Models\Compte;

class CompteExtension extends  \Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('compte', [$this , 'compte'])
        ];
    }


    public function compte($value)
    {
        $c = Compte::where(['id' => $value])->first();
        return $c;

    }

}