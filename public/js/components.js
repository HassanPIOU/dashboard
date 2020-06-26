let devises = $('#setdevide').val()
$('.packageprice').click()
$('#firsttotal').click()
$('#subtotalitemo').click()
$('#shipping').click()
function setSubtotal(v){
    if (devises == undefined){
        devises = ""
    }
    let final_price = add_commas(v)
    $('#subtotalitemo').html(final_price+" <small><small>"+devises+"</small></small>")
}
function setShippingprice(v){
    if (devises == undefined){
        devises = ""
    }
    let final_price = add_commas(v)
    $('#shipping').html(final_price+" <small><small>"+devises+"</small></small>")
}
function setTotal(v){
    if (devises == undefined){
        devises = ""
    }
    let final_price = add_commas(v)
    $('#firsttotal').html(final_price+" <small><small>"+devises+"</small></small>")
    $('#secondtotal').html(final_price+" <small><small>"+devises+"</small></small>")
}
function setcommas(v,k){
    let final_price = add_commas(v)
    $('#showpackageprice_'+k).html(final_price+"<small> <small>(F CFA)</small></small>")

}
function setAlert(value,type){
    if (type == "success"){
        return "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">\n" +
            "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "    <span aria-hidden=\"true\">&times;</span>\n" +
            "  </button>\n" +
            "  <strong>"+value+"</strong>" +
            "</div>"
    } else{
        return "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
            "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
            "    <span aria-hidden=\"true\">&times;</span>\n" +
            "  </button>\n" +
            "  <strong>"+value+"</strong>" +
            "</div>"
    }
}
function ShowLoading(buttonid){
    let img = "<img  src='/assets/images/loader.svg' id='loadimg' style='padding-left: 20px; width: 40px;' />"
    return buttonid.append(img)
}
function HideLoading(){
    return $('#loadimg').remove()
}
function setError(value){
    return "<small style='color: #b02e2f;'>"+value+"</small>"
}
function removeEror(id){
    return id.hide()
}
function add_commas(number) {
    if (number.length > 3) {
        var mod = number.length % 3;
        var output = (mod > 0 ? (number.substring(0,mod)) : '');
        for (i=0 ; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0)) {
                output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
            } else {
                output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
        }
        return (output);
    } else {
        return number;
    }
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
function emptyInputs(){
    toastr["warning"]("Veuillez remplir tous les champs")
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
 function successAddToast(name){
     toastr["success"](name+"  Ajouter avec succes")
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
 function internalerrormessage() {
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
function successUpdateToast(name){
    toastr["success"](name+"  Modifier avec succes")
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


