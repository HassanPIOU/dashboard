<?php


namespace App\Views\Extensions;





use App\Models\Business;

class BusinessExtension extends  \Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('business', [$this , 'business'], ['is_safe' => ['html']])
        ];
    }


    public function business()
    {
        $business = Business::where(['id'=>1])->first();

        return $business;

    }

}