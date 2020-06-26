<?php

namespace Api\Controller\v1;


use Api\Controller\ResfulController;
use App\Models\User;
use App\Views\View;


class ApiController extends ResfulController
{

    public function index()
    {
        $users = User::all();
        $data = [
             'status' => "000",
            "information" => $users
        ];
        return  View::Json(compact('data'));
    }
    
}