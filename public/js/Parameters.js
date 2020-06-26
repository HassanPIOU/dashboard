
function addmethod(){
    var name = $('#method_title').val()
    var cover = document.getElementById('method_file').files[0]

    var formdata = new FormData()

    if (name == "" || cover.length == 0){

    }else{
        formdata.append("name",name)
        formdata.append("cover",cover)
        ShowLoading($('#addmethod'))
        $.ajax({
            url: "/parameter-add-method",
            data: formdata,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (msg) {
                    HideLoading()
                  successAddToast("Methode")
                    $('#methodtable').load(document.URL + '#bodymethod  .trmethod')

                 $('#method_title').val("")
                  document.getElementById('method_file').value =""


            }
        });
    }

}


function changeapistatus(number,id) {
    $('#load_'+id).show('slow').delay(1000)
    $.ajax({
        url: "/parameter-api-"+id+'-'+number,
        type: 'GET',
        success: function (msg) {
            $('#load_'+id).hide('slow').delay(1000)
            if (msg== 'actif'){
                toastr["success"]("Activer ")
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

           else if (msg== 'inactif'){
                toastr["warning"]("Désactiver")
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


        }
    });
}

function changeapistate(v,n){
    if (v.checked == true){
        changeapistatus(1,n)
    }else{
        changeapistatus(2,n)
    }
}

function adddevise(){
    let devise = $('#devisename').val()
    let code = $('#devisecode').val()
     ShowLoading($('#btnadddevise'))
    $.ajax({
        url: "/parameter-add-devise",
        data:{
          devise : devise,
          code : code
        },
        type: 'POST',
        success: function (msg) {
            HideLoading()
            if (msg == 'true'){
               $('#devisename').val("")
                $('#devisecode').val("")
                toastr["success"]("Devise ajouter avec succes ")
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
                $('#devisetable').load(document.URL + '#bodydevise  .trdevise')
            }
            else{
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
        }
    });

}

function addapifnn(){
    let name = $('#apiaddinput').val()
     ShowLoading($('#addapibtn'))
    $.ajax({
        url: "/parameter-add-api",
        data:{
            name : name,
        },
        type: 'POST',
        success: function (msg) {
            HideLoading()
            if (msg == 'true'){
               $('#apiaddinput').val("")
               $('#api_add_dismiss').click()
                successAddToast("API")
                $('#apipanelbox').load(document.URL + '#apipanelbox  #apipanelbox')
            }
            else{
              internalerrormessage()
            }
        }
    });
}

function methodAction(id,type){
    let text
    let warning
    let confbtn
    let url = "/params-method-action"
    let successmessage

    if (type == 1){
        warning = "success"
        text = "Activer la methode!"
        confbtn = "Validé"
        successmessage = "Méthode activé avec succes"
    }

    if (type == 2){
        warning = "warning"
        text = "Désactiver la methode!"
        confbtn = "Validé"
        successmessage = "Méthode désactivé avec succes"

    }

    if (type == 3){
        warning = "warning"
        text = "Cette action est iréversible!"
        confbtn = "Supprimer"
        successmessage = "Méthode supprimer avec succes"

    }

    Swal.fire({
        title:"Êtes vous sûre?",
        text:text,
        type:warning,
        showCancelButton:!0,
        confirmButtonText:confbtn,
        cancelButtonText:"Annuler",
        confirmButtonClass:"btn btn-success mt-2",
        cancelButtonClass:"btn btn-danger ml-2 mt-2",
        buttonsStyling:!1
    }).then(function(t){
        t.value?$.ajax({
            url: url+"-"+id+"-"+type,
            type:"get",
            success:function(msg){
                if (msg == "true"){
                    Swal.fire({
                        title:"Done",
                        text: successmessage,
                        type:"success"
                    })
                    $('#methodtable').load(document.URL + '#bodymethod  .trmethod')

                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Une erreur interne s'est produite",
                        type:"error"})
                }
            },
            error:function() {
                Swal.fire({
                    title:"Cancelled",
                    text:"Une erreur s'est produite",
                    type:"error"})
            }
        }):t.dismiss===Swal.DismissReason.cancel&&Swal.fire(
            {title:"Cancelled",text:"Action non effectué",type:"error"})
    })
}

function deviseAction(id,type){
    let text
    let warning
    let confbtn
    let url = "/params-devise-action"
    let successmessage

    if (type == 1){
        warning = "success"
        text = "Activer la Devise!"
        confbtn = "Validé"
        successmessage = "Devise activé avec succes"
    }

    if (type == 2){
        warning = "warning"
        text = "Désactiver la Devise!"
        confbtn = "Validé"
        successmessage = "Devise désactivé avec succes"

    }

    if (type == 3){
        warning = "warning"
        text = "Cette action est iréversible!"
        confbtn = "Supprimer"
        successmessage = "Devise supprimer avec succes"

    }

    Swal.fire({
        title:"Êtes vous sûre?",
        text:text,
        type:warning,
        showCancelButton:!0,
        confirmButtonText:confbtn,
        cancelButtonText:"Annuler",
        confirmButtonClass:"btn btn-success mt-2",
        cancelButtonClass:"btn btn-danger ml-2 mt-2",
        buttonsStyling:!1
    }).then(function(t){
        t.value?$.ajax({
            url: url+"-"+id+"-"+type,
            type:"get",
            success:function(msg){
                if (msg == "true"){
                    Swal.fire({
                        title:"Done",
                        text: successmessage,
                        type:"success"
                    })
                    $('#devisetable').load(document.URL + '#bodydevise  .trdevise')

                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Une erreur interne s'est produite",
                        type:"error"})
                }
            },
            error:function() {
                Swal.fire({
                    title:"Cancelled",
                    text:"Une erreur s'est produite",
                    type:"error"})
            }
        }):t.dismiss===Swal.DismissReason.cancel&&Swal.fire(
            {title:"Cancelled",text:"Action non effectué",type:"error"})
    })
}

