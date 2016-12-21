/**
 * Created by user on 10/27/2016.
 */
function shake_element(element){
    $(element).transition('shake');
}

function switch_shape(shape){
    $(shape).shape({
        width: '300px'
    });
}

function open_search(){
    $('#header-menu-shape').shape('flip down');
}

$('#planned-training-tab .menu .item').tab();
$('#posts-tab .menu .item').tab();
$('#users-tab .menu .item').tab();
$('#training-tab .menu .item').tab();
$('#resources-tab .menu .item').tab();
$('#quiz-result-tab .menu .item').tab();
$('#quiz-tab .menu .item').tab();
$('#admin-groupings-menu .menu .item').tab();

$('#training-tablesort').slimScroll({
    height: '445px'
    //alwaysVisible: true
});

$('#detail-tablesort').slimScroll({
    height: '315px'
    //alwaysVisible: true
});

$('#admin-groupings-menu').slimScroll({
    height: '230px'
    //alwaysVisible: true
});

// $('#quiz-modal').modal({
//     closable: false,
//     blurring: true,
//     onApprove : function() {
//         window.alert('Approved!');
//     }
// }).modal('show');

$('#header_menu .menu .item').click(function () {
    $('.ui.tab.segment').transition('slide down');
});

flatpickr(".flatpickr", {
    // minDate: new Date(), // "today" / "2016-12-20" / 1477673788975
    // maxDate: "2016-12-20",
    enableTime: true,
    enableSeconds: true,
    //noCalendar: true,
    time_24hr: true,
    // create an extra input solely for display purposes
    altInput: true,
    altFormat: "F j, Y h:i K",
    // disable: [
    //     { from: "2016-08-16", to: "2016-08-19" },
    //     "2016-08-24",
    //     new Date().fp_incr(30) // 30 days from now
    // ],
    disable: [
        function(date){ // disable odd days
            return date.getDate()%2 > 0;
        }
    ],
    // enable: [
    //     {
    //         from: "today",
    //         to: new Date().fp_incr(7) // 7 days from now
    //     }
    // ],
    enable: [ // Enable only business days
        function(dateObj){
            // dateObj is a JavaScript Date
            return dateObj.getDay() %6 !== 0 && dateObj.getFullYear() === 2016;
        }
    ],
    onDayCreate: function(dObj, dStr, fp, dayElem){
        // utilize fp.currentYear, fp.currentMonth, dayElem.textContent
        if (Math.random() < 0.15){
            dayElem.innerHTML += "<span class='event'></span></span>";
            $(dayElem).attr("data-tooltip", 'Hello');
        }

        else if (Math.random() > 0.85)
            dayElem.innerHTML += "<span class='event busy'></span>";
    }
});

tinymce.init({
    selector: '#feedback-textarea',
    plugins : 'advlist anchor autolink autoresize autosave colorpicker bbcode directionality emoticons image ' +
    'insertdatetime media link image lists charmap print preview',
    menubar:false,
    statusbar:false
});

$('#post-table').tablesort();
$('#service-table').tablesort();
$('#department-table').tablesort();
$('#direction-table').tablesort();
$('#user-table').tablesort();
$('#user-location-table').tablesort();
$('#contract-type-table').tablesort();
$('#training-table').tablesort();
$('#resource-visibility-table').tablesort();
$('#resource-type-table').tablesort();
$('#resource-table').tablesort();
$('#qr-details-table').tablesort();
$('#qr-table').tablesort();
$('#qr-status-table').tablesort();
$('#question-type-table').tablesort();
$('#quiz-type-table').tablesort();
$('#proposition-table').tablesort();
$('#quiz-table').tablesort();




//{id} is required, :date: is optional
crossroads.addRoute('/news/{id}/:date:', function(id, date){
    console.log(id +' - '+ date);
});
crossroads.parse('/news/123'); //match route and pass "123" as param
crossroads.parse('/news/45/2011-09-31'); //match route passing "45" and "2011-09-31" as param

//Listen to hash changes
window.addEventListener("hashchange", function() {
    var route = '/';
    var hash = window.location.hash;
    if (hash.length > 0) {
        route = hash.split('#').pop();
    }
    console.log(route);
    crossroads.parse(route);
});