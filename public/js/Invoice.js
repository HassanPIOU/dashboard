let sub = $('#subtotalitem')
sub.html(0)
let price = 0
let qty = 0
let devise = ""
let subprice

function onpriceChange(){
   price = $('#priceitem').val()
   qty = $('#itemQte').val()
  devise = $('#deviseitem').val()
    let subcalc = parseFloat(price) * parseInt(qty)
     subprice = add_commas(subcalc)
  console.log(subprice)
    if (devise == null){
        devise = ""
    }

    if (isNaN(subprice)){
        subprice = 0
    }
    sub.html(subprice+" "+devise)
}

function addinvitem() {
    let url = "/invoice-item-add"
    let item = $('#itemName').val()
    let hash = $('#invhash').val()
    if (subprice == 0 || item == ""){
       emptyInputs()
    }else{
        ShowLoading($('#addinvitem'))
        $.ajax({
            url : url,
            type : "POST",
            data : {
                  item : item,
                price : subprice,
                devise : devise,
                 qty : qty,
                hash : hash
            },
            success:function (msg) {
                $('#itemName').val("")
                $('#priceitem').val("")
                $('#itemQte').val("")
                $('#deviseitem').val("")

                if (msg == "true"){
                    $('#addcinvitem_dismiss').click()
                    HideLoading()
                  successAddToast("Produit")
                 setTimeout(function () {
                     window.location.reload()
                 },2000)

                }else{
                    internalerrormessage()
                }
            }
            })
    }
}

function addinvoice(){
    let statut
  let paystatus = document.getElementById("paystatus")
  let invmodality = document.getElementById("invmodality").value
  let invmethod = document.getElementById("invmethod").value
  let invcustomer = document.getElementById("invcustomer").value
  let invduedate = document.getElementById("invduedate").value
  let invshipping = document.getElementById("invshipping").value
    if (paystatus.checked == true){
       statut = 2
    }else{
        statut = 1
    }

    if (invcustomer == "0" || invmethod == "0" || invmodality == "0" || invduedate ==""|| invshipping ==""){
    emptyInputs()
    }else{
        ShowLoading($('#addinv'))
        $.ajax({
            url : "/invoice-add",
            type : "POST",
            data : {
                paystatus : statut,
                modality : invmodality,
                method : invmethod,
                customer : invcustomer,
                duedate : invduedate,
                invshipping : invshipping
            },
            success:function (msg) {
                $('#invduedate').val("")
                if (msg == "true"){
                    $('#addinv_dismiss').click()
                    HideLoading()
                  successAddToast("Facture")
                    $('#invtable').load(document.URL + "#invtablebody   #invtablebody")

                    $('#invoiceBox').load(document.URL + "#invoiceBox   .fac")
                    $('#invoiceBox2').load(document.URL + "#invoiceBox2   #invoiceBox2")

                }else{
                  internalerrormessage()
                }
            }
        })
    }


}


