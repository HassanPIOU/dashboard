<?php


namespace App\Views\Extensions;




use App\Http\Handlers\Url\Baseurl;

class PercentExtension extends  \Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('percent', [$this , 'percent'], ['is_safe' => ['html']])
        ];
    }


    public function percent($start,$end)
    {



        $equals = (intval($end) - intval($start)) / 100;

        if(substr(strval($equals), 0, 1) == "-"){
          return "<small class='badge badge-danger badge-sm'><i class='bx bx-down-arrow-alt'></i>".abs($equals)."%</small>";
        }
        else if (intval($equals) == 0){
            return "<small class='badge badge-info badge-sm'>".abs($equals)."%</small>";
        }
        else{
            return "<small class='badge badge-success badge-sm'><i class='bx bx-up-arrow-alt'></i>".abs($equals)."%</small>";
        }
    }








}