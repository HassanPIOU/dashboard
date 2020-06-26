<?php


namespace App\Views\Extensions;





use App\Models\Social;

class CountExtension extends  \Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('countMessage', [$this , 'countMessage'], ['is_safe' => ['html']])
        ];
    }


    public function countMessage()
    {
       return Social::count();
    }





}