$('#domainchecker').on('click',function (e) {
    e.preventDefault()

    let domainName = $('#domainName').val()
    if (domainName == ""){
        toastr["error"]("Veuillez saisir le nom de domaine")
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

        ShowLoading($('#domainchecker'))
        document.getElementById("domainchecker").disabled = true;

        $.ajax({
            url: '/domain/whois/ask',
            data:{
                whois : domainName,
            },
            type:"post",
            success:function(msg){
                HideLoading()
                $('#cardResultat').show('slow').delay(1000)
                $('#resultat').html(msg)
                document.getElementById("domainchecker").disabled = false;
            },
            error:function() {
                HideLoading()
                $('#cardResultat').show('slow').delay(1000)
                document.getElementById("domainchecker").disabled = false;
                $('#resultat').html(setAlert("Une erreur est survenue", "error"))
            }
        })
    }

})

function dumpdatabase(){

    let url = "/dump-database"
    ShowLoading($('#dump_database'))
    $.ajax({
        url: url,
        type:"get",
        success:function(msg){
            HideLoading()
            document.getElementById("dump_database").disabled = false;
            if (msg == "true"){
                toastr["success"]("Base de donnée creer avec succes")
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
            } else{
                toastr["error"]("La base de donnée existe déjà")
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
            document.getElementById("dump_database").disabled = false;
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

function downloaddatabase(hash_key){
    let url = "/download-database/"
    let img = "<img  src='/assets/images/loading.gif'  style='width: 15px;' />"
    $('#downloaddata').html(img)

    $.ajax({
        url: url+hash_key,
        type:"get",
        success:function(msg){
            $('#downloaddata').html("<i class=\"mdi mdi-download font-size-16 text-success mr-1\"></i>")
            window.location= msg
            $('#example1').load(document.URL + '#body  tr')
        },
        error:function() {
            $('#downloaddata').html("<i class=\"mdi mdi-download font-size-16 text-success mr-1\"></i>")
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

function deledatabase(hash_key){

    let url = "/delete-database/"

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
            url: url+hash_key,
            type:"get",
            success:function(msg){
                $('#example1').load(document.URL + '#body  tr')
                if (msg == "true"){
                    Swal.fire({
                        title:"Deleted!",
                        text:"Le fichier a été supprimer avec succes",
                        type:"success"
                    })
                    $('#example1').load(document.URL + '#body  tr')
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Le ficher n'as pas pu être supprimer",
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
            {title:"Cancelled",text:"Fichier non supprimer",type:"error"})
    })
}

function showftp(value){
    if (parseInt(value) != 0 ){
        $('#tableftp').show("slow").delay(2000)
        $('#addftp').hide("slow").delay(2000)
        getcontent(value)
    }else{
        $('#tableftp').hide("slow").delay(2000)
        $('#addftp').show("slow").delay(2000)
    }
}

function getcontent(value){
    var url = "/server-get-ftp-"
    $('#ftpcontent').html(' ')
    $.ajax({
        url: url+value,
        type:"get",
        success:function(msg){
            var content = JSON.parse(msg)
            for (var i = 0; i < content.length; i++){
                $('#ftpcontent').append("  <tr>\n" +
                    "                            <th scope=\"row\">"+content[i].host+"</th>\n" +
                    "                            <td>"+content[i].user+"</td>\n" +
                    "                            <td><a style='display: none' id='hidepasswordftp_"+content[i].id_ftp+"' >"+content[i].password+"</a><a href='javascript:;' id='fnhide_"+content[i].id_ftp+"' onclick=\"hidepasswordftp("+content[i].id_ftp+")\">afficher <i class='mdi mdi-eye'></i></a></td>\n" +
                    "                            <td>"+content[i].port+"</td>\n" +
                    "                        </tr>")
            }
            },
        error:function() {
        }
    })
}

function hidepasswordftp(id){
    $('#hidepasswordftp_'+id).show("slow").delay(2000)
    $('#fnhide_'+id).hide("slow").delay(2000)
}

function showdb(value){
    if (parseInt(value) != 0 ){
        $('#tabledb').show("slow").delay(2000)
        $('#adddb').hide("slow").delay(2000)
        getcontentdb(value)
    }else{
        $('#tabledb').hide("slow").delay(2000)
        $('#adddb').show("slow").delay(2000)
    }
}

function getcontentdb(value){
    var url = "/server-get-db-"
    $('#dbcontent').html(' ')
    $.ajax({
        url: url+value,
        type:"get",
        success:function(msg){
            var content = JSON.parse(msg)
            for (var i = 0; i < content.length; i++){
                $('#dbcontent').append("  <tr>\n" +
                    "                            <th scope=\"row\">"+content[i].dbname+"</th>\n" +
                    "                            <td>"+content[i].db_user+"</td>\n" +
                    "                            <td><a style='display: none' id='hidepasswordftp_"+content[i].id_db+"' >"+content[i].db_password+"</a><a href='javascript:;' id='fnhide_"+content[i].id_db+"' onclick=\"hidepasswordftp("+content[i].id_db+")\">afficher <i class='mdi mdi-eye'></i></a></td>\n" +
                    "                        </tr>")
            }
        },
        error:function() {
        }
    })
}

function deleteserver(id) {
    let url = "/delete-server-"
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
                        text:"Info server supprimer avec succes",
                        type:"success"
                    })
                    $('#datatable').load(document.URL + '#body  tr')
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Info server n'a pas pu être supprimer",
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



