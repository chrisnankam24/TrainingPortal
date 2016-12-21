/**
 * Created by user on 11/7/2016.
 */
/**
 * Created by user on 11/4/2016.
 */
// Create client controller
app.controller("headerController", function ($scope, $rootScope, $http, $window) {

    // Image Processing
    $scope.is_image_processing = false;

    // User logging out
    $scope.is_logging_out = false;

    $rootScope.QUERY = undefined;

    // User image process type
    $scope.image_process = "Loading";

    // Perform search
    $scope.perform_search = function () {
        $rootScope.QUERY = $scope.search_request;

        $rootScope.loadListItems();
    };

    // Perform search
    $scope.perform_admin_search = function () {
        $rootScope.QUERY = $scope.search_request;

        $rootScope.loadItems();
    };

    // Set user image load button functionality
    $scope.uploadUserImg = function () {
        $('#uploadUserImage').trigger('click');
    };

    // Handle user image upload
    $scope.handleUserImageUpload =function(files) {
        var selected_file = files[0];
        var img = document.getElementById('userImage');
        img.classList.add("obj");
        img.file = selected_file;

        $scope.image_process = "Loading";

        // Process selected file
        var reader = new FileReader();
        reader.onload = function (e) {

            var image_params = {
                content: e.target.result
            };

            // set image processing to true
            $scope.is_image_processing = true;

            // Show loading dimmer
            $("#userImageContainer").dimmer('show');

            // Set User Image container loading

            // Make Image POST request
            $http.post('/api/v1/user/image', image_params)
                .success(function (data, status, headers, config) {
                    img.src = e.target.result;
                    $scope.is_image_processing = false;
                    $('.user-information .image').dimmer('toggle');

                }).error(function (data, status, headers, config) {
                $scope.is_image_processing = false;
                $('.user-information .image').dimmer('toggle');
            });

        };

        reader.readAsDataURL(selected_file);
    };

    $scope.clearUserImg = function () {

        // set image processing to true
        $scope.is_image_processing = true;

        $scope.image_process = "Clearing";

        // Delete User Image request
        $http.delete('/api/v1/user/image')
            .success(function (data, status, headers, config) {
                var img = document.getElementById('userImage');
                img.src = data.image;
                $scope.is_image_processing = false;
                $('.user-information .image').dimmer('toggle');

            }).error(function (data, status, headers, config) {
            $scope.is_image_processing = false;
            $('.user-information .image').dimmer('toggle');
        });
    };

    $scope.close_search = function () {
        $('#header-menu-shape').shape('flip down');
        $scope.search_request = '';
        $rootScope.QUERY = undefined;
        $rootScope.loadListItems();
    };

    $scope.close_admin_search = function () {
        $('#header-menu-shape').shape('flip down');
        $scope.search_request = '';
        $rootScope.QUERY = undefined;
        $rootScope.loadItems();
    };

    // Handle user log out
    $scope.logOut = function () {
        $scope.is_logging_out = true;

        // Make Log out request
        $http.get('/api/v1/logout/')
            .success(function (data, status, headers, config) {
                $window.location.href = data.redirect_url;
                $scope.is_logging_out = false;
            }).error(function (data, status, headers, config) {
            $scope.is_image_processing = false;

        });

    };

    $scope.goToAdmin = function () {
        $window.location.href = window.location.origin + '/trainer';
    };

    $scope.goToTrainee = function () {
        $window.location.href = window.location.origin + '/trainee';
    }

});