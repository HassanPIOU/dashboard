<?php

namespace App\Http\Controllers;


use Akuren\Auth\Auth;
use Akuren\Mail\Mail;
use Akuren\PasswordHash\CryptChecker;
use Akuren\Session\Session;
use App\Models\Budget;
use App\Models\Compte;
use App\Models\Customer;
use App\Models\Depot;
use App\Models\Devise;
use App\Models\Otpauthentifiaction;
use App\Models\Payment;
use App\Models\Projet;
use App\Models\Transaction;
use App\Models\User;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class PaymentController extends Controller
{


    public function index()
    {
       return View::render('payment.optverification');
  }

    public function checkpassword(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
        $password = $params['password'];
        $otp = Otpauthentifiaction::all();

        foreach ($otp as $otpcheck){
           $check = CryptChecker::check($password,$otpcheck->password);
            if ($check){
                echo "true";
            }else{
                echo "false";
            }
        }

        die;
   }

    public function mailcheckotp(ServerRequestInterface $request)
    {
        $rand = rand(10000,1000000000000000);
        if ($request->getMethod() == "POST"){
           $params = $this->getParams($request);
           $password = $params['password'];
           $random = $params['random'];
           if ($password == $random){
               echo 'true';
               die;
           }else{
               echo 'false';
               die;
           }
        }
        return View::render('payment.secondverification',compact('rand'));
   }

   public function sendmailforotp(ServerRequestInterface $request){
       $session = new Session();
       $auth = $session->get('auth');
       $rand = $request->getAttribute('random');
       $params = [
           'key' => $rand,
           "username" => $auth['lastname']." ".$auth['firstname']
       ];
       $email = $auth['email'];

      $send = Mail::send()->setSubjet('Imperial Technology OTP code')->setToMail($email)->setMessage('otpmessage',$params)->exec();
      if ($send){
          echo "true";
      }else{
          echo "false";
      }

      die;
   }

    public function paymentlist()
    {
        $comptes = Compte::all();
        $transactions = Transaction::leftJoin('comptes', 'transactions.from_account', '=', 'comptes.id')->
            leftJoin('customers', 'transactions.destinatiare_transaction', '=', 'customers.id')
            ->get();

         $projets = Projet::all();

        $devises = Devise::where(['status' => 1])->get();

        $users= User::where(['status' => 1])->get();
          $depots = Depot::leftJoin('comptes', 'depots.account_depot', '=', 'comptes.id')->
          leftJoin('users', 'depots.account_depot', '=', 'users.id')
              ->get();
        $budgets = Budget::leftJoin('projets', 'budgets.projet_budget', '=', 'projets.id')->
        leftJoin('comptes', 'budgets.account_budget', '=', 'comptes.id')->
        leftJoin('users', 'budgets.user_id', '=', 'users.id')
            ->get();

       $g = 0;
       $p = 0;
        $firstG = Transaction::where(['type_transaction' => 2 ])->get();

        $firstp = Transaction::where(['type_transaction' => 1 ])->get();

        foreach ($firstG as $k){
            $g+= $k['amount_transaction'];
        }

        foreach ($depots as $k){
            $g+= $k['amount_depot'];
        }


        foreach ($firstp as $k){
            $p+= $k['amount_transaction'];
        }

        foreach ($budgets as $k){
            $p+= $k['amount_budget'];
        }


        $data = [
            "Gains" => $g,
            "Dépenses" => $p,
        ];

        $customers = Customer::where(['status' => 1])->get();
        return View::render('payment.operation',
            compact(
                'comptes',
                'devises',
                'transactions',
                'customers',
                "projets",
                'users',
                'budgets',
                'depots',
                'data'

            ));
   }

    public function accountAdd(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $check = Compte::where(['numero' => $params['accountNumber']])->count();

        if ($check > 0){
            echo 'exist';
        }else{
            $data = [
                'account_name' => $params['accountName'],
                'devise' => $params['accountDevise'],
                'numero' => $params['accountNumber'],
                'open_date' => $params['accountOpenDate'],
                'remarque' => $params['accountRemarques'],
                'open_solde' => $params['accountStartBalance'],
                'solde' => $params['accountStartBalance'],
                'type' => $params['accounttype']
            ];

            if (Compte::create($data)){
                echo 'true';
            }else{
                echo "false";
            }
        }
        die;

   }
    public function transactionAdd(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

            $data = [
                'amount_transaction' => $params['amount_transaction'],
                'destinatiare_transaction' => $params['destinatiare_transaction'],
                'type_transaction' => $params['type_transaction'],
                'desc_transaction' => $params['desc_transaction'],
                'from_account' => $params['from_account'],
                'to_account' => $params['to_account'],
                'user_id' => Auth::user()->id
            ];
            if ($params['type_transaction'] == 1){
                 $cp = Compte::where(['id' => $params['from_account']])->first();
                 $solde = $cp['solde'];
                  $final =  $solde  - intval($params['amount_transaction']);
                 Compte::where(['id' => $params['from_account']])->update(['solde' => $final]);
            }
            else{
                $cp = Compte::where(['id' => $params['to_account']])->first();
                $solde = $cp['solde'];
                $final = intval($params['amount_transaction']) + $solde;
                Compte::where(['id' => $params['to_account']])->update(['solde' => $final]);
            }
            if (Transaction::create($data)){
                echo 'true';
            }else{
                echo "false";
            }

        die;

   }


    public function budgetAdd(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);

        $data = [];

        if ($params['projet_budget'] == 0){
            $data = [
                'amount_budget' => $params['amount_budget'],
                'take_date_budget' => $params['take_date_budget'],
                'account_budget' => $params['account_budget'],
                'other_projet_budget' => $params['other_projet_budget'],
                'description_budget' => $params['description_budget'],
                'user_id' => Auth::user()->id
            ];
        }else{
            $data = [
                'amount_budget' => $params['amount_budget'],
                'take_date_budget' => $params['take_date_budget'],
                'account_budget' => $params['account_budget'],
                'projet_budget' => $params['projet_budget'],
                'description_budget' => $params['description_budget'],
                'user_id' => Auth::user()->id
            ];
        }

        $cp = Compte::where(['id' => $params['account_budget']])->first();
        $solde = $cp['solde'];
        $final =  $solde  - intval($params['amount_budget']);
         Compte::where(['id' => $params['account_budget']])->update(['solde' => $final]);

        if (Budget::create($data)){
            echo "true";
        }else{
            echo "false";
        }

        die;
    }


    public function depotAdd(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);


            $data = [
                'amount_depot' => $params['amount_depot'],
                'account_depot' => $params['account_depot'],
                'user_id' => $params['user_depot']
            ];


        $cp = Compte::where(['id' => $params['account_depot']])->first();

        $solde = $cp['solde'];
        $final =  $solde  + intval($params['amount_depot']);
        Compte::where(['id' => $params['account_depot']])->update(['solde' => $final]);

        if (Depot::create($data)){
            echo "true";
        }else{
            echo "false";
        }

        die;
    }








}