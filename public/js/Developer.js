function clipboardCop(event){
    copyToClipboard(event);
}

// event handler
function copyToClipboard(ev) {

    var
        c = ev.getAttribute("data-copytarget"),
        inp = (c ? document.querySelector(c) : null);
    console.log(inp);
    // check if input element exist and if it's selectable
    if (inp && inp.select) {
        // select text
        inp.select();
        try {
            // copy text
            document.execCommand('copy');

            inp.blur();
            // copied animation
            $('#copiefinal').show('slow').delay(1000)
            document.getElementById('copiefinal').innerHTML = "Copié"
             setTimeout(function() {
                 $('#copiefinal').hide('slow').delay(1000)
            }, 1500);
        } catch (err) {
            //fallback in case exexCommand doesnt work
            alert(err);
        }

    }

}


    function generateclientID(hash_key){
    ShowLoading($('#generateclientID'))
    document.getElementById('generateclient').disabled = true
    $.ajax({
        url: '/generate-clientId',
        data: {
            hash_key : hash_key,
        },
        type: 'POST',
        success: function (msg) {
            document.getElementById('generateclient').disabled = false

            if (msg == "false"){
                toastr["error"]("Une erreur interne s'est produite")
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
                $('#generateclient').hide('slow').delay(1000)
                $('.createapibtn').show('slow').delay(1000)
                $('#clientIDdefaultlabel').show('slow').delay(1000)
                $('#clientIDdefault').show('slow').delay(1000)
                $('#clientIDdefault').val(msg)
                toastr["success"]("Client ID généré avec succes")
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
        }
    });
}


function TokenCreate(){
    let name = $('#tokenName').val()
    let app = $('#app').val()
    if(name == ""){
        toastr["error"]("Veuillez renseigner le nom du Jeton d'accès")
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
    else if (app == "0"){
        toastr["error"]("Veuillez choisir l'application")
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
         ShowLoading($('#TokenCreate'))
        document.getElementById('TokenCreate').disabled = true
        $.ajax({
            url: '/token-generator',
            data: {
                name : name,
                app : app
            },
            type: 'POST',
            success: function (msg) {
                document.getElementById('TokenCreate').disabled = false
                HideLoading()
                if (msg == "false"){
                    toastr["error"]("Une erreur interne s'est produite")
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
                else if (msg == "limit"){
                    toastr["warning"]("Limite de création du Jeton d'accès atteinte !")
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
                else if (msg == "existnapp"){
                    toastr["warning"]("Jeton d'accès déjà disponible pour cette application  !")
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
                else if (msg == "existname"){
                    toastr["warning"]("Ce nom de jeton existe déjà dans vos jeton d'accès !")
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
                     $('#jetonDacces').show('slow').delay(1000)
                     $('#js-token').val(msg)
                    $('#hidepart').hide('slow').delay(1000)
                    toastr["success"]("Token Ajouter avec succes")
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
                    $('#apidatatable').load(document.URL + '#body    tr')
                }
            }
        });
    }
}

function closeTokenBox(){
     $('#tokenName').val("")
   $('#app').val("0")
    $('#jetonDacces').hide('slow').delay(1000)
    $('#hidepart').show('slow').delay(1000)
}
