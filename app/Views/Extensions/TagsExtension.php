<?php


namespace App\Views\Extensions;


use App\Models\Tag;
use Twig_Extension;

class TagsExtension extends Twig_Extension
{
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('tagcheck', [$this , 'tagcheck'], ['is_safe' => ['html']])
        ];
    }


    public function tagcheck( string $value, string $user)
    {
      return Tag::where(['projet_id' => $value, 'team_id' => $user])->get();
    }


}