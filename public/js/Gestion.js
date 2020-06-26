// var options = {
//     valueNames: [ 'name', 'category' ],
//     page: 10,
//     pagination: true
// };
//
// var listObj = new List('message-list', options);


function showaddpkitem(id){
    $('.additempk_'+id).show('slow').delay(1000)
}

function hideaddpkitem(id){
    $('.additempk_'+id).hide('slow').delay(1000)
}

function submitpkitem(id){
    let item = $('.item_pk_'+id).val()
    if (item == ""){

    } else{
        let img = "<img  src='/assets/images/loader.svg' id='loadimg' style='padding-left: 20px; width: 40px;' />"
        $('.submissionbtn'+id).html(img)
        $.ajax({
            url: '/package-add-item',
            data: {
                id : id,
                item : item,
            },
            type: 'POST',
            success: function (msg) {
                if (msg == "true"){
                    $('#hideitemview'+id).click()
                    toastr["success"]("Item Ajouter avec succes")
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
                    setTimeout(function () {
                      window.location.reload()
                    }, 1000)
                }
                else{
                    $('#hideitemview'+id).click()
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
}

function deletepkItem(id){
    var url = "/package-item-delete-"
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
                if (msg == "true"){
                    Swal.fire({
                        title:"Deleted!",
                        text:"L'item a été supprimer avec succes",
                        type:"success"
                    })
                    setTimeout(function () {
                        window.location.reload()
                    }, 2000)
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"L'item n'a pas été  supprimé",
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
            {title:"Cancelled",text:"Item non supprimer",type:"error"})
    })
}

function deletePackage(id){
    var url = "/package-delete-"
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
                if (msg == "true"){
                    Swal.fire({
                        title:"Deleted!",
                        text:"Package supprimer avec succes",
                        type:"success"
                    })
                    setTimeout(function () {
                        window.location.reload()
                    }, 2000)
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Le Package n'a pas été  supprimé",
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
            {title:"Cancelled",text:"Package non supprimer",type:"error"})
    })
}

function addpackage(){
    let titre = $('#titre').val()
    let amount = $('#amount').val()
    let desc = $('#description').val()
    let icon = $('#icon').val()


    if (titre == "" || amount == "" || desc == "" || icon == null){
       emptyInputs()
    }else{
        ShowLoading($('#addpackage'))
        document.getElementById("addpackage").disabled = true
        $.ajax({
            url: '/add-package',
            data: {
                title : titre,
                amount : amount,
                desc : desc,
                icon : icon
            },
            type: 'POST',
            success:function(msg) {
                HideLoading()
                document.getElementById("addpackage").disabled = false
                if (msg =="true"){
                    $('#addpackage_dismiss').click()
                     successAddToast("Package")
                    setTimeout(function () {
                        window.location.reload()
                    },2000)
                }
                else{
                    internalerrormessage()
                }
            }
        });
    }
}

function updatePackage(id){


    $.ajax({
        url: '/package-get-to-update-'+id,
        type: 'GET',
        success:function(msg) {
             let content = JSON.parse(msg)
             $('#titre').val(content.name)
            $('#amount').val(content.price)
            $('#description').val(content.desc)
            $('#icon').val(content.icon)
            $('#updatepackage').show()
            $('#addpackage').hide()
            $('#packageId').val(id)
            $('#myExtraLargeModalLabel').html("Modifier "+content.name)
            $('.bs-example-modal-xl').modal()
        }
    });

}

function updatepackagesub(){
    let titre = $('#titre').val()
    let amount = $('#amount').val()
    let desc = $('#description').val()
    let icon = $('#icon').val()
    let id =  $('#packageId').val()

    if (titre == "" || amount == "" || desc == "" || icon == null){
        emptyInputs()
    }else{
        ShowLoading($('#updatepackage'))
        document.getElementById("updatepackage").disabled = true
        $.ajax({
            url: '/update-package',
            data: {
                id : id,
                title : titre,
                amount : amount,
                desc : desc,
                icon : icon
            },
            type: 'POST',
            success:function(msg) {
                HideLoading()
                document.getElementById("updatepackage").disabled = false
                if (msg =="true"){
                    $('#addpackage_dismiss').click()
                     successUpdateToast("Package")
                    setTimeout(function () {
                        window.location.reload()
                    },2000)
                }
                else{
                    internalerrormessage()
                }
            }
        });
    }
}


$('.tab-link').click( function() {

    var tabID = $(this).attr('data-tab');

    $(this).addClass('active').siblings().removeClass('active');

    $('#tab-'+tabID).addClass('active').siblings().removeClass('active');
});





// Portfolio

function usemyUserinfotoportfolio(){
    ShowLoading($('#usemyUserinfotoportfolio'))
    document.getElementById("usemyUserinfotoportfolio").disabled = true
    $.ajax({
        url: '/add-about-info',
        type: 'GET',
        success: function (msg) {
            HideLoading()
            document.getElementById("usemyUserinfotoportfolio").disabled = false
            if (msg == "true"){
                 successAddToast("Information")
                $('#about_portfolio_about').load(document.URL + '#about_portfolio_about  #about_portfolio_about')
            }
            else{
                internalerrormessage()
            }
        }
    });
}

function uploadaboutpic(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#aboutbgpic').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);

        let file = input.files[0]
        let formdata = new FormData()
        formdata.append('file' , file)
        console.log(formdata)

        sendAboutPic(formdata, "/portfolio-about-picture")

    }
}

