$('#loginsubmit').on('click',function (e) {
    e.preventDefault();

   let username = $('#username').val() 
   let password = $('#userpassword').val()

    if (username == ""){
        $('#errorusername').html(setError("L'identifiant ne peu pas être vide"))
    }

    if (password == ""){
        $('#errorpassword').html(setError("Le mot de passe ne peut pas être vide"))
    }


    if ($('#username').val() != "" && $('#userpassword').val() != ""){

       removeEror($('#errorusername'))
       removeEror($('#errorpassword'))
        ShowLoading($('#loginsubmit'))

        document.getElementById("loginsubmit").disabled = true;

        $.ajax({
            url: '',
            data:{
                username : username,
                password : password,
            },
            type:"post",
            success:function(msg){
                HideLoading()
                document.getElementById("loginsubmit").disabled = false;
                if (msg == 'true'){
                    window.location.href = $('form').attr("action")
                }else{
                    HideLoading()
                    $('#resultat').html(setAlert(msg, "error"))
                }


            },
            error:function() {
                $('#resultat').html(setAlert("Une erreur est survenue", "error"))
            }
        })
    }


})