function modalityAction(id,type){
    let text
    let warning
    let confbtn
    let url = "/params-modality-action"
    let successmessage

    if (type == 1){
        warning = "success"
        text = "Activer la Modalité!"
        confbtn = "Validé"
        successmessage = "Modalité activé avec succes"
    }

    if (type == 2){
        warning = "warning"
        text = "Désactiver la Modalité!"
        confbtn = "Validé"
        successmessage = "Modalité désactivé avec succes"

    }


    Swal.fire({
        title:"Êtes vous sûre?",
        text:text,
        type:warning,
        showCancelButton:!0,
        confirmButtonText:confbtn,
        cancelButtonText:"Annuler",
        confirmButtonClass:"btn btn-success mt-2",
        cancelButtonClass:"btn btn-danger ml-2 mt-2",
        buttonsStyling:!1
    }).then(function(t){
        t.value?$.ajax({
            url: url+"-"+id+"-"+type,
            type:"get",
            success:function(msg){
                if (msg == "true"){
                    Swal.fire({
                        title:"Done",
                        text: successmessage,
                        type:"success"
                    })
                    $('#modalitytable').load(document.URL + '#bodymodality  .trmodality')

                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Une erreur interne s'est produite",
                        type:"error"})
                }
            },
            error:function() {
                Swal.fire({
                    title:"Cancelled",
                    text:"Une erreur s'est produite",
                    type:"error"})
            }
        }):t.dismiss===Swal.DismissReason.cancel&&Swal.fire(
            {title:"Cancelled",text:"Action non effectué",type:"error"})
    })
}

function addInformation(){
    let info_name = $('#info_name').val()
    let info_email = $('#info_email').val()
    let info_telephone = $('#info_telephone').val()
    let info_address = $('#info_address').val()
    let info_description = $('#info_description').val()

    if (info_name == "" ||info_email == "" ||info_telephone == "" ||info_address == "" ||info_description == "" ){
        emptyInputs()
    }
    else{
        ShowLoading($('#addInformation'))
        document.getElementById('addInformation').disabled = true
        $.ajax({
            url: "/parameter-info",
            data:{
                name : info_name,
                email : info_email,
                adresse : info_address,
                telephone : info_telephone,
                description : info_description,
            },
            type: 'POST',
            success: function (msg) {
                document.getElementById('addInformation').disabled = false
                HideLoading()
                if (msg == 'true'){
                    successAddToast("Information")
                    $('#page-topbar').load(document.URL+'#page-topbar   #page-topbar')
                }
                else{
                    internalerrormessage()
                }
            }
        });
    }


}

function addTerms(){
    let info_terms = $('#info_terms').val()
    if (info_terms == "" ){
        emptyInputs()
    }
    else{
        ShowLoading($('#addTerms'))
        document.getElementById('addTerms').disabled = true
        $.ajax({
            url: "/parameter-info-terms",
            data:{
                terms : info_terms
            },
            type: 'POST',
            success: function (msg) {
                document.getElementById('addTerms').disabled = false
                HideLoading()
                if (msg == 'true'){
                    successUpdateToast("Termes et Conditions")
                }
                else{
                    internalerrormessage()
                }
            }
        });
    }
}