function sendAboutPic(data, url){
    $.ajax({
        url: url,
        type: 'POST',
        contentType: false,
        processData: false,
        data: data,
        dataType: 'json',
        success:function(msg){
            toastr["success"]("Image modifier avec succes")
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
        }
    });
}

function updateUserInfo(id){
    let lastname = $('#lastname').val()
    let  firstname = $('#firstname').val()
    let email  = $('#email').val()
    let experience  = $('#experience').val()
    let tel  = $('#telephone').val()
    let  address = $('#address').val()
    let  langue = $('#langue').val()
    let  skype = $('#skype').val()
    let github = $('#github').val()
    let  linkedin = $('#linkedin').val()
    let  xing = $('#xing').val()
    let  freelance

    if (document.getElementById('freelance').checked == true){
        freelance = 1
    }else{
        freelance = 2
    }

    ShowLoading($('#updateUserInfo'))
    document.getElementById("updateUserInfo").disabled = true
    $.ajax({
        url: '/update-about-info',
        data : {
            id : id,
            lastname : lastname,
            firstname : firstname,
            email : email,
            telephone : tel,
            experience : experience,
            address : address,
            langue : langue,
            skype : skype,
            github : github,
            linkedin : linkedin,
            xing : xing,
            freelance : freelance,
        },
        type: 'POST',
        success: function (msg) {
            HideLoading()
            document.getElementById("updateUserInfo").disabled = false
            if (msg == "true"){
                successAddToast("Information")
                $('#about_portfolio_about').load(document.URL + '#about_portfolio_about  #about_portfolio_about')
            }
            else{
                internalerrormessage()
            }
        }
    });


}

function addeduformation(type){
   let title = $('#title'+type).val()
   let date_interval = $('#date_interval'+type).val()
   let institut = $('#institut'+type).val()
   let description = $('#description'+type).val()

    if(title == "" || date_interval == "" || institut == "" || description == ""){
       emptyInputs()
    }else{
        ShowLoading($('#addeduformation'+type))
        document.getElementById("addeduformation"+type).disabled = true
        $.ajax({
            url: '/add-about-exp-edu',
            data: {
                title : title,
                date_interval : date_interval,
                institut : institut,
                description : description,
                type : type,
            },
            type: 'POST',
            success:function(msg) {
                HideLoading()
                document.getElementById("addeduformation"+type).disabled = false
                if (msg =="true"){
                    $('#addeduformation_dismiss'+type).click()
                    successAddToast(" ")
                    $('#eduexpeskillpanel').load(document.URL + '#eduexpeskillpanel   #eduexpeskillpanel')
                }
                else{
                    internalerrormessage()
                }
            }
        });
    }
}

function updateeduform(id,type){
    $.ajax({
        url: '/portfolio-eduform-info-'+id,
        type: 'GET',
        success: function (msg) {
            let content = JSON.parse(msg)
          $('#title'+type).val(content.titre)
           $('#date_interval'+type).val(content.date_interval)
            $('#institut'+type).val(content.institut)
          $('#description'+type).val(content.description)
          $('#id_edu'+type).val(id)

            if (parseInt(type) == 1){
                $('.bs-example-modal-xl').modal()
                $('#addeduformation1').hide()
                $('#myExtraLargeModalLabelk').html("Modifier  Formation")
                $('#updateeduformation1').show()
            } else if (parseInt(type) == 2){
                $('.b-example-modal-xl').modal()
                $('#addeduformation2').hide()
                $('#myExtraLargeModalLabels').html("Modifier  Expérience")
                $('#updateeduformation2').show()
            }
        }
    });


}

