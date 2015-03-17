var genYears = function() {
    var d = new Date();
    var n = d.getFullYear();
    var yrs = [];
    yrs.push(n);
    for (var i = 0, l = 100; i < l; i ++) {
        yrs.push(n++);
    }
    $('#years').attr('data-list',yrs.toString());
}();

$('#years').on('awesomplete-selectcomplete', function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {'state': $('#state').val() , 'year': $('#years').val() },
        url: 'http://localhost/server/index.php',
        success: function(d){
            console.log(d);
            d.forEach(function(item){
                $('.list-group').append('<li class="list-group-item">' +
                moment(item[0]).format('MMMM Do YYYY') + ' - ' +
                item[1] + '</li>');
            });
            $('#results').removeClass('hidden');
        },
        error: function (obj, statusCode, errorText){
            console.log(errorText);
        }
    });
});
