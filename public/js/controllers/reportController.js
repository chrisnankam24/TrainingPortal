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
$('#kpi2_year').dropdown();
$('#all_services').checkbox();

// Create client controller
app.controller("reportController", function ($scope, $http, $rootScope) {

    $scope.trainingYears = [2016, 2017, 2018, 2019];

    $scope.selected_services = 'all';

    $scope.all_serv = false;

    $('#kpi2_year').dropdown('set selected', '2016');

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
    }

});