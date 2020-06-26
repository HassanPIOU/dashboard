let choosed = []
$('#customSwitch1').on('change',function (e) {
    e.preventDefault()
    let check = document.getElementById('customSwitch1').checked
    if (check == true){
        var option = {
        option : 'chat'
        }
        choosed.push(option)
    }
    else{
        $('#chatpanelbox').hide('slow').delay(1000)
        var choose  = choosed
        choosed = []
        for (let i = 0; i < choose.length; i++) {
            if (!(choose[i].option == 'chat')){
                choosed.push(choose[i]);
            }
        }
    }
})
$('#customSwitch2').on('change',function (e) {
    e.preventDefault()
    let check = document.getElementById('customSwitch2').checked

    if (check == true){
        $('#apppanelbox').show('slow').delay(1000)
        var option = {
            option : 'app'
        }
        choosed.push(option)
    } else{
        $('#apppanelbox').hide('slow').delay(1000)
        var choose  = choosed
        choosed = []
        for (let i = 0; i < choose.length; i++) {
            if (!(choose[i].option == 'app')){
                choosed.push(choose[i]);
            }
        }
    }

})
$('#customSwitch3').on('change',function (e) {
    e.preventDefault()
    let check = document.getElementById('customSwitch3').checked
    if (check == true){
        $('#utilspanelbox').show('slow').delay(1000)
        var option = {
           option : 'utils'
        }
        choosed.push(option)
    } else{
        $('#utilspanelbox').hide('slow').delay(1000)

        var choose  = choosed
        choosed = []
        for (let i = 0; i < choose.length; i++) {
            if (!(choose[i].option == 'utils')){
                choosed.push(choose[i]);
            }
        }
    }

})
$('#customSwitch4').on('change',function (e) {
    e.preventDefault()
    let check = document.getElementById('customSwitch4').checked

    if (check == true){
        $('#adminpanelbox').show('slow').delay(1000)
        var option = {
          option : 'admin'
        }
        choosed.push(option)
    } else{
        $('#adminpanelbox').hide('slow').delay(1000)
        var choose  = choosed
        choosed = []
        for (let i = 0; i < choose.length; i++) {
            if (!(choose[i].option == "admin")){
                choosed.push(choose[i]);
            }
        }
    }
})

$('#submitprofil').on('click',function (e) {
    e.preventDefault()
   var url = '/profil-add'

    var nomprofil = $('#nomprofil').val()
    var descriptionprofil = $('#descriptionprofil').val()

    if (choosed.length == 0){
        toastr["error"]("Veuillez choisir au moin une option")
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
    else  if (nomprofil == ""){
        toastr["error"]("Veuillez saisir un nom")
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

    else{

        console.log(descriptionprofil)
       ShowLoading($('#submitprofil'))
       document.getElementById('submitprofil').disabled = true
        $.ajax({
            url: url,
            data : {
                nomprofil : nomprofil,
                descriptionprofil : descriptionprofil,
                option : choosed
            },
            type:"post",
            success:function(msg){
                if (msg == "true"){
                    HideLoading()
                    document.getElementById("submitprofil").disabled = false;
                    toastr["success"]("profil creer avec succes")
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
                    window.location.reload(true)
                } else{
                    HideLoading()
                    document.getElementById("submitprofil").disabled = false;
                    toastr["error"]("Une erreur serveur s'est produite")
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
                HideLoading()
                document.getElementById("submitprofil").disabled = false;
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

})


