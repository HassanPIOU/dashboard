<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 15/06/2020
 * Time: 12:57
 */

namespace App\Http\Handlers\DatabaseHandler;


use AkConfig\config\Config;
use PDO;

class DbHandlers
{
    public function check()
    {

        $stmt = $this->connexion()->prepare("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME =:dbname");
        $stmt->execute(array(":dbname"=>Config::DB_NAME));
        $row=$stmt->fetch(PDO::FETCH_ASSOC);

        if($stmt->rowCount() == 1)
        {
            return "exist";
        }
    }


    public function create()
    {
        $result = $this->connexion()->exec("CREATE DATABASE IF NOT EXISTS ".Config::DB_NAME);
        if ($result){
          return true;
        }else{
           return false;
        }
    }



    private function connexion(){
        $connection = new PDO("mysql:host=localhost", Config::DB_USER, Config::DB_PASS);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $connection;
    }
}