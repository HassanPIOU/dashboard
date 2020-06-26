<?php


# below is the example how to use above class
$params = array();
$params["RECEIVERTYPE"] = "EmailAddress";
$params["EMAILSUBJECT"] = "Your withdraw request was processed";

$params["L_AMT0"] = 1;
$params["L_EMAIL0"] = "xyz@xyz.abc";
$params["L_UNIQUEID0"] = rand(11111,9999999);

$params["L_AMT1"] = 2;
$params["L_EMAIL1"] = "hamed-buyer@lifeofu.com";
$params["L_UNIQUEID1"] = rand(11111,9999999);

$params["L_AMT2"] = 3;
$params["L_EMAIL2"] = "testuser1@test1.com";
$params["L_UNIQUEID2"] = rand(11111,9999999);

$params["CURRENCYCODE"] = "USD";

$result = PaypalnvpComponent::MassPay($params);


//transaction detial
$params = array();
$params["TRANSACTIONID"] = TRANSACTIONID_HERE;
$result = PaypalnvpComponent::GetTransactionDetail($params);
