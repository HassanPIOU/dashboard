function getfacebookCount() {
     $('#facebook_like').html("0")
    var page_id = "2264803553830483"
    var accesstoken = "EAADnJicyLhgBAP7DtZC46tTWfBpeZAq8Lo15trgLZBohsyPAq15jsQeRayUpF8RG1p5lSjDssLYFfm3Cq7tPqulOZAXER0nxWieq4PgHXySh6KW1UYtTeLg1FG8ZAXqEICTdoFj3t8SPHZBFHO9uLv8HuLwaftwU5UJ45tJDadiQZDZD"
    $.getJSON('https://graph.facebook.com/'+page_id+'?fields=name,fan_count&access_token='+accesstoken, function(data) {
        $('#facebook_like').html(add_commas(data.fan_count))
    });
    getsmsaccountbalance()

}

function getsmsaccountbalance() {
    $('#smsaccountbalance').html(0)
    var token = "wFZyEerY3Dk-Mki5msSFB21Kief0MH4F"
    $.getJSON("http://www.wassasms.com/wassasms/api/web/v3/sends/get_solde?access-token="+token, function(data) {
        $('#smsaccountbalance').html(add_commas(data))
    });


}




function deleteSocial(id){
    let url = "/delete-social-"

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
                        text:"Le reseau social a été supprimer avec succes",
                        type:"success"
                    })
                    $('#apidatatable').load(document.URL + '#body  tr')
                }
                else{
                    Swal.fire({
                        title:"Cancelled",
                        text:"Le reseau social n'as pas pu être supprimer",
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
            {title:"Cancelled",text:"Réseau social non supprimer",type:"error"})
    })
}

function createsocial(type,id) {
  let reseau =  $('#reseau').val()
  let identifiant = $('#identifiant').val()
  let password =  $('#password').val()
    if (reseau == "" || identifiant == "" || password == "" ){
      emptyInputs()
    }else{
        ShowLoading($('#createsocial'))
        document.getElementById('createsocial').disabled = true
        $.ajax({
            url: '/reseau-create',
            data: {
                type : type,
                id : id,
                reseau : reseau,
                username : identifiant,
                password : password,
            },
            type: 'POST',
            success: function (msg) {
                document.getElementById('createsocial').disabled = false
                HideLoading()
                if (msg == "true"){
                    $('#reseau').val("")
                    $('#identifiant').val("")
                    $('#password').val("")
                    $('#apidatatable').load(document.URL+"#body tr")
                    $('#createsocial_dismiss').click()
                    successAddToast("Réseau social")
                }
                else if (msg == "true2"){
                    $('#reseau').val("")
                    $('#identifiant').val("")
                    $('#password').val("")
                    $('#apidatatable').load(document.URL+"#body tr")
                    $('#createsocial_dismiss').click()
                     successUpdateToast("Réseau social")
                }
                else{
                    internalerrormessage()
                }
            }
        });
    }

}

function updateSocial(reseau,username,password,id){
    $('#reseau').val(reseau)
   $('#identifiant').val(username)
    $('#password').val(password)
    $('#typevalue').val(2)
    $('#idreseau').val(id)

    $('.bs-example-modal-xl').modal()
}




