function updateeduformation(type){
    let title = $('#title'+type).val()
    let date_interval = $('#date_interval'+type).val()
    let institut = $('#institut'+type).val()
    let description = $('#description'+type).val()
    let id = $('#id_edu'+type).val()

    if(title == "" || date_interval == "" || institut == "" || description == ""){
        emptyInputs()
    }else{
        ShowLoading($('#updateeduformation'+type))
        document.getElementById("updateeduformation"+type).disabled = true
        $.ajax({
            url: '/update-about-exp-edu',
            data: {
                 id : id,
                title : title,
                date_interval : date_interval,
                institut : institut,
                description : description,
            },
            type: 'POST',
            success:function(msg) {
                HideLoading()
                document.getElementById("updateeduformation"+type).disabled = false
                if (msg =="true"){
                    $('#addeduformation_dismiss'+type).click()
                    successUpdateToast(" ")
                    $('#eduexpeskillpanel').load(document.URL + '#eduexpeskillpanel   #eduexpeskillpanel')
                }
                else{
                    internalerrormessage()
                }
            }
        });
    }
}

function deleteEdForm(id){
    var url = "/porfolio-eduform-delete-"
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
                if (msg == "true"){
                    Swal.fire({
                        title:"Suppression!",
                        text:"Supprimer avec succes",
                        type:"success"
                    })
                    $('#eduexpeskillpanel').load(document.URL + '#eduexpeskillpanel   #eduexpeskillpanel')

                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"N'a pas pu être supprimer",
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
            {title:"Cancelled",text:"Non supprimer",type:"error"})
    })
}


function addskill(){
    let name = $('#skillname').val()
    let percent = $('#range_01').val()
     if (name == "",percent ==""){
       emptyInputs()
     }else{
        ShowLoading($('#addskill'))
         document.getElementById("addskill").disabled = true
         $.ajax({
             url: '/add-about-skill',
             data: {
                 name : name,
                 percent : percent,
             },
             type: 'POST',
             success:function(msg) {
                 HideLoading()
                 document.getElementById("addskill").disabled = false
                 if (msg =="true"){
                     $('#addskill_dismiss').click()
                       successAddToast("Compétence")
                     $('#eduexpeskillpanel').load(document.URL + '#eduexpeskillpanel   #eduexpeskillpanel')

                      $('#skillname').val("")
                      $('#range_01').val(10)
                 }
                 else{
                     internalerrormessage()
                 }
             }
         });
     }
}

function seemessage(id){
    $.ajax({
        url: '/see-message-'+id,
        type: 'GET',
        success:function(msg) {
            if (msg =="false"){
                internalerrormessage()
            }
            else{
                  let content = JSON.parse(msg)
                  $('#contactmessagefullname').html(content.fullname)
                  $('#contactmessageemail').html(content.email)
                  $('#contactmessagesujet').html(content.sujet)
                $('#contactmessagecontent').html(content.message)
                $('#messagecontentportfolio').load(document.URL + '#messagecontentportfolio   #messagecontentportfolio')
                $('#portfoliomessagecount').load(document.URL + '#portfoliomessagecount   #portfoliomessagecount')
            }
        }
    });
}

function deletemessageportfolio(id){
    var url = "/porfolio-message-delete-"
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
                if (msg == "true"){
                    Swal.fire({
                        title:"Suppression!",
                        text:"Le Message a été supprimer avec succes",
                        type:"success"
                    })
                    $('#messagecontentportfolio').load(document.URL + '#messagecontentportfolio   #messagecontentportfolio')
                    $('#portfoliomessagecount').load(document.URL + '#portfoliomessagecount   #portfoliomessagecount')
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Le Message n'a pas pu être supprimer",
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
            {title:"Cancelled",text:"Message non supprimer",type:"error"})
    })
}


