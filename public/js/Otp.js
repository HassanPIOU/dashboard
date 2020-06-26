$('#checkbeforestart').on('click',function (e) {
     e.preventDefault()
    $('#passwordcheckcard').show('slow').delay(1000)
    $('#checkbeforestartcard').hide('slow').delay(1000)
})

function paiementcheck() {
    var url = '/paiement-check'
    var password = $('#checkpassword').val()
    if (password == ""){
        toastr["error"]("Veuillez saisir mot de passe")
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    } else{
        ShowLoading($('#verificationModal'))
        document.getElementById("verificationModal").disabled = true;
        $.ajax({
            url: url,
            data : {
                password : password,
            },
            type:"post",
            success:function(msg){
               if (msg == "false"){
                   HideLoading()
                   document.getElementById("verificationModal").disabled = false;
                   toastr["error"]("Mot de passe incorrect")
                   toastr.options = {
                       "closeButton": false,
                       "debug": false,
                       "newestOnTop": false,
                       "progressBar": true,
                       "positionClass": "toast-top-right",
                       "preventDuplicates": false,
                       "onclick": null,
                       "showDuration": 300,
                       "hideDuration": 1000,
                       "timeOut": 5000,
                       "extendedTimeOut": 1000,
                       "showEasing": "swing",
                       "hideEasing": "linear",
                       "showMethod": "fadeIn",
                       "hideMethod": "fadeOut"
                   }
               }else{
                   window.location.href = "/paiement-otp-security"
               }
            },
            error:function() {
                HideLoading()
                document.getElementById("verificationModal").disabled = false;
                toastr["error"]("Une erreur s'est produite")
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": 300,
                    "hideDuration": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
            }
        })
    }
}

function sendmailtome() {
   var random = $('#random').val()
    $('#firstmsgotp').show("slow").delay(1000)
    $.ajax({
        url: "/sendmailforotp-"+random,
        type:"get",
        success:function(msg){
            if (msg == "false"){
                $('#firstmsgotp').hide('slow').delay(1000)
                HideLoading()
                toastr["error"]("Un probleme est srvenu lors de l'envoi du mail veuillez ressayer")
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": 300,
                    "hideDuration": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
            }else{
                $('#firstmsgotp').hide('slow').delay(1000)
                $('#authmailbox').show('slow').delay(1000)
                $('#title1').show('slow').delay(1000)
                $('#title2').hide('slow').delay(1000)
                $('#title3').hide('slow').delay(1000)
                $('#mailbtn').hide('slow').delay(1000)
                toastr["success"]("Un Mail vous a été envoyer")
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": 300,
                    "hideDuration": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
            }
        },
        error:function() {
            $('#firstmsgotp').hide('slow').delay(1000)
            HideLoading()
            toastr["error"]("Une erreur s'est produite")
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": 300,
                "hideDuration": 1000,
                "timeOut": 5000,
                "extendedTimeOut": 1000,
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        }
    })
}

function verifycode(){
    var url = "/paiement-otp-security"
    var verifycodepassword = $('#verifycodepassword').val()
    var random = $('#random').val()
    if (verifycodepassword == ""){
        toastr["error"]("Veuillez saisir le code reçu")
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": 300,
            "hideDuration": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    } else{
        ShowLoading($('#verifycode'));
        document.getElementById("verifycode").disabled = true;
        $.ajax({
            url: url,
            data : {
                random : random,
              password : verifycodepassword
            },
            type:"post",
            success:function(msg){
                if (msg == "false"){
                    HideLoading()
                    document.getElementById("verifycode").disabled = false;
                    toastr["error"]("Code incorrect")
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": 300,
                        "hideDuration": 1000,
                        "timeOut": 5000,
                        "extendedTimeOut": 1000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                }else{
                window.location.href = "/payment-operation"
                }
            },
            error:function() {
                HideLoading()
                document.getElementById("verifycode").disabled = false;
                toastr["error"]("Une erreur s'est produite")
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": 300,
                    "hideDuration": 1000,
                    "timeOut": 5000,
                    "extendedTimeOut": 1000,
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
            }
        })
    }
}

function addMoneyAcount(){

    let accountName = $('#accountName').val()
    let accountNumber = $('#accountNumber').val()
    let accountOpenDate = $('#accountOpenDate').val()
    let accountDevise = $('#accountDevise').val()
    let accounttype= $('#accountRole').val()
    let accountRemarques = $('#accountRemarques').val()
    let accountStartBalance = $('#accountStartBalance').val()
     
    if (accountName =="" || accountNumber =="" || accountOpenDate =="" || accountDevise == null || accounttype =="" || accountStartBalance ==""){
       emptyInputs()
    }
    else{
        ShowLoading($('#addMoneyAcount'));
        document.getElementById("addMoneyAcount").disabled = true;
        $('[href="#account"]').tab('show');
        $.ajax({
            url: "operation-account-add",
            data : {
                accountName : accountName,
                accountDevise : accountDevise,
                accountNumber : accountNumber,
                accountOpenDate : accountOpenDate,
                accountRemarques : accountRemarques,
                accountStartBalance : accountStartBalance,
                accounttype : accounttype
            },
            type:"post",
            success:function(msg){
                HideLoading()
                document.getElementById("addMoneyAcount").disabled = false;
                if (msg == "true"){
                    successAddToast("Compte")
                    $('#addMoneyAcount_dismiss').click()
                    $('#apidatatable').load(document.URL+"#body .accountTr")
                }else if ("exist") {
                    toastr["warning"]("Nom de compte existant")
                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": true,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "showDuration": 300,
                        "hideDuration": 1000,
                        "timeOut": 5000,
                        "extendedTimeOut": 1000,
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                }else{
                    internalerrormessage()
                }
            },
            error:function() {
                HideLoading()
                document.getElementById("addMoneyAcount").disabled = false;
               internalerrormessage()
            }
        })
    }


}

