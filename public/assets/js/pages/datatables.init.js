$(document).ready(function(){$("#datatable").DataTable({
    "lengthChange": false,
    "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
    }
}),
    $("#apidatatable").DataTable({
        "lengthChange": false,
         "paging" : false,
        "info":     false,
        "searching" : true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    })
    , $("#trans_datatable").DataTable({
        "lengthChange": false,
         "paging" : false,
        "info":     false,
        "searching" : true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    })
    , $("#depot_datatable").DataTable({
        "lengthChange": false,
         "paging" : false,
        "info":     false,
        "searching" : true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    })
    ,
    $("#authdatatable").DataTable({
        "lengthChange": false,
         "paging" : false,
        "info":     false,
        "searching" : false,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    })

    $("#budget_datatable").DataTable({
        "lengthChange": false,
         "paging" : false,
        "info":     false,
        "searching" : true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"
        }
    })
 });