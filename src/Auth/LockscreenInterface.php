<?php

namespace Akuren\Auth;


interface LockscreenInterface
{

    public static function lock();

    public static function unlock(string $url):bool;

    public static function checkpass(string $password):bool;

}