/**
 * Created by user on 11/4/2016.
 */

// HEADER RELATED FUNCTIONALITIES

// Iniitialize Trainee/Manager Header
$('#header_menu .menu .item').tab({});

$('.user-information .image').dimmer({
    on: 'hover'
});

// Initialize admin config
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
    closable: false,
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

tSIndex = 0; rSIndex = 0; qSIndex = 0;

trainerSlider = document.querySelector('.trainer_page_menu_slider');
resourcesSlider = document.querySelector('.resources_page_menu_slider');
quizSlider = document.querySelector('.quiz_page_menu_slider');

$('#detail-list').slimScroll({
    height: '354px',
    alwaysVisible: true
});

// LEFT CONTENT RELATED FUNCTIONALITIES

// Initialize Trainee/Manager Left Contents
$('.menu-filter.dropdown').dropdown({
    allowAdditions: true
});

// Initialize menus
$('.left-content-menu.menu .item').tab({});

// Hidden Checkbox
$('#hidden-checkbox').checkbox();

// CENTER CONTENT RELATED FUNCTIONALITIES

$('#training-list').slimScroll({
    height: '470px',
    alwaysVisible: true
});

$('#main_list_page').fullpage({
    controlArrows: false,
    fitToSection: false,
    autoScrolling: false,
    keyboardScrolling: false
});

// Action on list of items
$('.training-list-actions .dropdown').dropdown({
    allowAdditions: true
});

// Evaluation Form
var self = $('.long.modal').modal({
    detachable: true,
    closable: false,
    blurring: true,
    onShow: function () {
        self.modal('refresh');
        self.css('border-radius', '3px');
    }
});

// Quiz Form
var quiz = $('.quiz.long.modal').modal({
    detachable: true,
    closable: false,
    blurring: true,
    onShow: function () {
        quiz.modal('refresh');
        quiz.css('border-radius', '3px');
    }
});

// Management Training Table Date selection
flatpickr('.training-table-date', {
});

// Management Details tab
$('.subs_details.menu .item').tab({});
$('#management_result_catrgory').dropdown();

$('#evaluation_zone').slimScroll({height: '420px', alwaysVisible: true});
$('#quiz-evaluation_zone').slimScroll({height: '420px', alwaysVisible: true});

$('#subs_training_table').slimScroll({height: '255px', alwaysVisible: true});
$('#subs_quiz_table').slimScroll({height: '255px', alwaysVisible: true});


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
    closable: false,
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
    closable: false,
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
    closable: false,
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
    closable: false,
    hideOnScroll: false,
    variation: 'wide'
});

$('#notification-tablesort').slimScroll({
    max_height: '300px'
    //alwaysVisible: true
});

$('.training-tablesort-actions .dropdown').dropdown({
    // you can use any ui transition
    transition: 'drop',
    position   : 'right center'
});


$('#posts-list').slimScroll({
    height: '315px'
    //alwaysVisible: true
});

$('#services-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#departments-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#directions-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#users-list').slimScroll({
    height: '345px',
    //alwaysVisible: true
});

$('#user-location-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#contract-type-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#resources-visibility-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#resources-type-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#resources-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#quiz-results-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#qr-status-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#question-type-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#quiz-type-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#category-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#sub-category-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#propositions-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#questions-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#quiz-list').slimScroll({
    height: '392px',
    //alwaysVisible: true
});

$('#post-indiv-training').slimScroll({
    height: '78px'
    //alwaysVisible: true
});

$('#post-level').dropdown();
$('#post-service').dropdown();
$('#post-initial-training').dropdown();
$('#service-department').dropdown();
$('#department-direction').dropdown();
$('#user-gender').dropdown();
$('#user-status').dropdown();
$('#user-contract').dropdown();
$('#user-boss').dropdown();
$('#user-location').dropdown();
$('#user-location-region').dropdown();
$('#training-resources').dropdown();
$('#load-resource').checkbox();
$('#correct-proposition').checkbox();
$('#resource-type').dropdown();
$('#resource-visibility').dropdown();
$('#sub-category-category').dropdown();
$('#proposition-question').dropdown();
$('#question-type').dropdown();
$('#quiz-type').dropdown();
$('#question-propositions').dropdown();
$('#quiz-planned-training').dropdown();
$('#quiz-sub-category').dropdown();

flatpickr("#user-employment-date");