function addportfolio(){
   let type_projet_projet = $('#type_projet_projet').val()
   let customer_portfolio = $('#customer_portfolio').val()
   let duration_portfolio = $('#duration_portfolio').val()
   let technology_used_portfolio = $('#technology_used_portfolio').val()
   let budget_portfolio = $('#budget_portfolio').val()
   let image_portfolio = document.getElementById('image_portfolio').files[0]

    let formdata = new FormData()

    formdata.append("type_projet_projet",type_projet_projet)
    formdata.append("customer_portfolio",customer_portfolio)
    formdata.append("duration_portfolio",duration_portfolio)
    formdata.append("technology_used_portfolio",technology_used_portfolio)
    formdata.append("budget_portfolio",budget_portfolio)
    formdata.append("image_portfolio",image_portfolio)

    if (type_projet_projet == "" || customer_portfolio == "" ||
        duration_portfolio == "" || technology_used_portfolio == "" ||
        budget_portfolio == "" || image_portfolio == "" )
    {
       emptyInputs()
    }
    else{
       ShowLoading($('#addportfolio'))
        document.getElementById('addportfolio').disabled = true
        $.ajax({
            url: '/add-portfolio',
            data : formdata,
            contentType: false,
            processData: false,
            dataType: 'json',
            type: 'POST',
            success:function(msg) {
                HideLoading()
                document.getElementById('addportfolio').disabled = false
                if (msg =="false"){
                    internalerrormessage()
                }
                else{
                    successAddToast("Portfolio")
                    $('#addportfolio_dismiss').click()
                    $('#portfolioporstfolio').load(document.URL + '#portfolioporstfolio   #portfolioporstfolio')
                }
            }
        });
    }

}



function portfolioblogAdd() {

    let url = "/portfolio-add-article"
    let  titre = $('#articleTitre').val()
    let tag  = $('#articleTag').val()
    let  slug = $('#articleSlug').val()
    let picture = document.getElementById('articlePicture').files[0]

    let description = $('#articleContent').val()
    let status = document.getElementById('articlePublic')
    if (status.checked == true){
        status = 1
    }else{
        status = 2
    }


    if (titre == "" || tag == "" || slug == "" || picture == undefined  || description == ""){
        emptyInputs()
    }else{
        let formData = new FormData()
        formData.append('titre',titre)
        formData.append('tag',tag)
        formData.append('slug',slug)
        formData.append('picture',picture)
        formData.append('status',status)
        formData.append('description',description)

        $.ajax({
            url: url,
            type: 'POST',
            contentType: false,
            processData: false,
            data: formData,
            dataType: 'json',
            success:function(msg){
                successAddToast("Article")
                $('#datatable').load(document.URL + "#body   tr")
                $('#portfolioblogAdd_dismiss').click()
                 $('#articleTitre').val("")
                 $('#articleTag').val("")
                  $('#articleSlug').val("")
                document.getElementById('articlePicture').files[0] = ""
                 $('#articleContent').val("")
                document.getElementById('articlePublic').checked == false
            }
        });
    }
}

function articleChange(id,type){
    let text
    let warning
    let confbtn
    let url = "/portfolio-blog"
    let successmessage

    if (type == 1){
        warning = "success"
        text = "Rendre public cette article"
        confbtn = "Validé"
        successmessage = "Article activé avec succes"
    }

    if (type == 2){
        warning = "warning"
        text = "Rendre privé cette article"
        confbtn = "Validé"
        successmessage = "Article désactivé avec succes"

    }

    if (type == 3){
        warning = "warning"
        text = "Cette action est iréversible!"
        confbtn = "Supprimer"
        successmessage = "Article supprimer avec succes"

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
                    $('#datatable').load(document.URL + "#body   tr")
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

function validetitle(){
  let title1 = $('#title1').val()
  let title2 = $('#title2').val()
  let title3 = $('#title3').val()

    ShowLoading($('#validetitle'))
    document.getElementById('validetitle').disabled = true
    $.ajax({
        url: "/portfolio-home-add-titles",
        type: 'POST',
        data: {
           title1 : title1,
           title2 : title2,
           title3 : title3,
        },
        success:function(msg){
            HideLoading()
            document.getElementById('validetitle').disabled = false

            if (msg == "true"){
                successUpdateToast("Titre")
                document.getElementById('validetitle').checked == false
            }else{
               internalerrormessage()
            }
        }
    });
    
}

function setDescription(){
    let description = $('#descriptionHome').val()
    ShowLoading($('#setDescription'))
    document.getElementById('setDescription').disabled = true
    $.ajax({
        url: "/portfolio-home-add-description",
        type: 'POST',
        data: {
            description : description,

        },
        success:function(msg){
            HideLoading()
            document.getElementById('setDescription').disabled = false

            if (msg == "true"){
                successUpdateToast("Description")
                 document.getElementById('setDescription').checked == false
            }else{
                internalerrormessage()
            }
        }
    });
}


