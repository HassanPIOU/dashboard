$('#connectoftp').on('click',function (e) {
    e.preventDefault()

    let url = "/server-ftp-connect"
    var host = $('#hostftp').val()
    var user = $('#userftp').val()
    var password = $('#passftp').val()

    if (host == "" || user == "" || password == ""){
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
        $('#ftppanel').show('slow').delay(1000)
        $('#loadbeforeftp').show('slow').delay(1000)
        document.getElementById("connectoftp").disabled = true;
        $.ajax({
            url: url,
            data:{
               host : host,
               user : user,
               password : password
            },
            type:"post",
            success:function(msg){
                $('#loadbeforeftp').hide('slow').delay(1000)
                document.getElementById("connectoftp").disabled = false;
                if (msg == "false"){
                    toastr["error"]("Impossible de se connecter au server FTP")
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
                  let content = JSON.parse(msg)
                    console.log(content)
                    for (let i = 0;i < content.length; i++){
                      seticononfile(content[i].isDir,content[i].name)
                    }

                }
            },
            error:function() {
                document.getElementById("connectoftp").disabled = false;
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


function  seticononfile(value,name){
    if (value == false){
        $('#contentftp').append("<div class=\"col-lg-2\" >\n" +
            "                            <div  style=\"background-color: #F1F5F8;padding: 10px;border-radius: 6px;margin-top: 10px;\">\n" +
            "                                <img  src='/ftp/file.png' style=\"position: relative;left: 50%;transform: translateX(-50%);width: 125px;\" />\n" +
            "                   <i class='bx bx-dots-vertical-rounded' style='position: absolute; right: 20px;top: 20px;cursor:pointer;'></i>          " +
            "   <p style=\"text-align: center;margin-top: -15px;\">"+name+"</p>\n" +
            "                            </div>\n" +
            "                        </div>")
    } else{
        $('#contentftp').append("<div class=\"col-lg-2\" >\n" +
            "                            <div  style=\"background-color: #F1F5F8;border-radius: 6px;padding: 10px;margin-top: 10px;\">\n" +
            "                               <a href=''><img  src='/ftp/folder.png' style=\"position: relative;left: 50%;transform: translateX(-50%);width: 125px;\" /></a>\n" +
            "                   <i class='bx bx-dots-vertical-rounded' style='position: absolute; right: 20px;top: 20px;cursor:pointer;'></i>               <p style=\"text-align: center;margin-top: -15px;\">"+name+"</p>\n" +
            "                            </div>\n" +
            "                        </div>")
    }
}