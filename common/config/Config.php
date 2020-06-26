<?php

namespace AkConfig\config;


use Zend\Diactoros\Response;

class Config
{

    const AppName = "Imperial Technology Dashboard";

    const ENV = "dev";


    //  This is the unique place to change  Database Settings
    // Change the const value into your database value

         const  DB_HOST = 'localhost';                                                                        const DB_NAME = 'dashboard';

         const  DB_USER = 'root';                                                                              const DB_PASS = '';

         const DB_PORT = 3306;                                                                               const DB_CHARSET ="utf8" ;


         // Mail configuration
            const Mail_Transport = 587;
            const Mail_setFromMail = "imperialtechnology8@gmail.com";
            const Mail_setFromName = Config::AppName;
            const Mail_Host = "smtp.gmail.com";
            const Mail_Password = "stephanehillaire";


           // Twitter Developer
            const consumer_token = "mtBFbt78Ps1p0nsIB4CPfz8ft";
            const consumer_token_secret = "A1jxWWfIqyzfKjUztAkYv8yeT15SZ6Sr6DZm4tSDxZ8QdQI8BY";
            const Twitter__token = "1265647324430245889-Kfu7zXhliJtheWp4bxqXFmUQc1fxcP";
            const Twitter__token_secret = "neBK2uzQx00aWHIWUOquaGrdD6xliicVKeq24QrqO3n4i";


            // Instagram

              const token_Instagram = "IGQVJYQ3hXak13a21VUFdsakFBWnRUMlBUcVQxcEdTd2lXMzd4SmFYVll3TFcwUXpHUGV5Umg1MFhFUUhPUVhzX1NNOG5rR1c3bFh6SkFmRUozck9zOGptV2QwU3hNX3I4ZAVBIVmVBTGRXdDR4RFktNwZDZD";
              const key_instagram = "08c22d07f1ce0b441b4eea90b8630830";
              const ID_instagram = "566484800587220";


    /**
     * Is only used  for illuminate database
     * @return array
     */
    public static function DB ()
    {
    return   [
      'driver' => 'mysql',
      'host'   => self::DB_HOST,
      'database' => self::DB_NAME,
      'username' => self::DB_USER,
      'password' => self::DB_PASS,
      'charset'  => self::DB_CHARSET,
      'collation' => 'utf8_unicode_ci',
      'prefix' => '',
    ];
    }


    public static function  NotFound()
    {
            $response = new Response();
            $response->getBody()->write(file_get_contents(dirname($_SERVER['DOCUMENT_ROOT'])."/common/error/404.twig"));
            return $response->withStatus(404);

    }

    public static function APINotFound()
    {
        $data = [
            'error' => "404",
            'message' => "Api ressouce not found"
        ];
        header("HTTP/1.1 404 Not Found");
        return json_encode($data);
    }


}
