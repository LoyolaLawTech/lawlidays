/*
"Constants". If you are doing your own implimentation of this, you will
have to replace these values with your own. Google API Keys and oAuth 
available at http://developers.google.com
*/
var CLIENTID = '866878723627-ti2jtpa6rn1ugrfup8s6k3trjsogd6fs.apps.googleusercontent.com',
      APIKEY = 'AIzaSyCcSxmwLYdDSRs3PNffIWTSwLPHNPHnwNU',
      SCOPES = 'https://www.googleapis.com/auth/calendar',
     APP_URL = 'http://judsonmitchell.github.io/lawlidays',
  SERVER_URL = 'http://localhost/server';

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

var JSONstore,
numRequests = 0,
sendToEmail = function(){
    var resultsText = '';
    JSONstore.forEach(function(v) {
        resultsText += moment(v[0]).format('MMMM Do YYYY') + ' - ' + v[1] + '%0A';
    });
    window.open('mailto:?&subject=' +  $('#state').val() + ' ' +
    'Legal Holidays ' + $('#years').val() + '&body=' +  resultsText);
},
sendToJSON = function() {
    $('#text-display').html('<pre>' + JSON.stringify(JSONstore,null,2) + '</pre>').removeClass('hidden');
},
sendToCSV = function() {
    var resultsText = 'Subject, Start Date\n';
    JSONstore.forEach(function(v) {
        resultsText += moment(v[0]).format('MM/DD/YY') + ',' + v[1] + '\n';
    });
    $('#text-display').html('<pre>' + resultsText + '</pre>').removeClass('hidden');
},
storeJSON = function(d) {
    JSONstore = d;
},
resetAll = function() {
    $('#results').addClass('hidden');
    $('ul').children().remove();
    $('input').val('');
    $('pre').text('').addClass('hidden');
    JSONstore = null;
},
//Handle Google Calendar Auth
handleClientLoad = function (){
    gapi.client.setApiKey(APIKEY);
    window.setTimeout(checkAuth,1);
},
checkAuth = function () {
    gapi.auth.authorize({client_id: CLIENTID, scope: SCOPES, immediate: true}, handleAuthResult);
},
handleAuthResult = function(authResult) {
    if (authResult && !authResult.error) {
        $('#gc').append(' <i class="fa fa-spinner" style="color:red"></i>');
        makeApiCall();
    }
},
handleAuthClick = function (event) {
    gapi.auth.authorize({client_id: CLIENTID, scope: SCOPES, immediate: false}, handleAuthResult);
    return false;
},
makeApiCall = function () {
    gapi.client.load('calendar', 'v3', function() {
        var createCalendar = gapi.client.calendar.calendars.insert({
            'summary': $('#years').val() + ' Legal Holidays for ' + $('#state').val()
        });
        createCalendar.execute(function(resp) {
            var addEvents = function (item, index, array) {
                var apiError = false;
                var request = gapi.client.calendar.events.insert({
                    'calendarId': resp.id,
                    'end': { 'date': item[0] },
                    'start': { 'date': item[0] },
                    'description': 'Legal Holiday in ' + $('#state').val() +
                    '. Created by Lawlidays: ' + APP_URL,
                    'creator': {
                        'displayName': 'Lawlidays'
                    },
                    'summary': item[1]
                });
                request.then(function (response){
                    numRequests++;
                    if (numRequests === array.length && !apiError){
                        $('#gc').children().remove();
                        $('#gc').append('<i class="fa fa-check" style="color:green"></i>');
                    }
                },function(reason){
                    numRequests++;
                    if (reason){
                        apiError = true;
                        $('#gc').children().remove();
                        $('#gc').append('<i class="fa fa-check" style="color:red"></i>');
                    }
                    console.log(reason);
                });
            };

            JSONstore.forEach(function (item,index,array){
                addEvents(item, index, array);
            });

        });
    });
};

$('#years').on('awesomplete-selectcomplete', function() {
    $.ajax({
        type: 'POST',
        dataType: 'json',
        data: {'state': $('#state').val() , 'year': $('#years').val() },
        url: SERVER_URL + '/index.php',
        success: function(d){
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
$('#csv').click(function(e){
    sendToCSV();
});
$('#gc').click(function(e){
    handleAuthClick();
});
$('#reset').click(function(e){
    resetAll();
});
