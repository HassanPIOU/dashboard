function createDatabase() {
    $.ajax({
        url: '/install-db-create',
        type: 'GET',
        success: function (msg) {
            console.log(msg)
            if (msg == "true"){
                $('#createDB').hide('slow').delay(1000)
                $('#addSqlFile').show('slow').delay(1000)
            }
            else{
                $('#resultat').html(setAlert("Une erreur est survenue", "error"))
            }
        }
    });
}