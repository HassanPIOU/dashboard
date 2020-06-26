<?php


namespace App\Views\Extensions;





use App\Models\PackageItem;

class ItemExtension extends  \Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('items', [$this , 'items'], ['is_safe' => ['html']])
        ];
    }


    public function items($value)
    {
        return PackageItem::where(['package_id' => $value])->get();
    }

}