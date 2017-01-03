/**
 * Created by user on 11/7/2016.
 */
// Create group controller

function resourceClicked(link){
    window.open(link, '_blank');}

app.controller("groupController", function ($scope, $rootScope, $http, $compile) {

    // Active Tabs in the left menu tab groups
    $scope.ACTIVE_TRAINING_GROUP = 'all';
    $scope.ACTIVE_QUIZ_GROUP = 'all';
    $scope.ACTIVE_RESOURCES_GROUP = 'all';

    // Hidden Item checkboxes
    $scope.SHOW_HIDDEN_TRAINING = true;
    $scope.SHOW_HIDDEN_QUIZ = true;
    $scope.SHOW_HIDDEN_NOTIFICATIONS = true;

    // Filter Types/Categories/subcategories
    $scope.TRAINING_FILTER_TYPE = 'none';
    $scope.QUIZ_FILTER_CATEGORY = 'none';
    $scope.QUIZ_FILTER_SUB_CATEGORY = 'none';

    // Filter period
    $scope.TRAINING_START_TS = 'none';
    $scope.TRAINING_END_TS = 'none';
    $scope.QUIZ_START_TS = 'none';
    $scope.QUIZ_END_TS = 'none';
    $scope.RESOURCES_START_TS = 'none';
    $scope.RESOURCES_END_TS = 'none';

    // Training, Quiz View Pagination Controller
    $rootScope.training_list = [];
    $rootScope.quiz_list = [];
    $rootScope.resource_list = [];
    $rootScope.management_list = [];
    $rootScope.training_list_min = 0;
    $rootScope.training_list_max = 0;
    $rootScope.training_list_total = 0;
    $rootScope.TRAINING_OFFSET = 0;
    $rootScope.QUIZ_OFFSET = 0;
    $rootScope.RESOUCES_OFFSET = 0;
    $rootScope.MANAGEMENT_OFFSET = 0;
    $rootScope.DISABLE_FORWARD_NAV = true;
    $rootScope.DISABLE_BACKWARD_NAV = true;

    // Check/Uncheck Functionality
    $rootScope.TRAINING_ELEMENTS = []; // contains the state of all the training session elements in the current training list
    $rootScope.QUIZ_ELEMENTS = [];
    $rootScope.RESOUCE_ELEMENTS = [];
    $rootScope.CHECk_ALL_LIST_ELEMENTS = false;

    // Handle Training Page Menu
    $scope.trainingMenu = function (item) {
        $scope.ACTIVE_TRAINING_GROUP = item;
        $rootScope.TRAINING_OFFSET = 0;
        $rootScope.loadListItems();
    };

    // Handle Quiz Page Menu
    $scope.quizMenu = function (item) {
        $scope.ACTIVE_QUIZ_GROUP = item;
        $rootScope.QUIZ_OFFSET = 0;
        $rootScope.loadListItems();
    };

    // Handle Resources Page Menu
    $scope.resourcesMenu = function (item) {
        $scope.ACTIVE_RESOURCES_GROUP = item;
        $rootScope.RESOUCES_OFFSET = 0;
        $rootScope.loadListItems();
    };

    $rootScope.showHidden = function () {
        if($scope.active_page == 'training'){
            $rootScope.TRAINING_OFFSET = 0;
        }
        else if($scope.active_page == 'quiz'){
            $rootScope.QUIZ_OFFSET = 0;
        }
        $rootScope.loadListItems();
    };

    $rootScope.loadListItems = function() {

        $.fn.fullpage.reBuild();

        // Show training list loader
        $('#trainingList').dimmer('show');

        if($scope.active_page == 'training'){
            if($rootScope.QUERY != undefined){
                $rootScope.TRAINING_OFFSET = 0;
            }

            var params = {
                group: $scope.ACTIVE_TRAINING_GROUP,
                show_hidden: $scope.SHOW_HIDDEN_TRAINING,
                filter_type: $scope.TRAINING_FILTER_TYPE,
                start_ts: $scope.TRAINING_START_TS,
                end_ts: $scope.TRAINING_END_TS,
                offset: $rootScope.TRAINING_OFFSET,
                search: $rootScope.QUERY
            };

            // Make Image POST request
            $http.post('/api/v1/training/trainingList', params)
                .success(function (data, status, headers, config) {
                    $('#trainingList').dimmer('hide');
                    $rootScope.training_list = data.data;
                    if($rootScope.training_list.length > 0){
                        $rootScope.training_list_total = $rootScope.training_list[0].total;
                        $rootScope.training_list_max = $rootScope.training_list.length + $rootScope.TRAINING_OFFSET;
                        $rootScope.training_list_min = 1 + $rootScope.TRAINING_OFFSET;

                        if($rootScope.training_list_max < $rootScope.training_list_total) {
                            // Enable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = false;
                        }else{
                            // Disable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = true;
                        }
                        if($rootScope.training_list_min > 2){
                            // Enable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = false;
                        }else{
                            // Disable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = true;
                        }

                        $rootScope.TRAINING_ELEMENTS = [];

                        for(var i = 0; i < $rootScope.training_list.length; i++){
                            $rootScope.TRAINING_ELEMENTS[$rootScope.training_list[i].sessionID] = false;
                        }

                        $rootScope.toggleCheckAll($rootScope.CHECk_ALL_LIST_ELEMENTS);
                    }else{
                        $rootScope.training_list_min = 0;
                        $rootScope.training_list_max = 0;
                        $rootScope.training_list_total = 0;
                    }

                    $('#trainingList').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#trainingList').dimmer('hide');
            });
        }
        else if($scope.active_page == 'quiz'){
            if($rootScope.QUERY != undefined){
                $rootScope.QUIZ_OFFSET = 0;
            }

            var params = {
                group: $scope.ACTIVE_QUIZ_GROUP,
                show_hidden: $scope.SHOW_HIDDEN_QUIZ,
                category: $scope.QUIZ_FILTER_CATEGORY,
                sub_category: $scope.QUIZ_FILTER_SUB_CATEGORY,
                start_ts: $scope.QUIZ_START_TS,
                offset: $rootScope.QUIZ_OFFSET,
                search: $rootScope.QUERY
            };

            // Make Quiz List POST request
            $http.post('/api/v1/quiz/quizList', params)
                .success(function (data, status, headers, config) {
                    $rootScope.quiz_list = data.data;
                    if($rootScope.quiz_list.length > 0){
                        $rootScope.training_list_total = $rootScope.quiz_list[0].total;
                        $rootScope.training_list_max = $rootScope.quiz_list.length + $rootScope.QUIZ_OFFSET;
                        $rootScope.training_list_min = 1 + $rootScope.QUIZ_OFFSET;

                        if($rootScope.training_list_max < $rootScope.training_list_total) {
                            // Enable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = false;
                        }else{
                            // Disable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = true;
                        }
                        if($rootScope.training_list_min > 2){
                            // Enable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = false;
                        }else{
                            // Disable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = true;
                        }

                        $rootScope.QUIZ_ELEMENTS = [];

                        for(var i = 0; i < $rootScope.quiz_list.length; i++){
                            $rootScope.QUIZ_ELEMENTS[$rootScope.quiz_list[i].quizID] = false;
                        }

                        $rootScope.toggleCheckAll($rootScope.CHECk_ALL_LIST_ELEMENTS);

                    }else{
                        $rootScope.training_list_min = 0;
                        $rootScope.training_list_max = 0;
                        $rootScope.training_list_total = 0;
                    }

                    $('#trainingList').dimmer('hide');

                }).error(function (data, status, headers, config) {
                // Hide list loader
                $('#trainingList').dimmer('hide');
            });
        }
        else if($scope.active_page == 'resources'){
            if($rootScope.QUERY != undefined){
                $rootScope.RESOUCES_OFFSET = 0;
            }

            var params = {
                group: $scope.ACTIVE_RESOURCES_GROUP,
                start_ts: $scope.RESOURCES_START_TS,
                offset: $rootScope.RESOUCES_OFFSET,
                search: $rootScope.QUERY
            };

            // Make Quiz List POST request
            $http.post('/api/v1/resource/resourceList', params)
                .success(function (data, status, headers, config) {
                    $rootScope.resource_list = data.data;
                    if($rootScope.resource_list.length > 0){
                        $rootScope.training_list_total = $rootScope.resource_list[0].total;
                        $rootScope.training_list_max = $rootScope.resource_list.length + $rootScope.RESOUCES_OFFSET;
                        $rootScope.training_list_min = 1 + $rootScope.RESOUCES_OFFSET;

                        if($rootScope.training_list_max < $rootScope.training_list_total) {
                            // Enable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = false;
                        }else{
                            // Disable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = true;
                        }
                        if($rootScope.training_list_min > 2){
                            // Enable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = false;
                        }else{
                            // Disable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = true;
                        }

                        $rootScope.RESOUCE_ELEMENTS = [];

                        for(var i = 0; i < $rootScope.resource_list.length; i++){
                            $rootScope.RESOUCE_ELEMENTS[$rootScope.resource_list[i].resourceID] = false;
                        }

                        $rootScope.toggleCheckAll($rootScope.CHECk_ALL_LIST_ELEMENTS);
                    }else{
                        $rootScope.training_list_min = 0;
                        $rootScope.training_list_max = 0;
                        $rootScope.training_list_total = 0;
                    }

                    $('#trainingList').dimmer('hide');

                }).error(function (data, status, headers, config) {
                // Hide list loader
                $('#trainingList').dimmer('hide');
            });
        }
        else{

            var params = {
                offset: $rootScope.MANAGEMENT_OFFSET,
                search: $rootScope.QUERY
            };

            // Make Quiz List POST request
            $http.post('/api/v1/management/subsList', params)
                .success(function (data, status, headers, config) {
                    $rootScope.management_list = data.data;
                    if($rootScope.management_list.length > 0){
                        $rootScope.training_list_total = $rootScope.management_list[0].total;
                        $rootScope.training_list_max = $rootScope.management_list.length + $rootScope.MANAGEMENT_OFFSET;
                        $rootScope.training_list_min = 1 + $rootScope.MANAGEMENT_OFFSET;

                        if($rootScope.training_list_max < $rootScope.training_list_total) {
                            // Enable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = false;
                        }else{
                            // Disable forward navigation
                            $rootScope.DISABLE_FORWARD_NAV = true;
                        }
                        if($rootScope.training_list_min > 2){
                            // Enable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = false;
                        }else{
                            // Disable backward navigation
                            $rootScope.DISABLE_BACKWARD_NAV = true;
                        }

                    }else{
                        $rootScope.training_list_min = 0;
                        $rootScope.training_list_max = 0;
                        $rootScope.training_list_total = 0;
                    }

                    $('#trainingList').dimmer('hide');

                }).error(function (data, status, headers, config) {
                // Hide list loader
                $('#trainingList').dimmer('hide');
            });

        }

    };
    
    $scope.filterTrainingType = function (type) {
        $scope.TRAINING_FILTER_TYPE = type;
        if(type == 'none'){
            $scope.ACTIVE_TRAINING_GROUP = 'none';
            $rootScope.TRAINING_OFFSET = 0;
            $scope.TRAINING_START_TS = 'none';
            $scope.TRAINING_END_TS = 'none';
            $('#all_training').click();
        }
        $rootScope.loadListItems();
    };

    $scope.trainingPeriod = function (period) {
        if(period == 'week'){
            $scope.TRAINING_START_TS = Date.parse('last week').toString('yyyy-MM-dd');
            $scope.TRAINING_END_TS = Date.now().toString('yyyy-MM-dd');
        }else if(period == 'month'){
            $scope.TRAINING_START_TS = Date.parse('last month').toString('yyyy-MM-dd');
            $scope.TRAINING_END_TS = Date.now().toString('yyyy-MM-dd');
        }else {
            $scope.TRAINING_START_TS = Date.parse('last year').toString('yyyy-MM-dd');
            $scope.TRAINING_END_TS = Date.now().toString('yyyy-MM-dd');
        }
        $scope.TRAINING_FILTER_TYPE = 'none';
        $rootScope.loadListItems();
    };

    $scope.filterQuizCategory = function (cat) {
        $scope.QUIZ_FILTER_CATEGORY = cat;
        $rootScope.loadListItems();
    };

    $scope.filterQuizSubCategory = function (subCat) {
        $scope.QUIZ_FILTER_SUB_CATEGORY = subCat;
        $rootScope.loadListItems();
    };

    $scope.quizPeriod = function (period) {
        if(period == 'week'){
            $scope.QUIZ_START_TS = Date.parse('last week').toString('yyyy-MM-dd');
            $scope.QUIZ_END_TS = Date.now().toString('yyyy-MM-dd');
        }else if(period == 'month'){
            $scope.QUIZ_START_TS = Date.parse('last month').toString('yyyy-MM-dd');
            $scope.QUIZ_END_TS = Date.now().toString('yyyy-MM-dd');
        }else {
            $scope.QUIZ_START_TS = Date.parse('last year').toString('yyyy-MM-dd');
            $scope.QUIZ_END_TS = Date.now().toString('yyyy-MM-dd');
        }
        $rootScope.loadListItems();
    };

    $scope.resetQuizType = function () {

        $scope.QUIZ_START_TS = 'none';
        $scope.QUIZ_END_TS = 'none';
        $scope.QUIZ_FILTER_CATEGORY = 'none';
        $scope.QUIZ_FILTER_SUB_CATEGORY = 'none';
        $scope.ACTIVE_QUIZ_GROUP = 'none';
        $rootScope.QUIZ_OFFSET = 0;
        $('#all_quiz').click();
        $rootScope.loadListItems();
    };

    $scope.resourcesPeriod = function (period) {
        if(period == 'week'){
            $scope.RESOURCES_START_TS = Date.parse('last week').toString('yyyy-MM-dd');
            $scope.RESOURCES_END_TS = Date.now().toString('yyyy-MM-dd');
        }else if(period == 'month'){
            $scope.RESOURCES_START_TS = Date.parse('last month').toString('yyyy-MM-dd');
            $scope.RESOURCES_END_TS = Date.now().toString('yyyy-MM-dd');
        }else {
            $scope.RESOURCES_START_TS = Date.parse('last year').toString('yyyy-MM-dd');
            $scope.RESOURCES_END_TS = Date.now().toString('yyyy-MM-dd');
        }
        $rootScope.loadListItems();
    };

    $scope.resetResources = function () {
        $scope.ACTIVE_RESOURCES_GROUP = 'none';
        $rootScope.RESOUCES_OFFSET = 0;
        $scope.RESOURCES_START_TS = 'none';
        $scope.RESOURCES_END_TS = 'none';
        $('#all_resources').click();
        $rootScope.loadListItems();
    };

    $rootScope.loadNext = function () {
        if($scope.active_page == 'training'){
            $rootScope.TRAINING_OFFSET += 10;
        }
        else if($scope.active_page == 'quiz'){
            $rootScope.QUIZ_OFFSET += 10;
        }
        else if($scope.active_page == 'resources'){
            $rootScope.RESOUCES_OFFSET += 10;
        }
        else if($scope.active_page == 'management'){
            $rootScope.MANAGEMENT_OFFSET += 10;
        }

        $rootScope.loadListItems();
    };

    $rootScope.loadPrev = function () {
        if($scope.active_page == 'training'){
            $rootScope.TRAINING_OFFSET -= 10;
        }
        else if($scope.active_page == 'quiz'){
            $rootScope.QUIZ_OFFSET -= 10;
        }
        else if($scope.active_page == 'resources'){
            $rootScope.RESOUCES_OFFSET -= 10;
        }
        else if($scope.active_page == 'management'){
            $rootScope.MANAGEMENT_OFFSET -= 10;
        }

        $rootScope.loadListItems();
    };

    $rootScope.hideElement = function () {
      if($rootScope.active_page == 'training'){

          var ids_to_hide = [];

          for(var i = 0; i < $rootScope.TRAINING_ELEMENTS.length; i++){
              if($rootScope.TRAINING_ELEMENTS[i] == true){
                  ids_to_hide.push(i);
              }
          }

          if(ids_to_hide.length > 0) {
              var params = {
                  ids: ids_to_hide
              };

              $http.post('/api/v1/training/hideTraining', params)
                  .success(function (data, status, headers, config) {

                      alert('Training hidden');
                      $rootScope.loadListItems();

                  }).error(function (data, status, headers, config) {

                  alert('Error hiding training');

              });

          }

      }else if($rootScope.active_page == 'quiz'){

          console.log($rootScope.QUIZ_ELEMENTS);
          var ids_to_hide = [];

          for(var i = 0; i < $rootScope.QUIZ_ELEMENTS.length; i++){
              if($rootScope.QUIZ_ELEMENTS[i] == true){
                  ids_to_hide.push(i);
              }
          }

          if(ids_to_hide.length > 0) {
              var params = {
                  ids: ids_to_hide
              };

              $http.post('/api/v1/quiz/hideQuiz', params)
                  .success(function (data, status, headers, config) {

                      alert('Quiz hidden');
                      $rootScope.loadListItems();

                  }).error(function (data, status, headers, config) {

                  alert('Error hiding quiz');

              });

          }

      }
    };

    $scope.loadDateItems = function (sessions) {
        $rootScope.active_page = 'training';
        $rootScope.setSearchText();
        $('#header_training').click();
        var params = {
            offset: $rootScope.TRAINING_OFFSET,
            sessions: Array.from(arguments)
        };

        $http.post('/api/v1/training/dailyTrainingList', params)
            .success(function (data, status, headers, config) {
                $('#trainingList').dimmer('hide');
                $rootScope.training_list = data.data;
                if($rootScope.training_list.length > 0){
                    $rootScope.training_list_total = $rootScope.training_list[0].total;
                    $rootScope.training_list_max = $rootScope.training_list.length + $rootScope.TRAINING_OFFSET;
                    $rootScope.training_list_min = 1 + $rootScope.TRAINING_OFFSET;

                    if($rootScope.training_list_max < $rootScope.training_list_total) {
                        // Enable forward navigation
                        $rootScope.DISABLE_FORWARD_NAV = false;
                    }else{
                        // Disable forward navigation
                        $rootScope.DISABLE_FORWARD_NAV = true;
                    }
                    if($rootScope.training_list_min > 2){
                        // Enable backward navigation
                        $rootScope.DISABLE_BACKWARD_NAV = false;
                    }else{
                        // Disable backward navigation
                        $rootScope.DISABLE_BACKWARD_NAV = true;
                    }

                    $rootScope.TRAINING_ELEMENTS = [];

                    for(var i = 0; i < $rootScope.training_list.length; i++){
                        $rootScope.TRAINING_ELEMENTS[$rootScope.training_list[i].sessionID] = false;
                    }

                    $rootScope.toggleCheckAll($rootScope.CHECk_ALL_LIST_ELEMENTS);
                }else{
                    $rootScope.training_list_min = 0;
                    $rootScope.training_list_max = 0;
                    $rootScope.training_list_total = 0;
                }

                $('#trainingList').dimmer('hide');

            }).error(function (data, status, headers, config) {
            $('#trainingList').dimmer('hide');
        });
    };

    $rootScope.toggleCheckAll = function (CHECk_ALL_LIST_ELEMENTS) {

        if($scope.active_page == 'training'){
            for(var i in $rootScope.TRAINING_ELEMENTS){
                if($rootScope.TRAINING_ELEMENTS[i] != undefined){
                    $rootScope.TRAINING_ELEMENTS[i] = CHECk_ALL_LIST_ELEMENTS;
                    $rootScope.CHECk_ALL_LIST_ELEMENTS = CHECk_ALL_LIST_ELEMENTS;
                }
            }
        }
        else if($scope.active_page == 'quiz'){
            for(var i in $rootScope.QUIZ_ELEMENTS){
                if($rootScope.QUIZ_ELEMENTS[i] != undefined){
                    $rootScope.QUIZ_ELEMENTS[i] = CHECk_ALL_LIST_ELEMENTS;
                    $rootScope.CHECk_ALL_LIST_ELEMENTS = CHECk_ALL_LIST_ELEMENTS;
                }
            }
        }
        else if($scope.active_page == 'resources'){
            for(var i in $rootScope.RESOUCE_ELEMENTS){
                if($rootScope.RESOUCE_ELEMENTS[i] != undefined){
                    $rootScope.RESOUCE_ELEMENTS[i] = CHECk_ALL_LIST_ELEMENTS;
                    $rootScope.CHECk_ALL_LIST_ELEMENTS = CHECk_ALL_LIST_ELEMENTS;
                }
            }
        }
    };

    // Calendar Controls
    $scope.LOADING_CALENDAR = false;

    var LAST_LOADED_DATA_YEAR = Date.now().getFullYear();

    var YEAR_DATA = [];     // Contains yearly calendar data

    loadCalendarData();

    // Calendar Initializations
    var calendar = flatpickr("#training-calendar", {
        inline: true, // show the calendar inline
        //weekNumbers: true // show week numbers,
        onMonthChange: function () {

        },
        onYearChange: function (dObj, dStr, fp, dayElem) {

            LAST_LOADED_DATA_YEAR = fp.currentYear;
            loadCalendarData();

        },
        onDayCreate: function(dObj, dStr, fp, dayElem){
            // utilize fp.currentYear, fp.currentMonth, dayElem.textContent

            var date = dayElem.dateObj,
                // Note the + 1 in the month.
                month = date.getMonth() + 1,
                year = date.getFullYear();

            var current_day = Date.now().toString('yyyy-MM-dd');
            date = date.toString('yyyy-MM-dd');

            for(var i = 0; i < YEAR_DATA.length; i++){
                if(YEAR_DATA[i].day == date){
                    if(YEAR_DATA[i].training.length > 0){
                        if(date < current_day) {
                            dayElem.innerHTML += "<span class='event busy'></span>";
                        }else{
                            dayElem.innerHTML += "<span class='event'></span>";
                        }
                        $(dayElem).attr("data-tooltip", YEAR_DATA[i].training);
                        $(dayElem).attr("ng-click", 'loadDateItems(' + YEAR_DATA[i].sessions + ')');
                        $compile($(dayElem))($scope);
                    }
                }
            }
        }
    });

    function getDaysInYear(year) {
        var date = new Date(year, 0, 1);
        var days = [];
        while (date.getFullYear() === year) {
            days.push((new Date(date)).toString('yyyy-MM-dd'));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    function loadCalendarData() {

        var params = {
            year: LAST_LOADED_DATA_YEAR
        };

        // Make Image POST request
        $http.post('/api/v1/training/yearlyTrainingProgram', params)
            .success(function (data, status, headers, config) {

                var dayInYear = getDaysInYear(LAST_LOADED_DATA_YEAR);

                var yearTraining = data.data;

                var calendarObj = [];

                // Initialize calendarObj
                for(var k = 0; k < dayInYear.length; k++) {
                    calendarObj.push({
                        day: dayInYear[k],
                        training: [],
                        sessions: []
                    })
                }

                for(var i = 0; i < dayInYear.length; i++) {
                    var day = dayInYear[i];
                    for(var j = 0; j < yearTraining.length; j++){
                        var training = yearTraining[j];
                        if(day >= training.startDay.substr(0, 10) && day <= training.endDay.substr(0, 10)){
                            calendarObj[i].training.push(training.training_name);
                            calendarObj[i].sessions.push(training.sessionID);
                        }
                    }
                }

                YEAR_DATA = calendarObj;

                calendar.redraw();

                $scope.LOADING_CALENDAR = false;

            }).error(function (data, status, headers, config) {

        });
    }

    $rootScope.createInitials =  function () {
        $('.profile').initial({seed: 73, height:47, width: 56, fontSize: 40});
    };

    $rootScope.createQuizInitials =  function () {
        $('.quiz_profile').initial({seed: 73, height:47, width: 56, fontSize: 40});
    };

    $rootScope.createResourceInitials =  function () {
        $('.resource_profile').initial({seed: 73, height:47, width: 56, fontSize: 40});
    };

    $rootScope.resource_click = function (resource) {
        //alert('Clicked ' + resource.link);
        window.open(resource.link, '_blank');

        var params = {
            resource_id: resource.resourceID
        };

        // Load training session info

        $http.post('/api/v1/resource/incrementCount', params)
            .success(function (data, status, headers, config) {

            }).error(function (data, status, headers, config) {

        });
    };

    // Training Details Page
    $rootScope.SHOW_TAKE_EVALUATION = false;
    $rootScope.TRAINING_INFO = {};
    $rootScope.TRAINING_TRAINERS = [];
    $rootScope.TRAINING_RESOURCES = [];
    $rootScope.TRAINING_QUIZ = [];
    $rootScope.TRAINING_DETAILS_LOADER_MESSAGE = "Training Info";

    $rootScope.SHOW_TAKE_QUIZ = false;
    $rootScope.QUIZ_INFO = {};

    $rootScope.SUBS_INFO = {};

    $rootScope.SHOW_TRAINERS_NAV_BUT = false;
    $rootScope.SHOW_RESOURCES_NAV_BUT = false;
    $rootScope.SHOW_QUIZ_NAV_BUT = false;

    $rootScope.createLargeInitials =  function () {
        if($rootScope.TRAINING_INFO.training_name){
            $('.large_profile').initial({seed: 73, height:93, width: 93, fontSize: 40});
        }
        if($rootScope.QUIZ_INFO.quiz_name){
            $('.quiz_large_profile').initial({seed: 73, height:93, width: 93, fontSize: 40});
        }
    };

    $rootScope.loadTrainingItem = function (sessionID, plannedTrainingID) {

        $rootScope.SHOW_TRAINERS_NAV_BUT = false;
        $rootScope.SHOW_RESOURCES_NAV_BUT = false;
        $rootScope.SHOW_QUIZ_NAV_BUT = false;
        $rootScope.SHOW_TAKE_EVALUATION = false;
        $rootScope.TRAINING_TRAINERS = [];
        $rootScope.TRAINING_RESOURCES = [];
        $rootScope.TRAINING_QUIZ = [];

        $.fn.fullpage.moveTo(0, 1);

        $('#details-page').dimmer('show');

        var params = {
            session_id: sessionID,
            plannedTrainingID: plannedTrainingID
        };

        // Load training session info

        $http.post('/api/v1/training/trainingEvaluated', params)
            .success(function (data, status, headers, config) {

                $rootScope.TRAINING_DETAILS_LOADER_MESSAGE = "Evaluation Verification";

                $rootScope.SHOW_TAKE_EVALUATION = !data.data;

                $http.post('/api/v1/training/trainingInfo', params)
                    .success(function (data, status, headers, config) {

                        $rootScope.TRAINING_INFO = data.data;

                        if($rootScope.TRAINING_INFO.evaluationFormID == null) {
                            $rootScope.SHOW_TAKE_EVALUATION = false;
                        }

                        var img = document.createElement("img");
                        img.className = 'large_profile';
                        img.id = 'ppic';
                        img.style.borderRadius = '3px';
                        $(img).attr('data-name', $rootScope.TRAINING_INFO.training_name);

                        $("#ppic").remove();

                        document.getElementById('ppic_container').appendChild(img);

                        $rootScope.TRAINING_DETAILS_LOADER_MESSAGE = "External Trainers Info";

                        // Loading external trainers
                        $http.post('/api/v1/training/trainingExtTrainers', params)
                            .success(function (data, status, headers, config) {

                                $rootScope.TRAINING_TRAINERS = data.data;

                                $rootScope.TRAINING_DETAILS_LOADER_MESSAGE = "External Trainers Info";

                                // Loading internal trainers
                                $http.post('/api/v1/training/trainingIntTrainers', params)
                                    .success(function (data, status, headers, config) {

                                        $rootScope.TRAINING_TRAINERS = $rootScope.TRAINING_TRAINERS.concat(data.data);

                                        if($rootScope.TRAINING_TRAINERS.length > 0) {
                                            $rootScope.SHOW_TRAINERS_NAV_BUT = true;
                                        }

                                        // Building UI elements
                                        var trainer_slides_container = document.getElementById('trainers_slides_container');

                                        while (trainer_slides_container.hasChildNodes()) {
                                            trainer_slides_container.removeChild(trainer_slides_container.firstChild);
                                        }

                                        for(var i = 0; i < $rootScope.TRAINING_TRAINERS.length; i++){
                                            var elmt = createTrainerElement($rootScope.TRAINING_TRAINERS[i]);
                                            $('#trainers_slides_container').append(elmt);
                                        }

                                        if($rootScope.TRAINING_TRAINERS.length > 0){
                                            lory(trainerSlider, {slideSpeed: 1000});
                                        }

                                        $rootScope.TRAINING_DETAILS_LOADER_MESSAGE = "Resources Info";

                                        // Loading training resources
                                        $http.post('/api/v1/training/trainingResources', params)
                                            .success(function (data, status, headers, config) {

                                                $rootScope.TRAINING_RESOURCES = data.data;

                                                if($rootScope.TRAINING_RESOURCES.length > 0) {
                                                    $rootScope.SHOW_RESOURCES_NAV_BUT = true;
                                                }

                                                // Building UI elements
                                                var resources_slides_container = document.getElementById('resources_slides_container');

                                                while (resources_slides_container.hasChildNodes()) {
                                                    resources_slides_container.removeChild(resources_slides_container.firstChild);
                                                }

                                                for(var i = 0; i < $rootScope.TRAINING_RESOURCES.length; i++){
                                                    var elmt = createResourceElement($rootScope.TRAINING_RESOURCES[i]);
                                                    //elmt.onclick = $rootScope.resource_click(resources[i]);
                                                    $('#resources_slides_container').append(elmt);
                                                }

                                                if($rootScope.TRAINING_RESOURCES.length > 0){
                                                    lory(resourcesSlider, {slideSpeed: 1000});
                                                }

                                                $rootScope.TRAINING_DETAILS_LOADER_MESSAGE = "Quiz Info";

                                                // Loading training Quiz
                                                $http.post('/api/v1/training/trainingQuiz', params)
                                                    .success(function (data, status, headers, config) {

                                                        $rootScope.TRAINING_QUIZ = data.data;

                                                        if($rootScope.TRAINING_QUIZ.length > 0) {
                                                            $rootScope.SHOW_QUIZ_NAV_BUT = true;
                                                        }

                                                        // Building UI elements
                                                        var quiz_slides_container = document.getElementById('quiz_slides_container');

                                                        while (quiz_slides_container.hasChildNodes()) {
                                                            quiz_slides_container.removeChild(quiz_slides_container.firstChild);
                                                        }

                                                        for(var i = 0; i < $rootScope.TRAINING_QUIZ.length; i++){
                                                            var elmt = createQuizElement($rootScope.TRAINING_QUIZ[i]);
                                                            $('#quiz_slides_container').append(elmt);
                                                        }


                                                        if($rootScope.TRAINING_QUIZ.length > 0) {
                                                            lory(quizSlider, {slideSpeed: 1000});
                                                        }
                                                        $('.quiz_profile').initial({seed: 73, height: 60, width: 60, fontSize: 40});

                                                        $('#details-page').dimmer('hide');

                                                    }).error(function (data, status, headers, config) {

                                                });

                                            }).error(function (data, status, headers, config) {

                                        });

                                    }).error(function (data, status, headers, config) {

                                });


                            }).error(function (data, status, headers, config) {

                        });

                    }).error(function (data, status, headers, config) {
                });

            }).error(function (data, status, headers, config) {

            $('#registration-form').dimmer('hide');

        });

    };

    $rootScope.loadQuizItem = function (quizID, plannedTrainingID) {

        $.fn.fullpage.moveTo(0, 2);

        $('#quiz-details-page').dimmer('show');

        var params = {
            quiz_id: quizID,
            planned_training_id: plannedTrainingID
        };

        $http.post('/api/v1/quiz/quizDetails', params)
            .success(function (data, status, headers, config) {
                $rootScope.QUIZ_INFO = data.data;

                console.log($rootScope.QUIZ_INFO);

                $rootScope.SHOW_TAKE_QUIZ = !$rootScope.QUIZ_INFO.quizTaken && $rootScope.QUIZ_INFO.num_questions > 0 && $rootScope.QUIZ_INFO.can_still_take;

                var img = document.createElement("img");
                img.className = 'quiz_large_profile';
                img.id = 'qpic';
                img.style.borderRadius = '3px';
                $(img).attr('data-name', $rootScope.QUIZ_INFO.quiz_name);

                $("#qpic").remove();

                document.getElementById('qpic_container').appendChild(img);

                $('#quiz-details-page').dimmer('hide');

            }).error(function (data, status, headers, config) {

            $('#quiz-details-page').dimmer('hide');

        });

    };

    // Set currently being viewed subordinate
    $scope.current_subs = '';
    $rootScope.loadManagementItem = function (userID) {

        $.fn.fullpage.moveTo(0, 3);

        $scope.current_subs = userID;

        $('#subs-details-page').dimmer('show');

        var params = {
            user_id: userID
        };

        $http.post('/api/v1/management/subsDetails', params)
            .success(function (data, status, headers, config) {

                $rootScope.SUBS_INFO = data.data;

                $('#subs-details-page').dimmer('hide');

                $('#training_table_tab').click();

                $rootScope.loadSubsData('training_table');

                /*$http.post('/api/v1/management/subsTrainingTable', params)
                    .success(function (data, status, headers, config) {

                        $http.post('/api/v1/management/subsCalendar', params)
                            .success(function (data, status, headers, config) {

                                $http.post('/api/v1/management/quizResultsTable', params)
                                    .success(function (data, status, headers, config) {

                                        $http.post('/api/v1/management/quizResultsGraph', params)
                                            .success(function (data, status, headers, config) {


                                            }).error(function (data, status, headers, config) {

                                            $('#quiz-details-page').dimmer('hide');

                                        });

                                    }).error(function (data, status, headers, config) {

                                    $('#quiz-details-page').dimmer('hide');

                                });

                            }).error(function (data, status, headers, config) {

                            $('#quiz-details-page').dimmer('hide');

                        });

                    }).error(function (data, status, headers, config) {

                    $('#quiz-details-page').dimmer('hide');

                });*/

            }).error(function (data, status, headers, config) {

            $('#quiz-details-page').dimmer('hide');

        });


    };

    $rootScope.moveTrainingBack = function () {
        $.fn.fullpage.moveTo(0, 0);
    };

    $rootScope.moveQuizBack = function () {
        $.fn.fullpage.moveTo(0, 0);
    };

    $rootScope.moveManagementBack = function () {
        $.fn.fullpage.moveTo(0, 0);
        return false;
    };

    // Training registration

    $rootScope.registerTraining = function (session_id, user_code) {

        $('#registration-form').dimmer('show');

        var params = {
            session_id: session_id,
            user_code: user_code
        };

        $http.post('/api/v1/training/registerTraining', params)
            .success(function (data, status, headers, config) {

                $rootScope.TRAINING_INFO.can_still_take = data.data.can_still_take;

                console.log( $rootScope.TRAINING_INFO);

                $('#registration-form').dimmer('hide');

            }).error(function (data, status, headers, config) {

                $('#registration-form').dimmer('hide');

        });

    };

    function createTrainerElement(trainer) {
        var img = "/images/user_images/female.png";
        if(trainer.gender == 1) {
            img = "/images/user_images/male.png";
        }
        var element = "<li class='js_slide'> " +
                        "<div style='margin-left: 10px;'> " +
                            "<img class='ui circular image'src='" + img + "' style='width: 60px; height: 60px; margin-left: 15%;'> " +
                            "<div class='ui label' style='font-size: 10px;'> " + trainer.firstName + " " + trainer.lastName + " </div> " +
                        "</div> " +
                    "</li>";

        return element;
    }

    function createResourceElement(resource) {
        var img = "/images/user_images/document.png";
        if(resource.resourceType == "Video") {
            img = "/images/user_images/video.png";
        }else if(resource.resourceType == "Form") {
            img = "/images/user_images/form.png";
        }else if(resource.resourceType == "Audio") {
            img = "/images/user_images/audio.png";
        }
        var element = "<li class='js_slide list-item' onclick = " + "resourceClicked('" + resource.link + "')" + ">" +
                        "<div style='margin-left: 10px;'> " +
                            "<img class='ui circular image' src='" + img + "' style='width: 60px; height: 60px; margin-left: 5%;'> " +
                            "<div class='ui label' style='font-size: 10px;'> " + resource.resource_name + " </div> " +
                        "</div>" +
                    " </li>";

        return element;
    }

    function createQuizElement(quiz) {

        var element = "<li class='js_slide'> " +
                        "<div style='margin-left: 10px;'> " +
                            "<img class='ui image circular quiz_profile' data-name = '" + quiz.quiz_name + "' style='margin-left: 20%'>" +
                                " <div class='ui label' style='font-size: 10px; margin-top: 2px;'> " + quiz.quiz_name + " </div>" +
                        " </div>" +
                    " </li>";

        return element;
    }

    // Subordinates training functionalities
    $('#subs_training_start_date').val(Date.today().last().month().toString('yyyy-MM-dd'));
    $('#subs_training_end_date').val(Date.today().next().month().toString('yyyy-MM-dd'));
    $rootScope.SUBS_TRAINING_OFFSET = 0;
    $rootScope.subs_training_list = [];
    $rootScope.subs_training_list_max = 0;
    $rootScope.subs_training_list_min = 0;
    $rootScope.susb_training_list_total = 0;
    $rootScope.SUBS_DISABLE_FORWARD_NAV = true;
    $rootScope.SUBS_DISABLE_BACKWARD_NAV = true;

    $rootScope.subsLoadNext = function () {

        $rootScope.SUBS_TRAINING_OFFSET += 10;

        $rootScope.loadSubsTrainingItems();
    };

    $rootScope.subsLoadPrev = function () {
        $rootScope.SUBS_TRAINING_OFFSET -= 10;
        $rootScope.loadSubsTrainingItems();
    };

    $rootScope.loadSubsTrainingItems = function () {

        var params = {
            start_ts: $('#subs_training_start_date').val(),
            end_ts: $('#subs_training_end_date').val(),
            user_id: $scope.current_subs,
            offset: $rootScope.SUBS_TRAINING_OFFSET
        };

        $rootScope.SUBS_TRAINING_OFFSET = 0;

        $http.post('/api/v1/training/subsTrainingList', params)
            .success(function (data, status, headers, config) {
                $rootScope.subs_training_list = data.data;
                if ($rootScope.subs_training_list.length > 0) {
                    $rootScope.subs_training_list_total = $rootScope.subs_training_list[0].total;
                    $rootScope.subs_training_list_max = $rootScope.subs_training_list.length + $rootScope.SUBS_TRAINING_OFFSET;
                    $rootScope.subs_training_list_min = 1 + $rootScope.SUBS_TRAINING_OFFSET;

                    if ($rootScope.subs_training_list_max < $rootScope.subs_training_list_total) {
                        // Enable forward navigation
                        $rootScope.SUBS_DISABLE_FORWARD_NAV = false;
                    } else {
                        // Disable forward navigation
                        $rootScope.SUBS_DISABLE_FORWARD_NAV = true;
                    }
                    if ($rootScope.subs_training_list_min > 2) {
                        // Enable backward navigation
                        $rootScope.SUBS_DISABLE_BACKWARD_NAV = false;
                    } else {
                        // Disable backward navigation
                        $rootScope.SUBS_DISABLE_BACKWARD_NAV = true;
                    }

                } else {
                    $rootScope.subs_training_list_min = 0;
                    $rootScope.subs_training_list_max = 0;
                    $rootScope.subs_training_list_total = 0;
                }

                $('#content-lists').dimmer('hide');

            }).error(function (data, status, headers, config) {
            $('#content-lists').dimmer('hide');
        });

    };

    // Subordinates quiz functionalities
    $('#subs_quiz_start_date').val(Date.today().last().month().toString('yyyy-MM-dd'));
    $('#subs_quiz_end_date').val(Date.today().next().month().toString('yyyy-MM-dd'));
    $rootScope.SUBS_QUIZ_OFFSET = 0;
    $rootScope.subs_quiz_list = [];
    $rootScope.subs_quiz_list_max = 0;
    $rootScope.subs_quiz_list_min = 0;
    $rootScope.susb_quiz_list_total = 0;
    $rootScope.SUBS_DISABLE_FORWARD_NAV = true;
    $rootScope.SUBS_DISABLE_BACKWARD_NAV = true;

    $rootScope.subsLoadNext = function () {

        $rootScope.SUBS_QUIZ_OFFSET += 10;

        $rootScope.loadSubsQuizItems();
    };

    $rootScope.subsLoadPrev = function () {
        $rootScope.SUBS_QUIZ_OFFSET -= 10;
        $rootScope.loadSubsQuizItems();
    };

    $rootScope.loadSubsQuizItems = function () {

        var params = {
            start_ts: $('#subs_quiz_start_date').val(),
            end_ts: $('#subs_quiz_end_date').val(),
            user_id: $scope.current_subs,
            offset: $rootScope.SUBS_QUIZ_OFFSET
        };

        $rootScope.SUBS_quiz_OFFSET = 0;

        $http.post('/api/v1/training/subsQuizList', params)
            .success(function (data, status, headers, config) {
                $rootScope.subs_quiz_list = data.data;
                if ($rootScope.subs_quiz_list.length > 0) {
                    $rootScope.subs_quiz_list_total = $rootScope.subs_quiz_list[0].total;
                    $rootScope.subs_quiz_list_max = $rootScope.subs_quiz_list.length + $rootScope.SUBS_QUIZ_OFFSET;
                    $rootScope.subs_quiz_list_min = 1 + $rootScope.SUBS_QUIZ_OFFSET;

                    if ($rootScope.subs_quiz_list_max < $rootScope.subs_quiz_list_total) {
                        // Enable forward navigation
                        $rootScope.SUBS_DISABLE_FORWARD_NAV = false;
                    } else {
                        // Disable forward navigation
                        $rootScope.SUBS_DISABLE_FORWARD_NAV = true;
                    }
                    if ($rootScope.subs_quiz_list_min > 2) {
                        // Enable backward navigation
                        $rootScope.SUBS_DISABLE_BACKWARD_NAV = false;
                    } else {
                        // Disable backward navigation
                        $rootScope.SUBS_DISABLE_BACKWARD_NAV = true;
                    }

                } else {
                    $rootScope.subs_quiz_list_min = 0;
                    $rootScope.subs_quiz_list_max = 0;
                    $rootScope.subs_quiz_list_total = 0;
                }

                $('#content-lists').dimmer('hide');

            }).error(function (data, status, headers, config) {
            $('#content-lists').dimmer('hide');
        });

    };


    // Subordinates calendar functionalities
    var LAST_LOADED_SUBS_DATA_YEAR = Date.now().getFullYear();
    var SUBS_YEAR_DATA = [];     // Contains yearly calendar data

    // Calendar Initializations
    var subsCalendar = flatpickr("#management_training_calendar", {
        inline: true,
        weekNumbers: true,
        onMonthChange: function () {

        },
        onYearChange: function (dObj, dStr, fp, dayElem) {

            LAST_LOADED_SUBS_DATA_YEAR = fp.currentYear;
            loadSubsCalendarData();

        },
        onDayCreate: function(dObj, dStr, fp, dayElem){
            // utilize fp.currentYear, fp.currentMonth, dayElem.textContent

            var date = dayElem.dateObj;

            var current_day = Date.now().toString('yyyy-MM-dd');
            date = date.toString('yyyy-MM-dd');

            for(var i = 0; i < SUBS_YEAR_DATA.length; i++){
                if(SUBS_YEAR_DATA[i].day == date){
                    if(SUBS_YEAR_DATA[i].training.length > 0){
                        if(date < current_day) {
                            dayElem.innerHTML += "<span class='event busy'></span>";
                        }else{
                            dayElem.innerHTML += "<span class='event'></span>";
                        }
                        $(dayElem).attr("data-tooltip", SUBS_YEAR_DATA[i].training);
                    }
                }
            }
        }
    });

    $scope.LOADING_SUBS_CALENDAR = false;

    function loadSubsCalendarData() {

        var params = {
            year: LAST_LOADED_SUBS_DATA_YEAR,
            user_id: $scope.current_subs
        };

        // Make Image POST request
        $http.post('/api/v1/training/subsYearlyTrainingProgram', params)
            .success(function (data, status, headers, config) {

                var dayInYear = getDaysInYear(LAST_LOADED_SUBS_DATA_YEAR);

                var yearTraining = data.data;

                var calendarObj = [];

                // Initialize calendarObj
                for(var k = 0; k < dayInYear.length; k++) {
                    calendarObj.push({
                        day: dayInYear[k],
                        training: [],
                        sessions: []
                    })
                }

                for(var i = 0; i < dayInYear.length; i++) {
                    var day = dayInYear[i];
                    for(var j = 0; j < yearTraining.length; j++){
                        var training = yearTraining[j];
                        if(day >= training.startDay.substr(0, 10) && day <= training.endDay.substr(0, 10)){
                            calendarObj[i].training.push(training.training_name);
                            calendarObj[i].sessions.push(training.sessionID);
                        }
                    }
                }

                SUBS_YEAR_DATA = calendarObj;

                subsCalendar.redraw();

                $scope.LOADING_SUBS_CALENDAR = false;

            }).error(function (data, status, headers, config) {

        });
    }

    loadSubsCalendarData();

    $rootScope.loadSubsData = function (action) {

        if(action == 'training_table'){

            $rootScope.loadSubsTrainingItems();

        }else if(action == 'training_calendar'){

            loadSubsCalendarData();

        }else{

            $rootScope.loadSubsQuizItems();
        }

    };

    $scope.changeToPage('training');

});
