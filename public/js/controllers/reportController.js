/**
 * Created by user on 11/4/2016.
 */

$('#report_tab .menu .item').tab({});

// Create client controller
app.controller("reportController", function ($scope, $http, $rootScope) {

    $scope.updateContent = function () {

        var params = {
            date: '2016',
            services: 'all'//[1, 2, 3, 5, 8]
        };

        $http.post('/api/v1/training/usersTrainingKPI/', params)
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.users_training_list = data.data;

            }).error(function (data, status, headers, config) {


        });

        var params = {

        };

        $http.post('/api/v1/training/trainingKPI/', params)
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training_kpi_list = data.data;

            }).error(function (data, status, headers, config) {


        });

    }

});