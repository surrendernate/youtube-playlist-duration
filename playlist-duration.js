// Look for changes in title tag because page is ajax and no document ready occurs.
$('title').bind('DOMSubtreeModified', LoadTimeOut);
// This calls when page is reloaded and document is ready because above does not work.
PlayListDuration();

function LoadTimeOut(){
    setTimeout(PlayListDuration, 50);
}
function PlayListDuration() {
    // Add a Duration list item in playlist details.
    $('.pl-header-details').append("<li id='duration'></li>");
    var count;
    var time = [];
    var timestamp;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    $('.timestamp span').each(function() {
        // Look for each video in playlist and get .timetap string
        // then count how many ':' exits.
        count = ($(this).text().match(/:/g)).length;

        // if count is 2 use the hh:mm:ss format else use mm:ss format,
        // convert the string "numbers" stores in time array to Numbers
        // then store each time value in corresponding variables from timsstamp object.
        if (count == 2) {
            time = $(this).text().split(':');
            time = time.map(Number);
            timestamp = {
                hours: time[0],
                minutes: time[1],
                seconds: time[2]
            };
            seconds = seconds + timestamp.seconds;
            minutes = minutes + timestamp.minutes;
            hours = hours + timestamp.hours;
        } else {
            time = $(this).text().split(':');
            time = time.map(Number);
            timestamp = {
                minutes: time[0],
                seconds: time[1]
            };
            seconds = seconds + timestamp.seconds;
            minutes = minutes + timestamp.minutes;
        }

    });

    // Convert all to seconds and add them.
    var total = seconds + minutes * 60 + hours * 3600;
    var hh = Math.floor(total / 3600);

    // Replace total to with remainder after calulating how many hours.
    total %= 3600;
    var mm = Math.floor(total / 60);

    // Find remainder in seconds after calulating how many minutes.
    var ss = total % 60;

    // Store final Time and insert into the appended list item;
    var Time = hh + "h:" + mm + "m:" + ss + "s";
    $('#duration').html("Duration <span>" + Time + "</span>");
}