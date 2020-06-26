<?php


namespace App\Views\Extensions;




use App\Models\Devise;

class DeviseExtension extends  \Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('devise', [$this , 'devise'], ['is_safe' => ['html']])
        ];
    }


    public function devise($value)
    {
       $devise = Devise::where(['code' => $value])->first();
        return  $devise['name'];
    }

}