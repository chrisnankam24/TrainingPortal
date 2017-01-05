/**
 * Created by user on 11/4/2016.
 */

$('#report_tab .menu .item').tab({});

var contElmt = document.getElementById('reports');
var reportScope = angular.element(contElmt).scope();

function setReportController() {
    contElmt = document.getElementById('reports');
    reportScope = angular.element(contElmt).scope();
}


$('#kpi2_services').dropdown({
    forceSelection: false,
    onChange: function (value, text, $selectedItem) {
        var services_id = value.split(',');
        if(services_id.length > 0){
            setReportController();
            reportScope.reSelectService(services_id);
        }
    }
});
$('#evol_training_start_date').flatpickr();
$('#evol_training_end_date').flatpickr();

$('#user_evol_dd').dropdown({
    forceSelection: false
});

$('#kpi2_year').dropdown();
$('#all_services').checkbox();

// Create client controller
app.controller("reportController", function ($scope, $http, $rootScope) {

    $scope.trainingYears = [2016, 2017, 2018, 2019];

    $scope.selected_services = 'all';

    $scope.all_serv = false;

    $scope.EVOL_TRAINING_OFFSET = 0;

    $scope.evol_training_list = [];

    $scope.user_default_training = [];
    $scope.user_post_timeline = [];

    $scope.EVOL_DISABLE_FORWARD_NAV = true;
    $scope.EVOL_DISABLE_BACKWARD_NAV = true;

    $scope.loadAllServices = function () {
        $scope.all_serv = !$scope.all_serv;
        if($scope.all_serv){
            $scope.selected_services = 'all';
        }else{
            $scope.selected_services = $('#kpi2_services').dropdown('get value');
        }
    };

    $scope.reSelectService = function (services_id) {
        $scope.selected_services = [];
        for(var i = 0; i < services_id.length; i++){
            $scope.selected_services.push(services_id[i]);
        }
    };

    $scope.initTable = function (kpi) {

        var params = {
            dom: 'Bfrtip',
            "info": false,
            "scrollX": true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        };

        if(kpi == 'kpi1'){
            $('#kpi1-table').DataTable({}).destroy();
            $('#kpi1-table').DataTable(params);
        }else if(kpi == 'kpi2') {
            $('#kpi2-table').DataTable({}).destroy();
            $('#kpi2-table').DataTable(params);
        }

        $('.dtWrapper .grid .row').addClass('left aligned');
        $('.dtWrapper .grid').css('margin-top', '-21px');

        $('.dt-buttons').removeClass('buttons').css('display', 'inline').css('margin-bottom', '7px');
        $('.dt-buttons .button').removeClass('buttons').addClass('circular mini').css('font-size', '10px');
        $('#kpi1-table_filter').css('float', 'right').css('margin-bottom', '7px');
        $('#kpi1-table_paginate').css('float', 'right').addClass('ui buttons');
        $('#kpi1-table_paginate').css('float', 'right').css('margin-top', '7px').addClass('ui mini buttons');
        $('#kpi1-table_paginate .paginate_button').addClass('ui button very mini');
        $('#kpi2-table_filter').css('float', 'right').css('margin-bottom', '7px');
        $('#kpi2-table_paginate').css('float', 'right').addClass('ui buttons');
        $('#kpi2-table_paginate').css('float', 'right').css('margin-top', '7px').addClass('ui mini buttons');
        $('#kpi2-table_paginate .paginate_button').addClass('ui button very mini');

    };

    $scope.updateContent = function (kpi) {

        if(kpi == 'kpi2'){

            var error = [];

            var date = Date.now().getFullYear();

            var services = $scope.selected_services;

            if($('#kpi2_year').dropdown('get value') != ''){
                date = $('#kpi2_year').dropdown('get value');
            }

            if(services == ''){
                error.push('No service(s) selected');
            }

            if(error.length > 0){
                alert(error);
            }else{

                var params = {
                    date: date,
                    services: services//[1, 2, 3, 5, 8]
                };

                $http.post('/api/v1/training/usersTrainingKPI/', params)
                 .success(function (data, status, headers, config) {

                 $rootScope.CONFIG.users_training_list = data.data;

                 $('#kpi2-table').DataTable({}).destroy();

                 }).error(function (data, status, headers, config) {


                 });

            }


        }else if(kpi == 'kpi1'){
            var params = {

            };

            $http.post('/api/v1/training/trainingKPI/', params)
                .success(function (data, status, headers, config) {

                    $rootScope.CONFIG.training_kpi_list = data.data;

                    $('#kpi1-table').DataTable({}).destroy();

                }).error(function (data, status, headers, config) {


            });

        }
    };

    $scope.loadUserEvolution = function () {

        $scope.current_user_id = $('#user_evol_dd').dropdown('get value');

        var params = {
            userID: $scope.current_user_id
        };

        $('.content').dimmer('show');

        $http.post('/api/v1/user/userDefaultTraining/', params)
            .success(function (data, status, headers, config) {

                $scope.user_default_training = data.data;

                $http.post('/api/v1/user/userPostTimeline/', params)
                    .success(function (data, status, headers, config) {

                        $scope.user_post_timeline = data.data;

                        $('.content').dimmer('hide');

                    }).error(function (data, status, headers, config) {


                });

            }).error(function (data, status, headers, config) {


        });


    };

    $scope.evolLoadNext = function () {
        $scope.EVOL_TRAINING_OFFSET += 10;
        $scope.loadEvolTrainingItems();
    };

    $scope.evolLoadPrev = function () {
        $scope.EVOL_TRAINING_OFFSET -= 10;
        $scope.loadEvolTrainingItems();
    };

    $scope.loadEvolTrainingItems = function () {

        var params = {
            start_ts: $('#evol_training_start_date').val(),
            end_ts: $('#evol_training_end_date').val(),
            user_id: $scope.current_user_id,
            offset: $scope.EVOL_TRAINING_OFFSET
        };
        
        $http.post('/api/v1/training/subsTrainingList', params)
            .success(function (data, status, headers, config) {
                $scope.evol_training_list = data.data;
                if ($scope.evol_training_list.length > 0) {
                    $scope.evol_training_list_total = $scope.evol_training_list[0].total;
                    $scope.evol_training_list_max = $scope.evol_training_list.length + $scope.EVOL_TRAINING_OFFSET;
                    $scope.evol_training_list_min = 1 + $scope.EVOL_TRAINING_OFFSET;

                    if ($scope.evol_training_list_max < $scope.evol_training_list_total) {
                        // Enable forward navigation
                        $scope.EVOL_DISABLE_FORWARD_NAV = false;
                    } else {
                        // Disable forward navigation
                        $scope.EVOL_DISABLE_FORWARD_NAV = true;
                    }
                    if ($scope.evol_training_list_min > 2) {
                        // Enable backward navigation
                        $scope.EVOL_DISABLE_BACKWARD_NAV = false;
                    } else {
                        // Disable backward navigation
                        $scope.EVOL_DISABLE_BACKWARD_NAV = true;
                    }

                } else {
                    $scope.evol_training_list_min = 0;
                    $scope.evol_training_list_max = 0;
                    $scope.evol_training_list_total = 0;
                }

                $('#content-lists').dimmer('hide');

            }).error(function (data, status, headers, config) {
            $('#content-lists').dimmer('hide');
        });

    };


});