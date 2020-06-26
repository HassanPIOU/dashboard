<?php

namespace App\Http\Controllers;


use Akuren\Whois\Domain;
use App\Models\Customer;
use App\Models\Server;
use App\Models\Serverdb;
use App\Models\Serverftp;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class UtilsController extends Controller
{


    public function domain(){
        return  View::render('utils.domain');
    }

    public function domainask(ServerRequestInterface $request)
    {
            $params = $this->getParams($request);
            $domain = $params['whois'];
            $domain = trim($domain);
            if(substr(strtolower($domain), 0, 7) == "http://") $domain = substr($domain, 7);
            if(substr(strtolower($domain), 0, 4) == "www.") $domain = substr($domain, 4);

            $whois = new Domain();

            if($whois->ValidateIP($domain)) {
                $result = $whois->LookupIP($domain);
            }
            elseif($whois->ValidateDomain($domain)) {
                $result = $whois->LookupDomain($domain);
            }

            echo "<pre>".$result."</pre>";
            die;
    }

    public function serverinfo()
    {
        $customers = Customer::all();
       $servers = Server::join('customers', 'servers.customer_id', '=', 'customers.id')
           ->join('structures', 'customers.structure', '=', 'structures.sid')->get();
        return View::render("utils.server",compact("servers","customers"));
    }

    public function getftp(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $ftp = Serverftp::where(['id_ftp' => $id])->get();
        echo  $ftp;
        die;
    }
    public function getdb(ServerRequestInterface $request)
    {
        $id = $request->getAttribute('id');
        $ftp = Serverdb::where(['id_db' => $id])->get();
        echo  $ftp;
        die;
    }

    public function deleteserver(ServerRequestInterface $request)
    {
        $id = $request->getAttribute("id");
         $server = Server::where(['servers.id' => $id])->delete();
         if ($server){
             echo 'true';
         }else{
             echo "false";
         }
         die;
    }






}