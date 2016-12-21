/**
 * Created by user on 10/27/2016.
 */

// Create login controller
app.controller("loginController", function ($scope, $rootScope, $http, $window) {

    $scope.logging_in = false;
    $scope.invalid_credentials = false;

    $scope.hideErrorMessage = function () {
        //$scope.invalid_credentials = true;
    };
    $scope.authenticate_user = function (login_params) {
        if(!login_params){
            shake_element('#login-container');
        }else{
            if(!login_params.username || !login_params.password){
                shake_element('#login-container');
            }else{
                // Set logging in
                $scope.logging_in = true;

                // Make login request
                $http.post('/api/v1/login', login_params)
                    .success(function (data, status, headers, config) {
                        $rootScope.ACCESS_TOKEN = data.access_token;
                        $window.location.href = data.redirect_url + '/?access_token=' + $rootScope.ACCESS_TOKEN;
                        $scope.logging_in = false;
                    }).error(function (data, status, headers, config) {
                    // Set error message
                    shake_element('#login-container');
                    $scope.invalid_credentials = true;
                    if(data){
                        $scope.error_message = data.message;
                    }
                    // Reset form fields
                    login_params.username = '';
                    login_params.password = '';
                    console.log(data);
                    $scope.logging_in = false;
                })
            }
        }
    }
});