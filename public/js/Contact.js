function addcustomer(){

    var structure = $('#structure').val()
    var  denomination = $('#denomination').val()
    var email = $('#email').val()
    var  telephone = $('#telephone').val()
    var  ville = $('#ville').val()
    var  pays = $('#pays').val()
    var  adresse = $('#adresse').val()
    var  site = $('#site').val()

    if (structure == "" || denomination == "" || email == "" || telephone == ""  || ville == "" || pays == "" || adresse == "" || site ==""){
        toastr["error"]("Veuillez remplir tous les champs")
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
        ShowLoading($('#addcustomers'))
        document.getElementById("addcustomers").disabled = true;
        $.ajax({
            url: "/customer-add",
            data : {
                structure : structure,
                  denomination : denomination,
                   email  : email,
                   telephone : telephone,
                   ville  : ville,
                   pays : pays,
                  adresse : adresse,
                  site : site
            },
            type:"post",
            success:function(msg){
                if (msg == "true"){
                    HideLoading()
                    document.getElementById("addcustomers").disabled = false;
                    document.getElementById("structure").value = "";
                    document.getElementById("denomination").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("telephone").value = "";
                    document.getElementById("ville").value = "";
                    document.getElementById("pays").value = "";
                    document.getElementById("adresse").value = "";
                    document.getElementById("site").value = "";

                    toastr["success"]("Client assigné avec succes")
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
                        $('#example1').load(document.URL + '#body  tr')
                        $('#customerBox').load(document.URL + '#customerBox  #customerBox')
                        $('#tableBox').load(document.URL + '#tableBox  #tableBox')
                       $('#addcustomer_dismiss').click()
                }
                  if (msg == 'exist'){
                      document.getElementById("addcustomers").disabled = false;
                      toastr["error"]("Ce client existe dejà")
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
                if (msg == 'false') {
                    HideLoading()
                    document.getElementById("addcustomers").disabled = false;
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
                document.getElementById("addcustomers").disabled = false;
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

function delecustomer(id){

    let url = "/delete-customer/"

    Swal.fire({
        title:"Êtes vous sûre?",
        text:"Cette action est iréversible!",
        type:"warning",
        showCancelButton:!0,
        confirmButtonText:"Supprimer",
        cancelButtonText:"Annuler",
        confirmButtonClass:"btn btn-success mt-2",
        cancelButtonClass:"btn btn-danger ml-2 mt-2",
        buttonsStyling:!1
    }).then(function(t){
        t.value?$.ajax({
            url: url+id,
            type:"get",
            success:function(msg){
                $('#example1').load(document.URL + '#body  tr')
                if (msg == "true"){
                    Swal.fire({
                        title:"Deleted!",
                        text:"Le Client a été supprimer avec succes",
                        type:"success"
                    })
                    $('#example1').load(document.URL + '#body  tr')
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Le client n'as pas pu être supprimer",
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
            {title:"Cancelled",text:"Client non supprimer",type:"error"})
    })
}


function uploadprofilpic(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#profile_picture').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);

        let file = input.files[0]
        let formdata = new FormData()
        formdata.append('file' , file)
        console.log(formdata)

     sendFile(formdata, "/account-profil-picture")

    }
}

function sendFile(data, url){
    $.ajax({
        url: url,
        type: 'POST',
        contentType: false,
        processData: false,
        data: data,
        dataType: 'json',
        success:function(msg){
            toastr["success"]("Profil modifier avec succes")
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-bottom-right",
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
            $('#page-header-user-dropdown').load(document.URL + '#iconprofiluser  #iconprofiluser')
        }
    });
}

$('#verroupassbtn').on('click',function (e) {
    var url = "/ecran-de-verouillage"
   e.preventDefault()
    var password = $('#verroupass').val()
  if (password == ""){
      toastr["error"]("Veuillez saisir votre mot de passe")
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
      ShowLoading($('#verroupassbtn'))
      document.getElementById('verroupassbtn').disabled = true

      $.ajax({
          url: url,
          data : {
              password : password,
          },
          type:"post",
          success:function(msg){
              if (msg == "true"){
                  HideLoading()
                 window.location.href = '/dashboard'
              }
              if (msg == 'false') {
                  HideLoading()
                  document.getElementById("verroupassbtn").disabled = false;
                  toastr["error"]("Mot de passe Incorrect")
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
              document.getElementById("verroupassbtn").disabled = false;
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

function otrAction(id,type){
    let text
    let warning
    let confbtn
    let url = "/partenaire-action"
    let successmessage

    if (type == 1){
        warning = "success"
        text = "Actif auprès de l'OTR!"
        confbtn = "Validé"
        successmessage = "Partenaire activé avec succes"
    }

    if (type == 2){
        warning = "warning"
        text = "Cette action est iréversible!"
        confbtn = "Validé"
        successmessage = "Partenaire désactivé avec succes"

    }

    if (type == 3){
        warning = "warning"
        text = "Cette action est iréversible!"
        confbtn = "Supprimer"
        successmessage = "Partenaire supprimer avec succes"

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
                    $('#example1').load(document.URL + '#body  tr')
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

function addpartenaire(){
    var structure = $('#structure').val()
    var  denomination = $('#denomination').val()
    var email = $('#email').val()
    var  titre = $('#titre').val()
    var  secteur = $('#secteur').val()

    if (structure == "" || denomination == "" || email == "" || titre == ""  || secteur == ""){
    emptyInputs()
    } else{
        ShowLoading($('#addpartenaire'))
        document.getElementById("addpartenaire").disabled = true;
        $.ajax({
            url: "/partenaire-add",
            data : {
                structure : structure,
                denomination : denomination,
                email  : email,
                titre : titre,
                secteur  : secteur,
            },
            type:"post",
            success:function(msg){
                HideLoading()
                document.getElementById("addpartenaire").disabled = false;
                if (msg == "true"){
                    document.getElementById("structure").value = "";
                    document.getElementById("denomination").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("titre").value = "";
                    document.getElementById("secteur").value = "";

                     successAddToast("Partenaire");
                    $('#example1').load(document.URL + '#body  tr')
                   $('#partenaireBox').load(document.URL + '#partenaireBox  #partenaireBox')
                    $('#emptypartnaire').hide()
                    $('#addpartenaire_dismiss').click()
                }
                if (msg == 'exist'){
                    toastr["error"]("Ce Partenaire existe dejà")
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
                if (msg == 'false') {
                    internalerrormessage()
                }
            },
            error:function() {
                HideLoading()
                internalerrormessage()
            }
        })
    }

}

function editCustomer(structure,name,email,tel,ville,pays,address,site,id) {
    document.getElementById("structure").value = structure
    $('#denomination').val(name)
     $('#email').val(email)
    $('#telephone').val(tel)
    $('#ville').val(ville)
   $('#pays').val(pays)
    $('#adresse').val(address)
   $('#site').val(site)
   $('#customerId').val(id)
    $('#updatecustomer').show()
    $('#addcustomers').hide()

    $('.bs-example-modal-center').modal()
}

function Updatecustomer(){
    var structure = $('#structure').val()
    var  denomination = $('#denomination').val()
    var email = $('#email').val()
    var  telephone = $('#telephone').val()
    var  ville = $('#ville').val()
    var  pays = $('#pays').val()
    var  adresse = $('#adresse').val()
    var  site = $('#site').val()
    var  customerId = $('#customerId').val()

    if (structure == "" || denomination == "" || email == "" || telephone == ""  || ville == "" || pays == "" || adresse == "" || site ==""){
        toastr["error"]("Veuillez remplir tous les champs")
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

        console.log(customerId)
        ShowLoading($('#updatecustomer'))
        document.getElementById("updatecustomer").disabled = true;
        $.ajax({
            url: "/customer-update",
            data : {
                id : customerId,
                structure : structure,
                denomination : denomination,
                email  : email,
                telephone : telephone,
                ville  : ville,
                pays : pays,
                adresse : adresse,
                site : site
            },
            type:"post",
            success:function(msg){
                HideLoading()
                if (msg == "true"){
                    document.getElementById("updatecustomer").disabled = false;
                    document.getElementById("structure").value = "";
                    document.getElementById("denomination").value = "";
                    document.getElementById("email").value = "";
                    document.getElementById("telephone").value = "";
                    document.getElementById("ville").value = "";
                    document.getElementById("pays").value = "";
                    document.getElementById("adresse").value = "";
                    document.getElementById("site").value = "";

                    toastr["success"]("Client modifié avec succes")
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
                    $('#example1').load(document.URL + '#body  tr')
                    $('#customerBox').load(document.URL + '#customerBox  #customerBox')
                    $('#tableBox').load(document.URL + '#tableBox  #tableBox')
                    $('#addcustomer_dismiss').click()
                }
               else if (msg == 'false') {
                    HideLoading()
                    document.getElementById("updatecustomer").disabled = false;
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
                document.getElementById("updatecustomer").disabled = false;
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












