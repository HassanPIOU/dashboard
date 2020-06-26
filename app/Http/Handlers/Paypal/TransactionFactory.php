<?php
/**
 * Created by PhpStorm.
 * User: Stephane de Jesus
 * Date: 04/05/2020
 * Time: 14:42
 */

namespace App\Http\Handlers\Paypal;

class TransactionFactory
{
    private static $API_Username = PAYPAL_API_USERNAME;
    private static $API_Password = PAYPAL_API_PASSWORD;
    private static $API_Signature = PAYPAL_API_SIGNATURE;
    private static $API_Environment = PAYPAL_API_MODE;
    private static $API_Version = '116.0';

    public static function Call($methodName,$params){
        if(self::$API_Environment == 'LIVE'){
            $API_Endpoint = "https://api-3t.paypal.com/nvp";
        }else{
            $API_Endpoint = "https://api-3t.sandbox.paypal.com/nvp";
        }

        $nvpstr = "";
        foreach($params as $k=>$v){
            $nvpstr .="&".$k."=".urlencode($v);
        }

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $API_Endpoint);
        curl_setopt($ch, CURLOPT_VERBOSE, 1);

        //Turn of server and pakagemanager
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);

        //set the API operation,version,API signature in requrest

        $nvpreq ="";
        $nvpreq .= "METHOD=".urlencode($methodName);
        $nvpreq .= "&VERSION=".urlencode(self::$API_Version);
        $nvpreq .= "&PWD=".urlencode(self::$API_Password);
        $nvpreq .= "&USER=".urlencode(self::$API_Username);
        $nvpreq .= "&SIGNATURE=".urlencode(self::$API_Signature);
        $nvpreq .= $nvpstr;

        //set the request as POST field for curl
        curl_setopt($ch, CURLOPT_POSTFIELDS, $nvpreq);

        //get the response from server
        $httpResponse = curl_exec($ch);

        if(!$httpResponse){
            return "$methodName failed:".curl_error($ch).'('.curl_errno($ch).')';
        }

        //Extract the response details

        $httpResponseArray = explode('&', $httpResponse);

        $httpParsedResponseArray = array();

        foreach ($httpResponseArray as $i=>$value){
            $tmpArray = explode('=', $value);
            if(sizeof($tmpArray) > 1){
                $httpParsedResponseArray[$tmpArray[0]] = urldecode($tmpArray[1]);
            }
        }
        if((0 == sizeof($httpParsedResponseArray)) || !array_key_exists('ACK',$httpParsedResponseArray)){
            return "Invalid HTTP Response for POST request($nvpreq) to $API_Endpoint.";

        }
        return $httpParsedResponseArray;
    }


    #----------------------------
    # @$hok
    # mass payment with multiple users in one go
    # paypal transaction status will be : Completed, Failed, Returned, Reversed, Unclaimed, Pending, Blocked
    #----------------------------
    public static function MassPay($params){
        $methodName = "MassPay";
        return self::Call($methodName, $params);
    }

    public static function GetTransactionDetail($params){
        $methodName = "GetTransactionDetails";
        return self::Call($methodName, $params);
    }

    public static function TransactionSearch($params){
        $methodName = "TransactionSearch";
        return self::Call($methodName, $params);
    }
}