function addMoneyTransaction(){
    let amount_transaction = $('#amount_transaction').val()
    let  destinatiare_transaction = $('#destinatiare_transaction').val()
    let  type_transaction = $('#type_transaction').val()
    let  from_account = $('#from_account').val()
    let to_account = $('#to_account').val()
    let  desc_transaction = $('#desc_transaction').val()

    if (amount_transaction =="" || destinatiare_transaction =="" || type_transaction == '' || desc_transaction == '' || from_account == '' || to_account == ''){
        emptyInputs()
    }
    else{
        ShowLoading($('#addMoneyTransaction'));
        document.getElementById("addMoneyTransaction").disabled = true;
        $('[href="#transaction"]').tab('show');
        $.ajax({
            url: "operation-transaction-add",
            data : {
                amount_transaction : amount_transaction,
                destinatiare_transaction : destinatiare_transaction,
                type_transaction : type_transaction,
                desc_transaction : desc_transaction,
                from_account : from_account,
                to_account : to_account,
            },
            type:"post",
            success:function(msg){
                HideLoading()
                document.getElementById("addMoneyTransaction").disabled = false;
                if (msg == "true"){
                    successAddToast("Transaction")
                    $('#trans_datatable').load(document.URL+"#body .transTr")
                    $('#apidatatable').load(document.URL+"#body .accountTr")
                    $('#addMoneyTransaction_dismiss').click()
                }else{
                    internalerrormessage()
                }
            },
            error:function() {
                HideLoading()
                document.getElementById("addMoneyTransaction").disabled = false;
                internalerrormessage()
            }
        })
    }
}

function projetselectforbudget(value){
    if (value == 0){
     $('#otherprojetpanel').show('slow').delay(1000)
        $('#account_budget').parent().removeClass('col-lg-6')
        $('#account_budget').parent().addClass('col-lg-12')
    } else if (value == -1){
        window.location.href = 'ajouter-projet'
    }else{
        $('#other_projet_budget').hide('slow').delay(1000)

    }
}

function addbudget(){
    let  projet_budget = $('#projet_budget').val()
    let  amount_budget = $('#amount_budget').val()
    let  other_projet_budget = $('#other_projet_budget').val()
    let  take_date_budget = $('#take_date_budget').val()
    let  account_budget = $('#account_budget').val()
    let  description_budget = $('#description_budget').val()



    if (amount_budget == "" || take_date_budget == "" || account_budget == "" || description_budget == "" ){
        if (projet_budget == 0){
            if (other_projet_budget == ""){
                emptyInputs()
            }
        }else if (projet_budget == null){
            emptyInputs()
        }
        emptyInputs()
    }

    else{
        ShowLoading($('#addbudget'));
        document.getElementById("addbudget").disabled = true;
        $('[href="#budget"]').tab('show');
        $.ajax({
            url: "operation-budget-add",
            data : {
                amount_budget : amount_budget,
                take_date_budget : take_date_budget,
                account_budget : account_budget,
                other_projet_budget : other_projet_budget,
                projet_budget : projet_budget,
                description_budget : description_budget,

            },
            type:"post",
            success:function(msg){
                HideLoading()
                document.getElementById("addbudget").disabled = false;
                if (msg == "true"){
                    successAddToast("Budget")
                    $('#budget_datatable').load(document.URL+"#body .budgetTr")
                    $('#apidatatable').load(document.URL+"#body .accountTr")
                    $('#addbudget_dismiss').click()
                }else{
                    internalerrormessage()
                }
            },
            error:function() {
                HideLoading()
                document.getElementById("addbudget").disabled = false;
                internalerrormessage()
            }
        })
    }


}

function  add_depot() {
     let amount_depot = $('#amount_depot').val()
     let user_depot = $('#user_depot').val()
     let account_depot = $('#account_depot').val()

    if (amount_depot == "" || user_depot == null){
         emptyInputs()
    }
    else{
        ShowLoading($('#add_depot'));
        document.getElementById("add_depot").disabled = true;
        $('[href="#depot"]').tab('show');
        $.ajax({
            url: "operation-depot-add",
            data : {
                amount_depot : amount_depot,
                account_depot : account_depot,
                user_depot : user_depot,
            },
            type:"post",
            success:function(msg){
                HideLoading()
                document.getElementById("add_depot").disabled = false;
                if (msg == "true"){
                    successAddToast("Dépot")
                    $('#depot_datatable').load(document.URL+"#body .depotTr")
                    $('#apidatatable').load(document.URL+"#body .accountTr")
                    $('#add_depot_dismiss').click()
                }else{
                    internalerrormessage()
                }
            },
            error:function() {
                HideLoading()
                document.getElementById("add_depot").disabled = false;
                internalerrormessage()
            }
        })
    }
}









