var init = function() {
    var d = new Date();
    var n = d.getFullYear();
    var yrs = [];
    yrs.push(n);
    for (var i = 0, l = 100; i < l; i ++) {
        yrs.push(n++);
    }
    $('#years').attr('data-list',yrs.toString());
}();

var JSONstore;
var sendToEmail = function(){
    var resultsText = '';
    JSONstore.forEach(function(v) {
        resultsText += moment(v[0]).format('MMMM Do YYYY') + ' - ' + v[1] + '%0A';
    });
    window.open('mailto:?&subject=' +  $('#state').val() + ' ' +
    'Legal Holidays ' + $('#years').val() + '&body=' +  resultsText);
},
sendToJSON = function(){
    $('#text-display').html('<pre>' + JSON.stringify(JSONstore,null,2) + '</pre>').removeClass('hidden');
},
storeJSON = function(d) {
    JSONstore = d;
},
resetAll = function() {
    $('#results').addClass('hidden');
    $('ul').children().remove();
    $('input').val('');
};

$('#years').on('awesomplete-selectcomplete', function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {'state': $('#state').val() , 'year': $('#years').val() },
        url: 'http://localhost/server/index.php',
        success: function(d){
            //$('#results').attr('data',d);
            storeJSON(d);
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

$('#email').click(function(e){
    sendToEmail();
});
$('#json').click(function(e){
    sendToJSON();
});
$('#reset').click(function(e){
    resetAll();
});
