<?php

namespace App\Http\Controllers;


use App\Models\Customer;
use App\Models\Devise;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Paymethod;
use App\Models\Paymodalite;
use App\Views\View;
use Psr\Http\Message\ServerRequestInterface;

class InvoiceController extends Controller
{

    public function index(ServerRequestInterface $request)
    {
        $modalities = Paymodalite::where(['status' => 1])->get();
         $methods = Paymethod::where(['status' => 1])->get();
         $customers = Customer::where(['status' => 1])->get();
         $invoice = Invoice::join('customers', 'invoices.customer_id', '=', 'customers.id')->join('paymethods', 'invoices.method_id', '=', 'paymethods.id_method')->get();
        return View::render('invoice.index',compact("methods",'customers',"modalities","invoice"));
    }


    public function detail(ServerRequestInterface $request)
    {
     $hash = $request->getAttribute("hash");
     $devises = Devise::all();
     $invoice = Invoice::join('customers', 'invoices.customer_id', '=', 'customers.id')
         ->join('paymethods', 'invoices.method_id', '=', 'paymethods.id_method')->where(['invoices.hash_key' => $hash])->first();

        $items = InvoiceItem::where(['invoice_hash_key' => $hash])->get();
        $subtotal = 0;
        foreach ($items as  $product ) {
            $subtotal += $product->item_price * $product->item_qty;
        }
        $total = $subtotal + $invoice->livraison;

     return View::render('invoice.detail',compact("invoice",'items',"devises","subtotal","total"));
}


    public function additem(ServerRequestInterface $request)
    {
        $params = $this->getParams($request);
         $data = [
             'item_name' => $params['item'],
             'item_devise' => $params['devise'],
             'item_price' => $params['price'],
             'item_qty' => $params['qty'],
             'item_qty' => $params['qty'],
             'invoice_hash_key' => $params['hash'],
         ];
         if (InvoiceItem::create($data)){
             echo "true";
         }else{
             echo "false";
         }

         die;
    }
    public function addinv(ServerRequestInterface $request)
    {
        $rand = random_int(100, 100000);
        $params = $this->getParams($request);
         $data = [
             'status' => $params['paystatus'],
             'modality_id' => $params['modality'],
             'method_id' => $params['method'],
             'customer_id' => $params['customer'],
             'duedate' => $params['duedate'],
             'livraison' => $params['invshipping'],
             'hash_key' => sha1(time()),
             'reference' => $rand
         ];
         if (Invoice::create($data)){
             echo "true";
         }else{
             echo "false";
         }

         die;
    }


}