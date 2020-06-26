function addprojet(){
    var name = $('#projectname').val()
    var budget = $('#projectbudget').val()
    var description = $('#projectdesc').val()
   var start =  $('#start').val()
   var end =  $('#end').val()
    var haskey = $('#hashvalue').val()
     var url = "/projet-add"
     if (name == ""){
         toastr["error"]("Veuillez saisir le nom du projet")
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
     if (budget == ""){
         toastr["error"]("Veuillez saisir  le montant du budget")
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
     if (description == ""){
         toastr["error"]("Veuillez saisir une description")
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
     if (start == ""){
         toastr["error"]("Veuillez définir la date de début")
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
     if (end == ""){
         toastr["error"]("Veuillez définir la date de fin")
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


     if (name != "" && budget != "" && description != "" && start != "" && end != ""){
         ShowLoading($('#projetaddbtn'))
         document.getElementById("projetaddbtn").disabled = true;
         $.ajax({
             url: url,
             data : {
               name : name,
               budget : budget,
                 description :  description,
                 start :  formatDate(start),
                 end :  formatDate(end),
                 haskey : haskey
             },
             type:"post",
             success:function(msg){
                 HideLoading()
                 document.getElementById("projetaddbtn").disabled = false;
                 toastr["success"]("Projet creer avec succes")
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
                  $('#projectname').val(" ")
                  $('#projectbudget').val(" ")
                  $('#projectdesc').val(" ")
                  $('#start').val(" ")
                  $('#end').val(" ")
                  $('#projetaddfiles').val(" ")
             },
             error:function() {
                 HideLoading()
                 document.getElementById("projetaddbtn").disabled = false;
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
 function projetmodal(value){
     $("#largeModal").modal()
     $('#projetId').val(value)
 }


let team = []

let defteam = []

function team_add(value){
        team.push({
            user_id : value
        })
$('#team_add_'+value).fadeOut("slow")
    console.log(team)
}

function team_remove(value){

    defteam = team
    team = []
    for (let i = 0; i < defteam.length; i++) {
        if (defteam[i].user_id != value){
            team.push({user_id : defteam[i].user_id});
        }
    }
    $('#team_add_'+value).fadeIn("slow")
    console.log(team)
}

function  createteambtn() {
    ShowLoading($('#createteambtn'))
    var projet_id = $('#projetId').val()

    document.getElementById("createteambtn").disabled = true;
    $.ajax({
        url: "/projet-add-team",
        data : {
            projet_id : projet_id,
            team : team
        },
        type:"post",
        success:function(msg){
         if (msg == "true"){
             HideLoading()
             document.getElementById("createteambtn").disabled = false;
             $('#modal_dismiss').click()
             $('#largeModal').hide()
             toastr["success"]("equipe creer avec succes")
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
             $('#example1').load(document.URL + '#body  .tasktr')
             $('#emptyteam').hide()

         } else{
             HideLoading()
             document.getElementById("createteambtn").disabled = false;
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
            document.getElementById("createteambtn").disabled = false;
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

function addtaskonprojet(){
    var projet_id = $('#projetIdtask').val()
    var user_id = $('#userIdtask').val()
    var modaltask = $('#modaltask').val()

    if (modaltask == ""){
        toastr["error"]("Veuillez saisir le nom de la tache")
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
        ShowLoading($('#createtaskforuser'))

        document.getElementById("createtaskforuser").disabled = true;
        $.ajax({
            url: "/projet-add-task",
            data : {
                projet_id : projet_id,
                user_id : user_id,
                modaltask : modaltask,
            },
            type:"post",
            success:function(msg){
                if (msg == "true"){
                    HideLoading()
                    document.getElementById("createtaskforuser").disabled = false;
                    document.getElementById("modaltask").value = "";
                    $('#taskmodal_dismiss').click()
                    toastr["success"]("tache assignée avec succes")
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
                    setTimeout(function(){
                        $('#example1').load(document.URL + '#bodytask  .tasktr')
                    }, 1000);

                } else{
                    HideLoading()
                    document.getElementById("createtaskforuser").disabled = false;
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
                document.getElementById("createteambtn").disabled = false;
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

function addids(projetid,userid){
  document.getElementById('projetIdtask').value = projetid
  document.getElementById('userIdtask').value =   userid
}

function deletetaskteam(userid,task){
    var url = "/projet-team-task-delete-"
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
            url: url+userid+'-'+task,
            type:"get",
            success:function(msg){
                $('#example1').load(document.URL + '#body  .tasktr')
                if (msg == "true"){
                    Swal.fire({
                        title:"Deleted!",
                        text:"Le Tag a été supprimer avec succes",
                        type:"success"
                    })
                    $('#example1').load(document.URL + '#body  .tasktr')
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Le Tag n'a pas pu être supprimer",
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
            {title:"Cancelled",text:"Tâche non supprimer",type:"error"})
    })
}

function addondetailfile(){
    var url = "/projet-add-file"
    var file = document.getElementById('projetaddfilesdetail').files[0];
    var hash = document.getElementById('hashfileadd').value;
    var projetidfileadd = document.getElementById('projetidfileadd').value;
    var formdata = new FormData()
    formdata.append('fichier', file)
    formdata.append('hash_key', hash)
    formdata.append('projet_id', projetidfileadd)

    if (file == undefined){
        toastr["error"]("Veuillez ajouter un fichier")
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
        ShowLoading($('#addfilewhendetail'))
        $.ajax({
            url: url,
            data: formdata,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (msg) {
                if (msg == "true"){
                    HideLoading()
                    toastr["success"]("fichier ajouter avec succes")
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
                    $('#example2').load(document.URL + '#bodyfiles  .trfiles')
                }
            }
        });
    }

}


$('#addcustomerbtntoshow').on('click',function (e) {
    e.preventDefault()
     $('#selectcustomertoprojet').show('slow').delay(1000)
     $('#addcustomerbtntoshow').hide('slow').delay(1000)
})

function addcustomertoprojet(value,projet_id){
     $('#loadimgcustomer').show()
    document.getElementById('selectcustomertoprojet').disabled = true

    $.ajax({
        url: '/projet-assign-customer',
        data: {
            projet_id : projet_id,
            customer : value,
        },
        type: 'POST',
        success: function (msg) {
            if (msg == "true"){
                $('#loadimgcustomer').hide()
                document.getElementById('selectcustomertoprojet').disabled = false
                toastr["success"]("Client assigner avec succes")
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
                $('#customercarddetail').load(document.URL + '#customercarddetail  #customercarddetail')
            }
        }
    });
}

function actionprojet(value,action){
    if (parseInt(action) == 2){
        $('#startprojetbtn').html("<img  src='/assets/images/loader.svg'  style='width: 15px;' />")
    }

    if (parseInt(action) == 3){
        $('#stopprojetbtn').html("<img  src='/assets/images/loader.svg'  style='width: 15px;' />")
    }
    $.ajax({
        url: '/projet-start-'+value+"-"+action,
        type: 'get',
        success: function (msg) {
            if (msg == "true"){
                toastr["success"]("Opération reussit avec succes")
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
            }
        }
    });

}


function deleteprojet(id){

    let url = "/delete-projet/"

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
                $('#example1').load(document.URL + '#bodylist  tr')
                if (msg == "true"){
                    Swal.fire({
                        title:"Deleted!",
                        text:"Le projet a été supprimer avec succes",
                        type:"success"
                    })
                    $('#example1').load(document.URL + '#body  tr')
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Le projet n'as pas pu être supprimer",
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
            {title:"Cancelled",text:"projet non supprimer",type:"error"})
    })
}
