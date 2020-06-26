function addUsertodatabase(){
    let firstname = $('#firstname').val()
    let lastname = $('#lastname').val()
    let email = $('#email').val()
    let telephone = $('#telephone').val()
    let poste = $('#poste').val()
    let address = $('#address').val()
    let profil = $('#profil').val()

    if (firstname == "" || lastname == "" || firstname == "" ||email == "" ||telephone == "" ||poste == "" ||address == "" ||profil == ""){
       emptyInputs()
    }else{
        ShowLoading($('#addUser'))
        document.getElementById('addUser').disabled = true
        $.ajax({
            url: '/add-user',
            data: {
                  firstname : firstname ,
                  lastname : lastname ,
                  email : email,
                 telephone : telephone,
                 poste : poste,
                 adresse : address,
                 profil  : profil
            },
            type: 'POST',
            success: function (msg) {
                document.getElementById('addUser').disabled = false
                HideLoading()
                if (msg == "true"){
                    $('#addUser_dismiss').click()
                    successAddToast('Utilisateur')
                    $('#datatable').load(document.URL + '#body   tr')
                }
                else if (msg == "nosend"){
                    toastr["warnig"]("Mail non envoyé.. utilisateur non crée !")
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
                else if (msg =='exist') {
                    toastr["warning"]("Un utilisateur avec le même <b>Nom</b> et <b>Prénom </b> existe déjà !")
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
                }else if (msg =='mailexist') {
                    toastr["warning"]("Email déja utilisé")
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
                internalerrormessage()
                }
            }
        });
    }

}
function userAction(id,type){
    let text
    let warning
    let confbtn
    let url = "/user-action"
    let successmessage

    if (type == 1){
        warning = "success"
        text = "Activer Utilisateur!"
        confbtn = "Validé"
        successmessage = "Utilisateur activé avec succes"
    }

    if (type == 2){
        warning = "warning"
        text = "Désactiver Utilisateur"
        confbtn = "Validé"
        successmessage = "Utilisateur désactivé avec succes"

    }

    if (type == 3){
        warning = "warning"
        text = "Cette action est iréversible!"
        confbtn = "Supprimer"
        successmessage = "Utilisateur supprimer avec succes"

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
                    $('#datatable').load(document.URL + '#body  tr')
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

function getuserdetail(hash_key){
    $('#detailuserlist').html(" <img src=\"/assets/images/loading.gif\"  style=\"width: 50px;height: 50px;\" alt=\"\">")
    $.ajax({
        url: '/user-detail/'+hash_key,
        type: 'GET',
        success: function (msg) {
            $('#detailuserlist').html(" ")
            if (msg == "true"){
                internalerrormessage()
                $('#detailuserlist').html("Utilisateur désactiver")
            }
            else{
                let content = JSON.parse(msg)


                $('#detailuserlist').html("<div class=\"row\">\n" +
                    "                    <div class=\"col-lg-4\">\n" +
                    "                        <img class=\" avatar-xl\"  style=\"border-radius: 6px\" src=\"/uploads/users/"+content.avatar+ "\" alt=\"\" />\n" +
                    "                    </div>\n" +
                    "                    <div class=\"col-lg-8\">\n" +
                    "                        <div class=\"table-responsive\">\n" +
                    "                            <table class=\"table table-centered table-nowrap\" id=\"example1\">\n" +
                    "                                <tbody id=\"bodytask\">\n" +
                    "                                    <tr >\n" +
                    "                                        <td>Nom</td>\n" +
                    "                                        <td>"+content.lastname+"</td>\n" +
                    "                                    </tr>\n" +
                    "                                    <tr >\n" +
                    "                                        <td>Prénom</td>\n" +
                    "                                        <td>"+content.firstname+"</td>\n" +
                    "                                    </tr>\n" +
                    "                                    <tr >\n" +
                    "                                        <td>Email</td>\n" +
                    "                                        <td>"+content.email+"</td>\n" +
                    "                                    </tr>\n" +
                    "                                    <tr >\n" +
                    "                                        <td>Téléphone</td>\n" +
                    "                                        <td>"+content.telephone+"</td>\n" +
                    "                                    </tr>\n" +
                    "                                    <tr>\n" +
                    "                                        <td>Poste</td>\n" +
                    "                                        <td>"+content.poste+"</td>\n" +
                    "                                    </tr>\n" +
                    "                                    <tr>\n" +
                    "                                        <td>Adresse</td>\n" +
                    "                                        <td>"+content.adresse+"</td>\n" +
                    "                                    </tr>\n" +
                    "                                    <tr>\n" +
                    "                                        <td>Profil</td>\n" +
                    "                                        <td>"+content.designation+"</td>\n" +
                    "                                    </tr>\n" +
                    "                                </tbody>\n" +
                    "                            </table>\n" +
                    "                        </div>\n" +
                    "                    </div>\n" +
                    "                </div>")
            }
        }
    });


}