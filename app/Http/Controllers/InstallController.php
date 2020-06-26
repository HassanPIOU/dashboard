<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 15/06/2020
 * Time: 19:45
 */

namespace App\Http\Controllers;


use App\Http\Handlers\DatabaseHandler\DbHandlers;

class InstallController
{

    public function CreateDatabase()
    {
        $db  = new DbHandlers();
        if ($db->create()){
            echo 'true';
        }
        else{
            echo 'false';
        }
        die;
    }
}