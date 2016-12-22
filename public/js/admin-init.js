/**
 * Created by user on 11/15/2016.
 */
$('#main_list_page').fullpage({
    controlArrows: false,
    fitToSection: false,
    //autoScrolling: false,
    //keyboardScrolling: false
});


$('#test_ps').perfectScrollbar();

$('#participants-block').slimScroll({
    height: '385px'
});

$('#configuration-block').slimScroll({
    height: '390px',
    alwaysVisible: true
});

$('.site-block').slimScroll({
    height: '240px',
    alwaysVisible: true
});

$('.session-block').slimScroll({
    height: '200px',
    alwaysVisible: true
});

//$("#planned-training-list").dimmer('show');

// Planned Training Modal
var training = $('.training.long.modal').modal({
    detachable: true,
    closable: false,
    //blurring: true,
    allowMultiple: false,
    onShow: function () {
        training.modal('refresh');
        training.css('border-radius', '3px');
    }
});


$('#pt-details-tab .menu .item').tab({});

$('#admin-tab .menu .item').tab();

flatpickr("#pt_start_date", {
    altFormat: "F, j, Y"
});


$('.notif.button').popup({
    //boundary: ""
    inline     : true,
    hoverable  : false,
    position   : 'bottom center',
    delay: {
        show: 300,
        hide: 0
    },
    on: 'click',
    transition: 'horizontal flip',
    lastResort: 'bottom center',
    closable: true,
    hideOnScroll: false,
    variation: 'wide'
});

$('.notification').popup({
    //boundary: ""
    inline     : true,
    hoverable  : false,
    position   : 'bottom center',
    delay: {
        show: 300,
        hide: 0
    },
    on: 'click',
    transition: 'horizontal flip',
    lastResort: 'bottom center',
    closable: true,
    hideOnScroll: false,
    variation: 'wide'
});

$('.user-information').popup({
    //boundary: ""
    inline     : true,
    hoverable  : false,
    position   : 'bottom center',
    delay: {
        show: 300,
        hide: 0
    },
    on: 'click',
    transition: 'horizontal flip',
    lastResort: 'bottom center',
    closable: true,
    hideOnScroll: false,
    variation: 'wide'
});

$('.clear-notification').popup({
    //boundary: ""
    popup: '.delete-notification.popup',
    hoverable  : false,
    position   : 'left center',
    delay: {
        show: 300,
        hide: 0
    },
    on: 'click',
    transition: 'horizontal flip',
    lastResort: 'bottom center',
    closable: true,
    hideOnScroll: false,
    variation: 'wide'
});

$('.admin-configuration').popup({
    //boundary: ""
    inline     : true,
    hoverable  : false,
    position   : 'bottom center',
    delay: {
        show: 300,
        hide: 0
    },
    on: 'click',
    transition: 'horizontal flip',
    lastResort: 'bottom center',
    closable: true,
    hideOnScroll: false,
    variation: 'wide'
});

$('.feedback.button').popup({
    //boundary: ""
    inline     : true,
    hoverable  : false,
    position   : 'bottom center',
    delay: {
        show: 300,
        hide: 0
    },
    on: 'click',
    transition: 'horizontal flip',
    lastResort: 'bottom center',
    closable: false,
    hideOnScroll: false,
    variation: 'wide'
});

//$('#registration-form').dimmer('show');
//$('#training-tablesort').dimmer('show');
// $('#posts-list').dimmer('show');
// $('#services-list').dimmer('show');
// $('#departments-list').dimmer('show');
// $('#directions-list').dimmer('show');
// $('#user-location-list').dimmer('show');
// $('#contract-type-list').dimmer('show');
// $('#resources-visibility-list').dimmer('show');
// $('#resources-type-list').dimmer('show');
// $('#users-list').dimmer('show');
// $('#qr-status-list').dimmer('show');
// $('#quiz-results-list').dimmer('show');
// $('#question-type-list').dimmer('show');
// $('#quiz-type-list').dimmer('show');
// $('#resources-list').dimmer('show');
// $('#category-list').dimmer('show');
// $('#propositions-list').dimmer('show');
// $('#sub-category-list').dimmer('show');
// $('#questions-list').dimmer('show');
//$('#quiz-list').dimmer('show');
//$('#post-indiv-training').dimmer('show');