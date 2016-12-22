/**
 * Created by user on 11/22/2016.
 */

$('#resources_link').click();
$('#report_link').click();
$('#qr_link').click();
$('#quiz_link').click();
$('#pt_link').click();
$('#training_link').click();
$('#users_link').click();
$('#posts_link').click();

$('#resource-table').slimScroll({height: '428px'});
$('#post-table').slimScroll({height: '428px'});
$('#service-table').slimScroll({height: '428px'});
$('#department-table').slimScroll({height: '428px'});
$('#direction-table').slimScroll({height: '428px'});
$('#training-table').slimScroll({height: '428px'});
$('#training_location-table').slimScroll({height: '428px'});
$('#user_location-table').slimScroll({height: '428px'});
$('#exTrainer-table').slimScroll({height: '428px'});
$('#user-table').slimScroll({height: '428px'});
$('#user_post-table').slimScroll({height: '428px'});
$('#quiz-table').slimScroll({height: '428px'});
$('#planned-training-table').slimScroll({height: '428px'});

$('#resource-type').dropdown();
$('#resource-visibility').dropdown();

$('#post_level').dropdown();
$('#post_service').dropdown();
$('#post_initial_training').dropdown({forceSelection: false});
$('#training_resources').dropdown({forceSelection: false});
$('#service_department').dropdown();
$('#department_direction').dropdown();
$('#training_location_town').dropdown();
$('#training_location_region').dropdown();
$('#user_location_town').dropdown();
$('#user_location_region').dropdown();
$('#ex_trainer_gender').dropdown();

$('#user_boss').dropdown();
$('#user_gender').dropdown();
$('#user_location').dropdown();
$('#user_contract').dropdown();
$('#user_status').dropdown();
$('#user_post').dropdown();
$('#user_post_dd').dropdown();

$('#quiz_pt').dropdown();
$('#quiz_type').dropdown();
$('#quiz_sub_category').dropdown();

flatpickr('#user_employment_date', {
});

flatpickr('#user_assignation_date', {
});

app.controller("adminController", function ($scope, $rootScope, $http) {

    // Define CONFIG variable
    $rootScope.CONFIG = {};

    $rootScope.CONFIG.training = [];

    $rootScope.CONFIG.trans_modes = [
        {
            "transmissionModeID": 1,
            "transmissionMode": "PRESENTIEL"
        },
        {
            "transmissionModeID": 2,
            "transmissionMode": "VIDEO-CONFERENCE"
        },
        {
            "transmissionModeID": 3,
            "transmissionMode": "E-LEARNING"
        }
    ];

    $rootScope.CONFIG.training_types = [
        {
            "trainingTypeID": 1,
            "trainingType": "METIERS"
        },
        {
            "trainingTypeID": 2,
            "trainingType": "OFFRES ET SERVICES"
        },
        {
            "trainingTypeID": 3,
            "trainingType": "TRANSVERSES"
        }
    ];

    $rootScope.CONFIG.training_sites = [];

    $rootScope.CONFIG.training_audience = [
        {
            "trainingAudienceID": 1,
            "trainingAudience": "INTERNE"
        },
        // {
        //     "trainingAudienceID": 2,
        //     "trainingAudience": "EXTERNE"
        // }
    ];

    $rootScope.CONFIG.evaluation_forms = [];

    $rootScope.CONFIG.posts = [];

    $rootScope.CONFIG.services = [];

    $rootScope.CONFIG.departments = [];

    $rootScope.CONFIG.directions = [];

    $rootScope.CONFIG.trainers = [];

    $rootScope.CONFIG.resources = [];

    $rootScope.CONFIG.training_region = [
        {
            "region": "Center"
        },
        {
            "region": "Littoral"
        },
        {
            "region": "North-West"
        },
        {
            "region": "South-West"
        },
        {
            "region": "West"
        },
        {
            "region": "North"
        },
        {
            "region": "NA"
        }
        ];

    $rootScope.CONFIG.training_town =  [
        {
            "town": "Yaoundé"
        },
        {
            "town": "Douala"
        },
        {
            "town": "Bamenda"
        },
        {
            "town": "Buea"
        },
        {
            "town": "Baffoussam"
        },
        {
            "town": "Garoua"
        },
        {
            "town": "NA"
        }
    ];

    $rootScope.CONFIG.user_town =  [
        {
            "town": "Yaoundé"
        },
        {
            "town": "Douala"
        },
        {
            "town": "Bamenda"
        },
        {
            "town": "Buea"
        },
        {
            "town": "Baffoussam"
        },
        {
            "town": "Garoua"
        }
    ];

    $rootScope.CONFIG.gender = [
        {
            genderID: '1',
            gender: 'Male'
        },
        {
            genderID: '0',
            gender: 'Female'
        }
    ];

    $rootScope.CONFIG.status = [
        {
            status: 'TRAINEE'
        },
        {
            status: 'MANAGER'
        },
        {
            status: 'TRAINER'
        }
    ];

    $rootScope.CONFIG.contract = [
        {
            contract: 'Interim'
        },
        {
            contract: 'CDD'
        },
        {
            contract: 'CDI'
        }
    ];

    $rootScope.CONFIG.user = [];

    $rootScope.CONFIG.sub_category = [];

    $rootScope.CONFIG.quiz_type = [
        {
            quizType: 'Open'
        },
        {
            quizType: 'Closed'
        }
    ];

    $rootScope.CONFIG.plannedTraining = [];

    $rootScope.CONFIG.userLocation = [];

    $rootScope.CONFIG.sessions_list = [];

    $rootScope.CONFIG.session_part_list = [];

    $rootScope.CONFIG.quiz_takers_list = [];

    $rootScope.CONFIG.users_training_list = [];

    $rootScope.CONFIG.training_kpi_list = [];

    var active_page = 'posts';

    $scope.RESOURCES_OFFSET = 0;
    $scope.resources_list = [];
    $scope.resources_list_max = 0;
    $scope.resources_list_min = 0;
    $scope.resources_list_total = 0;
    $scope.POSTS_OFFSET = 0;
    $scope.posts_list = [];
    $scope.posts_list_max = 0;
    $scope.posts_list_min = 0;
    $scope.posts_list_total = 0;
    $scope.SERVICES_OFFSET = 0;
    $scope.services_list = [];
    $scope.services_list_max = 0;
    $scope.services_list_min = 0;
    $scope.services_list_total = 0;
    $scope.DEPARTMENTS_OFFSET = 0;
    $scope.departments_list = [];
    $scope.departments_list_max = 0;
    $scope.departments_list_min = 0;
    $scope.departments_list_total = 0;
    $scope.DIRECTIONS_OFFSET = 0;
    $scope.directions_list = [];
    $scope.directions_list_max = 0;
    $scope.directions_list_min = 0;
    $scope.directions_list_total = 0;
    $scope.TRAINING_OFFSET = 0;
    $scope.training_list = [];
    $scope.training_list_max = 0;
    $scope.training_list_min = 0;
    $scope.training_list_total = 0;
    $scope.TRAINING_LOCATION_OFFSET = 0;
    $scope.training_location_list = [];
    $scope.training_location_list_max = 0;
    $scope.training_location_list_min = 0;
    $scope.training_location_list_total = 0;
    $scope.EXTRAINER_OFFSET = 0;
    $scope.exTrainer_list = [];
    $scope.exTrainer_list_max = 0;
    $scope.exTrainer_list_min = 0;
    $scope.exTrainer_list_total = 0;
    $scope.USER_LOCATION_OFFSET = 0;
    $scope.user_location_list = [];
    $scope.user_location_list_max = 0;
    $scope.user_location_list_min = 0;
    $scope.user_location_list_total = 0;
    $scope.USER_OFFSET = 0;
    $scope.user_list = [];
    $scope.user_list_max = 0;
    $scope.user_list_min = 0;
    $scope.user_list_total = 0;
    $scope.USER_POST_OFFSET = 0;
    $scope.user_post_list = [];
    $scope.user_post_list_max = 0;
    $scope.user_post_list_min = 0;
    $scope.user_post_list_total = 0;
    $scope.QUIZ_OFFSET = 0;
    $scope.quiz_list = [];
    $scope.quiz_list_max = 0;
    $scope.quiz_list_min = 0;
    $scope.quiz_list_total = 0;
    $scope.PT_OFFSET = 0;
    $scope.pt_list = [];
    $scope.pt_list_max = 0;
    $scope.pt_list_min = 0;
    $scope.pt_list_total = 0;

    $scope.DISABLE_FORWARD_NAV = true;
    $scope.DISABLE_BACKWARD_NAV = true;

    $scope.POSTS_ELEMENTS = [];

    $rootScope.setSearchText = function (page) {
        // Set search text
        $rootScope.search_text = "Search " + page + " ...";
    }

    $rootScope.changePage = function (page) {
        switch (page) {
            case 'posts':
                $.fn.fullpage.moveTo(0, 0);
                active_page = 'posts';
                break;
            case 'services':
                active_page = 'services';
                break;
            case 'departments':
                active_page = 'departments';
                break;
            case 'directions':
                active_page = 'directions';
                break;
            case 'users':
                $.fn.fullpage.moveTo(0, 1);
                active_page = 'users';
                break;
            case 'user location':
                active_page = 'user location';
                break;
            case 'user post':
                active_page = 'user post';
                break;
            case 'training':
                $.fn.fullpage.moveTo(0, 2);
                active_page = 'training';
                break;
            case 'training location':
                active_page = 'training location';
                break;
            case 'ex_trainers':
                active_page = 'ex_trainers';
                break;
            case 'planned training':
                $.fn.fullpage.moveTo(0, 3);
                active_page = 'planned training';
                break;
            case 'quiz':
                $.fn.fullpage.moveTo(0, 4);
                active_page = 'quiz';
                break;
            case 'questions':
                active_page = 'questions';
                break;
            case 'resources':
                $.fn.fullpage.moveTo(0, 5);
                active_page = 'resources';
                break;
        }

        $rootScope.loadItems();

        $rootScope.setSearchText(page);

    };

    $rootScope.loadItems = function () {

        // Show list loader
        $('#content-lists').dimmer('show');

        if (active_page == 'resources') {
            if($rootScope.QUERY != undefined){
                $scope.RESOURCES_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.RESOURCES_OFFSET,
                search: $rootScope.QUERY

            };

            // Make Image POST request
            $http.post('/api/v1/resource/resourceList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.resources_list = data.data;
                    if ($scope.resources_list.length > 0) {
                        $scope.resources_list_total = $scope.resources_list[0].total;
                        $scope.resources_list_max = $scope.resources_list.length + $scope.RESOURCES_OFFSET;
                        $scope.resources_list_min = 1 + $scope.RESOURCES_OFFSET;

                        if ($scope.resources_list_max < $scope.resources_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.resources_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                        $scope.RESOUCES_ELEMENTS = [];

                        for (var i = 0; i < $scope.resources_list.length; i++) {
                            $scope.RESOUCES_ELEMENTS[$scope.resources_list[i].resourceID] = false;
                        }

                    } else {
                        $scope.resources_list_min = 0;
                        $scope.resources_list_max = 0;
                        $scope.resources_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'posts'){
            if($rootScope.QUERY != undefined){
                $scope.POSTS_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.POSTS_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/post/postList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.posts_list = data.data;
                    if ($scope.posts_list.length > 0) {
                        $scope.posts_list_total = $scope.posts_list[0].total;
                        $scope.posts_list_max = $scope.posts_list.length + $scope.POSTS_OFFSET;
                        $scope.posts_list_min = 1 + $scope.POSTS_OFFSET;

                        if ($scope.posts_list_max < $scope.posts_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.posts_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                        $scope.RESOUCES_ELEMENTS = [];

                        for (var i = 0; i < $scope.posts_list.length; i++) {
                            $scope.RESOUCES_ELEMENTS[$scope.posts_list[i].postID] = false;
                        }

                    } else {
                        $scope.posts_list_min = 0;
                        $scope.posts_list_max = 0;
                        $scope.posts_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });
            $('#content-lists').dimmer('hide');
        }
        else if(active_page == 'services') {
            if($rootScope.QUERY != undefined){
                $scope.SERVICES_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.SERVICES_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/post/service/serviceList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.services_list = data.data;
                    if ($scope.services_list.length > 0) {
                        $scope.services_list_total = $scope.services_list[0].total;
                        $scope.services_list_max = $scope.services_list.length + $scope.SERVICES_OFFSET;
                        $scope.services_list_min = 1 + $scope.SERVICES_OFFSET;

                        if ($scope.services_list_max < $scope.services_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.services_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.services_list_min = 0;
                        $scope.services_list_max = 0;
                        $scope.services_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });
            
        }
        else if(active_page == 'departments') {
            if($rootScope.QUERY != undefined){
                $scope.DEPARTMENTS_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.DEPARTMENTS_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/post/department/departmentList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.departments_list = data.data;
                    if ($scope.departments_list.length > 0) {
                        $scope.departments_list_total = $scope.departments_list[0].total;
                        $scope.departments_list_max = $scope.departments_list.length + $scope.DEPARTMENTS_OFFSET;
                        $scope.departments_list_min = 1 + $scope.DEPARTMENTS_OFFSET;

                        if ($scope.departments_list_max < $scope.departments_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.departments_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.departments_list_min = 0;
                        $scope.departments_list_max = 0;
                        $scope.departments_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'directions') {
            if($rootScope.QUERY != undefined){
                $scope.DIRECTIONS_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.DIRECTIONS_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/post/direction/directionList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.directions_list = data.data;
                    if ($scope.directions_list.length > 0) {
                        $scope.directions_list_total = $scope.directions_list[0].total;
                        $scope.directions_list_max = $scope.directions_list.length + $scope.DIRECTIONS_OFFSET;
                        $scope.directions_list_min = 1 + $scope.DIRECTIONS_OFFSET;

                        if ($scope.directions_list_max < $scope.directions_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.directions_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.directions_list_min = 0;
                        $scope.directions_list_max = 0;
                        $scope.directions_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'training') {
            if($rootScope.QUERY != undefined){
                $scope.TRAINING_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.TRAINING_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/training/adminTrainingList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.training_list = data.data;
                    if ($scope.training_list.length > 0) {
                        $scope.training_list_total = $scope.training_list[0].total;
                        $scope.training_list_max = $scope.training_list.length + $scope.TRAINING_OFFSET;
                        $scope.training_list_min = 1 + $scope.TRAINING_OFFSET;

                        if ($scope.training_list_max < $scope.training_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.training_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.training_list_min = 0;
                        $scope.training_list_max = 0;
                        $scope.training_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'planned training') {
            if($rootScope.QUERY != undefined){
                $scope.PT_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.PT_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/training/PTrainingList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.pt_list = data.data;
                    if ($scope.pt_list.length > 0) {
                        $scope.pt_list_total = $scope.pt_list[0].total;
                        $scope.pt_list_max = $scope.pt_list.length + $scope.PT_OFFSET;
                        $scope.pt_list_min = 1 + $scope.PT_OFFSET;

                        if ($scope.pt_list_max < $scope.pt_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.pt_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.pt_list_min = 0;
                        $scope.pt_list_max = 0;
                        $scope.pt_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'training location') {
            if($rootScope.QUERY != undefined){
                $scope.TRAINING_LOCATION_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.TRAINING_LOCATION_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/trainingLocation/trainingLocationList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.training_location_list = data.data;
                    if ($scope.training_location_list.length > 0) {
                        $scope.training_location_list_total = $scope.training_location_list[0].total;
                        $scope.training_location_list_max = $scope.training_location_list.length + $scope.TRAINING_LOCATION_OFFSET;
                        $scope.training_location_list_min = 1 + $scope.TRAINING_LOCATION_OFFSET;

                        if ($scope.training_location_list_max < $scope.training_location_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.training_location_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.training_location_list_min = 0;
                        $scope.training_location_list_max = 0;
                        $scope.training_location_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'ex_trainers') {
            if($rootScope.QUERY != undefined){
                $scope.EXTRAINER_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.EXTRAINER_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/externalTrainer/exTrainerList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.exTrainer_list = data.data;
                    if ($scope.exTrainer_list.length > 0) {
                        $scope.exTrainer_list_total = $scope.exTrainer_list[0].total;
                        $scope.exTrainer_list_max = $scope.exTrainer_list.length + $scope.EXTRAINER_OFFSET;
                        $scope.exTrainer_list_min = 1 + $scope.EXTRAINER_OFFSET;

                        if ($scope.exTrainer_list_max < $scope.exTrainer_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.exTrainer_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.exTrainer_list_min = 0;
                        $scope.exTrainer_list_max = 0;
                        $scope.exTrainer_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'users') {
            if($rootScope.QUERY != undefined){
                $scope.USER_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.USER_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/user/userList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.user_list = data.data;
                    if ($scope.user_list.length > 0) {
                        $scope.user_list_total = $scope.user_list[0].total;
                        $scope.user_list_max = $scope.user_list.length + $scope.USER_OFFSET;
                        $scope.user_list_min = 1 + $scope.USER_OFFSET;

                        if ($scope.user_list_max < $scope.user_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.user_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.user_list_min = 0;
                        $scope.user_list_max = 0;
                        $scope.user_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });


        }
        else if(active_page == 'user location') {
            if($rootScope.QUERY != undefined){
                $scope.USER_LOCATION_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.USER_LOCATION_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/userLocation/userLocationList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.user_location_list = data.data;
                    if ($scope.user_location_list.length > 0) {
                        $scope.user_location_list_total = $scope.user_location_list[0].total;
                        $scope.user_location_list_max = $scope.user_location_list.length + $scope.USER_LOCATION_OFFSET;
                        $scope.user_location_list_min = 1 + $scope.USER_LOCATION_OFFSET;

                        if ($scope.user_location_list_max < $scope.user_location_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.user_location_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.user_location_list_min = 0;
                        $scope.user_location_list_max = 0;
                        $scope.user_location_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'user post') {
            if($rootScope.QUERY != undefined){
                $scope.USER_POST_OFFSET = 0;
            }

            var params = {
                start_ts: 'none',
                offset: $scope.USER_POST_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/userPost/userPostList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.user_post_list = data.data;
                    if ($scope.user_post_list.length > 0) {
                        $scope.user_post_list_total = $scope.user_post_list[0].total;
                        $scope.user_post_list_max = $scope.user_post_list.length + $scope.USER_POST_OFFSET;
                        $scope.user_post_list_min = 1 + $scope.USER_POST_OFFSET;

                        if ($scope.user_post_list_max < $scope.user_post_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.user_post_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.user_post_list_min = 0;
                        $scope.user_post_list_max = 0;
                        $scope.user_post_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });

        }
        else if(active_page == 'quiz') {
            if($rootScope.QUERY != undefined){
                $scope.QUIZ_OFFSET = 0;
            }
            var params = {
                start_ts: 'none',
                offset: $scope.QUIZ_OFFSET,
                search: $rootScope.QUERY
            };

            $http.post('/api/v1/quiz/adminQuizList', params)
                .success(function (data, status, headers, config) {
                    $('#content-lists').dimmer('hide');
                    $scope.quiz_list = data.data;
                    if ($scope.quiz_list.length > 0) {
                        $scope.quiz_list_total = $scope.quiz_list[0].total;
                        $scope.quiz_list_max = $scope.quiz_list.length + $scope.QUIZ_OFFSET;
                        $scope.quiz_list_min = 1 + $scope.QUIZ_OFFSET;

                        if ($scope.quiz_list_max < $scope.quiz_list_total) {
                            // Enable forward navigation
                            $scope.DISABLE_FORWARD_NAV = false;
                        } else {
                            // Disable forward navigation
                            $scope.DISABLE_FORWARD_NAV = true;
                        }
                        if ($scope.quiz_list_min > 2) {
                            // Enable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = false;
                        } else {
                            // Disable backward navigation
                            $scope.DISABLE_BACKWARD_NAV = true;
                        }

                    } else {
                        $scope.quiz_list_min = 0;
                        $scope.quiz_list_max = 0;
                        $scope.quiz_list_total = 0;
                    }

                    $('#content-lists').dimmer('hide');

                }).error(function (data, status, headers, config) {
                $('#content-lists').dimmer('hide');
            });        }
    };

    $scope.loadNext = function () {
        if (active_page == 'resources') {
            $scope.RESOURCES_OFFSET += 10;
        }else if (active_page == 'posts') {
            $scope.POSTS_OFFSET += 10;
        }else if (active_page == 'services') {
            $scope.SERVICES_OFFSET += 10;
        }else if (active_page == 'departments') {
            $scope.DEPARTMENTS_OFFSET += 10;
        }else if (active_page == 'directions') {
            $scope.DIRECTIONS_OFFSET += 10;
        }else if (active_page == 'training') {
            $scope.TRAINING_OFFSET += 10;
        }else if (active_page == 'training location') {
            $scope.TRAINING_LOCATION_OFFSET += 10;
        }else if (active_page == 'ex_trainers') {
            $scope.EXTRAINER_OFFSET += 10;
        }else if (active_page == 'user location') {
            $scope.USER_LOCATION_OFFSET += 10;
        }else if (active_page == 'users') {
            $scope.USER_OFFSET += 10;
        }else if (active_page == 'user post') {
            $scope.USER_POST_OFFSET += 10;
        }else if (active_page == 'quiz') {
            $scope.QUIZ_OFFSET += 10;
        }else if (active_page == 'planned training') {
            $scope.PT_OFFSET += 10;
        }

        $rootScope.loadItems();
    };

    $scope.loadPrev = function () {
        if (active_page == 'resources') {
            $scope.RESOURCES_OFFSET -= 10;
        }else if (active_page == 'posts') {
            $scope.POSTS_OFFSET -= 10;
        }else if (active_page == 'services') {
            $scope.SERVICES_OFFSET -= 10;
        }else if (active_page == 'departments') {
            $scope.DEPARTMENTS_OFFSET -= 10;
        }else if (active_page == 'directions') {
            $scope.DIRECTIONS_OFFSET -= 10;
        }else if (active_page == 'training') {
            $scope.TRAINING_OFFSET -= 10;
        }else if (active_page == 'training location') {
            $scope.TRAINING_LOCATION_OFFSET -= 10;
        }else if (active_page == 'ex_trainers') {
            $scope.EXTRAINER_OFFSET -= 10;
        }else if (active_page == 'user location') {
            $scope.USER_LOCATION_OFFSET -= 10;
        }else if (active_page == 'users') {
            $scope.USER_OFFSET -= 10;
        }else if (active_page == 'user post') {
            $scope.USER_POST_OFFSET -= 10;
        }else if (active_page == 'quiz') {
            $scope.QUIZ_OFFSET -= 10;
        }else if (active_page == 'planned training') {
            $scope.PT_OFFSET -= 10;
        }

        $rootScope.loadItems();
    };

    $scope.resource_name = '';
    $scope.resource_link = '';
    $scope.resource_id = -1;
    $scope.resource_type = 1;
    $scope.resource_visibility = 1;
    $scope.is_rsform_loading = false;

    $scope.addModifText = 'Modify';

    $scope.startAddResource = function () {

        $scope.addModifText = 'Add';

        $('#resources-list').dimmer('show', {closable: false});

        $scope.resource_name = '';
        $scope.resource_link = '';

    };

    $scope.startModifyResource = function (resource) {

        $scope.addModifText = 'Modify';

        $scope.resource_name = resource.resource_name;
        $scope.resource_link = resource.link;
        $scope.resource_id = resource.resourceID;
        $scope.resource_type = resource.resourceType;

        $('#resource-type').dropdown('set selected', resource.resourceType);
        $('#resource-visibility').dropdown('set selected', resource.resourceVisibility + '');

        $scope.resource_visibility = resource.resourceVisibility;

        $('#resources-list').dimmer('show', {closable: false});

    };

    $scope.addModifyResource = function () {

        var resource_id = $('#resource_id').val();
        var resource_name = $scope.resource_name;
        var resource_link = $scope.resource_link;
        var resource_type = $('#resource-type').dropdown('get value');
        var resource_visibility = $('#resource-visibility').dropdown('get value');

        var error = [];

        if (resource_name == '') {
            error.push("Resource name not set");
        }
        if (resource_link == '') {
            error.push("Resource link not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                resource_id: resource_id,
                resource_name: resource_name,
                resource_link: resource_link,
                resource_type: resource_type,
                resource_visibility: resource_visibility
            };

            $scope.is_rsform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/resource/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_rsform_loading = false;

                        $('#resources-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_rsform_loading = false;

                    $('#resources-list').dimmer('hide');


                });
            }else{
                $http.post('/api/v1/resource/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_rsform_loading = false;

                        $('#resources-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_rsform_loading = false;

                    $('#resources-list').dimmer('hide');


                });
            }
        }
    };

    $scope.deleteResource = function (resource) {

        var r = confirm('Delete ' + resource.resource_name + ' ?');
        if(r == true){
            var params = {
                resource_id: resource.resourceID
            };
            console.log(params);
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/resource?resource_id=' + resource.resourceID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#resources-list').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#resources-list').dimmer('hide');


            });
        }

    };

    $scope.cancelResourceModification = function () {

        $('#resources-list').dimmer('hide');

    };

    $scope.post_name = '';
    $scope.post_level = '';
    $scope.post_service = '';
    $scope.post_id = -1;
    $scope.is_postform_loading = false;

    $scope.startAddPost = function () {

        $scope.is_add = true;

        $scope.addModifText = 'Add';

        $('#posts-list').dimmer('show', {closable: false});

        $scope.post_name = '';
        $scope.post_level = '';
        $scope.post_service = '';

        // Load services
        $http.get('/api/v1/post/service?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.services = data.data;

            }).error(function (data, status, headers, config) {

        });
        // Load trainings
        $http.get('/api/v1/training?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training = data.data;

            }).error(function (data, status, headers, config) {

        });

    };

    $scope.startModifyPost = function (post) {

        $scope.is_add = false;

        $scope.addModifText = 'Modify';

        $scope.post_name = post.post_name;
        $scope.post_level = post.post_level;
        $scope.post_service = post.post_service;
        $scope.post_id = post.postID;

        $('#post_level').dropdown('set selected', post.level);
        $('#post_service').dropdown('set selected', post.service + '');

        $('#posts-list').dimmer('show', {closable: false});

        // Load services
        $http.get('/api/v1/post/service?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.services = data.data;

            }).error(function (data, status, headers, config) {

        });
        // Load trainings
        $http.get('/api/v1/training?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training = data.data;

            }).error(function (data, status, headers, config) {

        });

    };

    $scope.addModifyPost = function () {

        var post_id = $('#post_id').val();
        var post_name = $scope.post_name;
        var post_level = $('#post_level').dropdown('get value');
        var post_service_id = $('#post_service').dropdown('get value');
        var post_initial_training = $('#post_initial_training').dropdown('get value');

        var error = [];

        if (post_name == '') {
            error.push("Post name not set");
        }
        if (post_level == '') {
            error.push("Post level not set");
        }
        if (post_service_id == '') {
            error.push("Post service not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                post_id: post_id,
                post_name: post_name,
                post_level: post_level,
                post_service_id: post_service_id,
                initial_training: post_initial_training
            };

            $scope.is_postform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/post/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_postform_loading = false;

                        $('#posts-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_postform_loading = false;

                    $('#posts-list').dimmer('hide');


                });
            }else{
                $http.post('/api/v1/post/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_postform_loading = false;

                        $('#posts-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_postform_loading = false;

                    $('#posts-list').dimmer('hide');


                });
            }
        }
    };

    $scope.deletePost = function (post) {

        var r = confirm('Delete ' + post.post_name + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/post?post_id=' + post.postID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelPostModification = function () {

        $('#post_level').dropdown('clear');
        $('#post_service').dropdown('clear');
        $('#post_initial_training').dropdown('clear');

        $('#posts-list').dimmer('hide');

    };

    $scope.service_name = '';
    $scope.service_id = -1;
    $scope.is_serviceform_loading = false;

    $scope.startAddService = function () {

        $scope.addModifText = 'Add';

        $('#services-list').dimmer('show', {closable: false});

        $scope.service_name = '';

        // Load services
        $http.get('/api/v1/post/department?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.departments = data.data;

            }).error(function (data, status, headers, config) {

        });

    };

    $scope.startModifyService = function (service) {
        
        $scope.addModifText = 'Modify';

        $scope.service_name = service.service;
        $scope.service_id = service.serviceID;

        $('#service_department').dropdown('set selected', service.departmentID);

        $('#services-list').dimmer('show', {closable: false});

        // Load services
        $http.get('/api/v1/post/department?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.departments = data.data;

            }).error(function (data, status, headers, config) {

        });
    };

    $scope.addModifyService = function () {

        var service_id = $('#service_id').val();
        var service_name = $scope.service_name;
        var department_id = $('#service_department').dropdown('get value');

        var error = [];

        if (service_name == '') {
            error.push("Service name not set");
        }
        if (department_id == '') {
            error.push("Department not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                service_id: service_id,
                service_name: service_name,
                department_id: department_id
            };

            $scope.is_serviceform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/post/service', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_serviceform_loading = false;

                        $('#services-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_serviceform_loading = false;

                    $('#services-list').dimmer('hide');


                });
            }else{
                $http.post('/api/v1/post/service/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_serviceform_loading = false;

                        $('#services-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_serviceform_loading = false;

                    $('#services-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteService = function (service) {

        var r = confirm('Delete ' + service.service + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/post/service?id=' + service.serviceID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelServiceModification = function () {

        $('#service_department').dropdown('clear');

        $('#services-list').dimmer('hide');

    };

    $scope.department_name = '';
    $scope.department_id = -1;
    $scope.is_departmentform_loading = false;

    $scope.startAddDepartment = function () {

        $scope.addModifText = 'Add';

        $('#departments-list').dimmer('show', {closable: false});

        $scope.department_name = '';

        // Load Directions
        $http.get('/api/v1/post/direction?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.directions = data.data;

            }).error(function (data, status, headers, config) {

        });

    };

    $scope.startModifyDepartment = function (department) {

        $scope.addModifText = 'Modify';

        $scope.department_name = department.department;
        $scope.department_id = department.departmentID;

        $('#department_direction').dropdown('set selected', department.directionID);

        $('#departments-list').dimmer('show', {closable: false});

        // Load Directions
        $http.get('/api/v1/post/direction?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.directions = data.data;

            }).error(function (data, status, headers, config) {

        });
    };

    $scope.addModifyDepartment = function () {

        var department_id = $('#department_id').val();
        var department_name = $scope.department_name;
        var direction_id = $('#department_direction').dropdown('get value');

        var error = [];

        if (department_name == '') {
            error.push("Department name not set");
        }
        if (direction_id == '') {
            error.push("Direction not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                department_id: department_id,
                department_name: department_name,
                direction_id: direction_id
            };

            $scope.is_departmentform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/post/department', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_departmentform_loading = false;

                        $('#departments-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_departmentform_loading = false;

                    $('#departments-list').dimmer('hide');


                });
            }else{
                $http.post('/api/v1/post/department/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_departmentform_loading = false;

                        $('#departments-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_departmentform_loading = false;

                    $('#departments-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteDepartment = function (department) {

        var r = confirm('Delete ' + department.department + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/post/department?id=' + department.departmentID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelDepartmentModification = function () {

        $('#department_direction').dropdown('clear');

        $('#departments-list').dimmer('hide');

    };

    $scope.direction_name = '';
    $scope.direction_id = -1;
    $scope.is_directionform_loading = false;

    $scope.startAddDirection = function () {

        $scope.addModifText = 'Add';

        $('#directions-list').dimmer('show', {closable: false});

        $scope.direction_name = '';

    };

    $scope.startModifyDirection = function (direction) {

        $scope.addModifText = 'Modify';

        $scope.direction_name = direction.direction;
        $scope.direction_id = direction.directionID;

        $('#directions-list').dimmer('show', {closable: false});
    };

    $scope.addModifyDirection = function () {

        var direction_id = $('#direction_id').val();
        var direction_name = $scope.direction_name;

        var error = [];

        if (direction_name == '') {
            error.push("Direction name not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                direction_name: direction_name,
                direction_id: direction_id
            };

            $scope.is_directionform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/post/direction', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_directionform_loading = false;

                        $('#directions-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_directionform_loading = false;

                    $('#directions-list').dimmer('hide');


                });
            }else{
                $http.post('/api/v1/post/direction/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_departmentform_loading = false;

                        $('#directions-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_directionform_loading = false;

                    $('#directions-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteDirection = function (direction) {

        var r = confirm('Delete ' + direction.direction + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/post/direction?id=' + direction.directionID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelDirectionModification = function () {
        
        $('#directions-list').dimmer('hide');

    };


    $scope.training_name = '';
    $scope.training_id = -1;
    $scope.is_trainingform_loading = false;

    $scope.startAddTraining = function () {

        $scope.is_add = true;

        $scope.addModifText = 'Add';

        $('#training_resources').dropdown('clear');

        $('#training-list').dimmer('show', {closable: false});

        $scope.training_name = '';

        // Load Resources
        $http.get('/api/v1/resource?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.resources = data.data;

            }).error(function (data, status, headers, config) {

        });

    };

    $scope.startModifyTraining = function (training) {

        $scope.is_add = false;

        $scope.addModifText = 'Modify';

        $scope.training_name = training.training_name;
        $scope.training_id = training.trainingID;

        $('#training-list').dimmer('show', {closable: false});

    };

    $scope.addModifyTraining = function () {

        var training_id = $('#training_id').val();
        var training_name = $scope.training_name;
        var resource_ids= $('#training_resources').dropdown('get value');

        var error = [];

        if (training_name == '') {
            error.push("Training name not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                training_id: training_id,
                training_name: training_name,
                resource_ids: resource_ids.split(',')
            };

            $scope.is_trainingform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/training/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_trainingform_loading = false;

                        $('#training-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_trainingform_loading = false;

                    $('#training-list').dimmer('hide');


                });
            }else{
                $http.post('/api/v1/training/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_departmentform_loading = false;

                        $('#training-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_departmentform_loading = false;

                    $$('#training-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteTraining = function (training) {

        var r = confirm('Delete ' + training.training_name + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/training?id=' + training.trainingID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelTrainingModification = function () {

        $('#training_resources').dropdown('clear');

        $('#training-list').dimmer('hide');

    };

    $scope.trainingLocation_name = '';
    $scope.trainingLocation_town = '';
    $scope.trainingLocation_region = '';
    $scope.trainingLocation_id = -1;
    $scope.is_trainingform_loading = false;

    $scope.startAddTrainingLocation = function () {

        $scope.is_add = true;

        $scope.addModifText = 'Add';

        $('#training_location-list').dimmer('show', {closable: false});

        $scope.trainingLocation_name = '';

    };

    $scope.startModifyTrainingLocation = function (trainingLocation) {

        $scope.is_add = false;

        $scope.addModifText = 'Modify';

        $scope.trainingLocation_name = trainingLocation.site;
        $scope.trainingLocation_id = trainingLocation.trainingLocationID;

        $('#training_location_region').dropdown('set selected', trainingLocation.region);
        $('#training_location_town').dropdown('set selected', trainingLocation.town);

        $('#training_location-list').dimmer('show', {closable: false});

    };

    $scope.addModifyTrainingLocation = function () {

        var trainingLocation_id = $('#training_location_id').val();
        var trainingLocation_name = $scope.trainingLocation_name;
        var trainingLocation_town = $('#training_location_town').dropdown('get value');
        var trainingLocation_region = $('#training_location_region').dropdown('get value');

        var error = [];

        if (trainingLocation_name == '') {
            error.push("Training Location name not set");
        }
        if (trainingLocation_town == '') {
            error.push("Training Location town not set");
        }
        if (trainingLocation_region == '') {
            error.push("Training Location region not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                trainingLocation_id: trainingLocation_id,
                site: trainingLocation_name,
                town: trainingLocation_town,
                region: trainingLocation_region
            };

            $scope.is_trainingLocationform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/trainingLocation/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_trainingLocationform_loading = false;

                        $('#training_location-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_trainingLocationform_loading = false;

                    $('#training_location-list').dimmer('hide');

                });
            }else{
                $http.post('/api/v1/trainingLocation/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_trainingLocationform_loading = false;

                        $('#training_location-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_trainingLocationform_loading = false;

                    $('#training_location-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteTrainingLocation = function (trainingLocation) {

        var r = confirm('Delete ' + trainingLocation.site + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/trainingLocation?id=' + trainingLocation.trainingLocationID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelTrainingLocationModification = function () {

        $('#training_location-list').dimmer('hide');

    };

    $scope.ex_trainer_first_name = '';
    $scope.ex_trainer_last_name = '';
    $scope.ex_trainer_gender = '';
    $scope.ex_trainer_id = -1;
    $scope.is_extrainerform_loading = false;

    $scope.startAddExTrainer = function () {

        $scope.is_add = true;

        $scope.addModifText = 'Add';

        $('#ex_trainers-list').dimmer('show', {closable: false});

        $scope.ex_trainer_first_name = '';
        $scope.ex_trainer_last_name = '';

    };

    $scope.startModifyExTrainer = function (ExTrainer) {

        $scope.is_add = false;

        $scope.addModifText = 'Modify';

        $scope.ex_trainer_first_name = ExTrainer.firstName;
        $scope.ex_trainer_last_name = ExTrainer.lastName;
        $scope.ex_trainer_id = ExTrainer.trainerID;

        $('#ex_trainer_gender').dropdown('set selected', ExTrainer.gender + '');

        $('#ex_trainers-list').dimmer('show', {closable: false});

    };

    $scope.addModifyExTrainer = function () {

        var ex_trainer_id = $('#ex_trainer_id').val();
        var ex_trainer_first_name = $scope.ex_trainer_first_name;
        var ex_trainer_last_name = $scope.ex_trainer_last_name;
        var ex_trainer_gender = $('#ex_trainer_gender').dropdown('get value');

        var error = [];

        if (ex_trainer_first_name == '') {
            error.push("First name not set");
        }
        if (ex_trainer_last_name == '') {
            error.push("Last name not set");
        }
        if (ex_trainer_gender == '') {
            error.push("Gender not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                ex_trainer_id: ex_trainer_id,
                first_name: ex_trainer_first_name,
                last_name: ex_trainer_last_name,
                gender: ex_trainer_gender
            };

            $scope.is_extrainerform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/externalTrainer/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_extrainerform_loading = false;

                        $('#ex_trainers-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_extrainerform_loading = false;

                    $('#ex_trainers-list').dimmer('hide');

                });
            }else{
                $http.post('/api/v1/externalTrainer/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_extrainerform_loading = false;

                        $('#ex_trainers-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_extrainerform_loading = false;

                    $('#ex_trainers-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteExTrainer = function (ExTrainer) {

        var r = confirm('Delete ' + ExTrainer.firstName + ' ' + ExTrainer.lastName + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/externalTrainer?id=' + ExTrainer.trainerID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelExTrainerModification = function () {

        $('#ex_trainers-list').dimmer('hide');

    };

    $scope.userLocation_name = '';
    $scope.userLocation_town = '';
    $scope.userLocation_region = '';
    $scope.userLocation_id = -1;
    $scope.is_userform_loading = false;

    $scope.startAddUserLocation = function () {

        $scope.is_add = true;

        $scope.addModifText = 'Add';

        $('#user_location-list').dimmer('show', {closable: false});

        $scope.userLocation_name = '';

    };

    $scope.startModifyUserLocation = function (userLocation) {

        $scope.is_add = false;

        $scope.addModifText = 'Modify';

        $scope.userLocation_name = userLocation.site;
        $scope.userLocation_id = userLocation.userLocationID;

        $('#user_location_region').dropdown('set selected', userLocation.region);
        $('#user_location_town').dropdown('set selected', userLocation.town);

        $('#user_location-list').dimmer('show', {closable: false});

    };

    $scope.addModifyUserLocation = function () {

        var userLocation_id = $('#user_location_id').val();
        var userLocation_name = $scope.userLocation_name;
        var userLocation_town = $('#user_location_town').dropdown('get value');
        var userLocation_region = $('#user_location_region').dropdown('get value');

        var error = [];

        if (userLocation_name == '') {
            error.push("user Location name not set");
        }
        if (userLocation_town == '') {
            error.push("user Location town not set");
        }
        if (userLocation_region == '') {
            error.push("user Location region not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                userLocation_id: userLocation_id,
                site: userLocation_name,
                town: userLocation_town,
                region: userLocation_region
            };

            $scope.is_userLocationform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/userLocation/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_userLocationform_loading = false;

                        $('#user_location-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_userLocationform_loading = false;

                    $('#user_location-list').dimmer('hide');

                });
            }else{
                $http.post('/api/v1/userLocation/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_userLocationform_loading = false;

                        $('#user_location-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_userLocationform_loading = false;

                    $('#user_location-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteUserLocation = function (userLocation) {

        var r = confirm('Delete ' + userLocation.site + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/userLocation?id=' + userLocation.userLocationID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelUserLocationModification = function () {

        $('#user_location-list').dimmer('hide');

    };

    $scope.user_cuid = '';
    $scope.user_first_name = '';
    $scope.user_last_name = '';
    $scope.user_email = '';
    $scope.user_matricule = '';
    $scope.user_number = '';
    $scope.user_employment_date = '';

    $scope.is_userform_loading = false;

    $scope.startAddUser = function () {

        $scope.is_add = true;

        $scope.addModifText = 'Add';

        $('#users-list').dimmer('show', {closable: false});

        $scope.user_cuid = '';
        $scope.user_first_name = '';
        $scope.user_last_name = '';
        $scope.user_email = '';
        $scope.user_matricule = '';
        $scope.user_number = '';
        $scope.user_employment_date = '';

        $http.get('/api/v1/user?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.user = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/userLocation?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.userLocation = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/post?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.posts = data.data;

            }).error(function (data, status, headers, config) {

        });

    };

    $scope.startModifyUser = function (user) {

        $scope.is_add = false;

        $scope.addModifText = 'Modify';

        $scope.user_cuid = user.cuid;
        $scope.cuid = user.cuid;
        $scope.user_first_name = user.firstName;
        $scope.user_last_name = user.lastName;
        $scope.user_email = user.email;
        $scope.user_matricule = user.matricule;
        $scope.user_number = user.number;
        $scope.user_employment_date = user.employmentDate;

        $('#user_gender').dropdown('set selected', user.gender + '');
        $('#user_contract').dropdown('set selected', user.contractType);
        $('#user_status').dropdown('set selected', user.userStatus);
        $('#user_boss').dropdown('set selected', user.cuid);
        $('#user_location').dropdown('set selected', user.userLocationID);

        $('#users-list').dimmer('show', {closable: false});

        $http.get('/api/v1/user?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.user = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/userLocation?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.userLocation = data.data;

            }).error(function (data, status, headers, config) {

        });
    };

    $scope.addModifyUser = function () {

        var user_id = $('#cuid').val();
        var user_first_name = $scope.user_first_name;
        var user_last_name = $scope.user_last_name;
        var user_email = $scope.user_email;
        var user_matricule = $scope.user_matricule;
        var user_number = $scope.user_number;
        var user_employment_date = $scope.user_employment_date;
        var user_gender = $('#user_gender').dropdown('get value');
        var user_contract = $('#user_contract').dropdown('get value');
        var user_status = $('#user_status').dropdown('get value');
        var user_boss = $('#user_boss').dropdown('get value');
        var user_location = $('#user_location').dropdown('get value');
        var user_post = $('#user_post').dropdown('get value');

        var error = [];

        if (user_first_name == '') {
            error.push("user first name not set");
        }
        if (user_last_name == '') {
            error.push("user last name not set");
        }
        if (user_email == '') {
            error.push("user email not set");
        }
        if (user_number == '') {
            error.push("user number not set");
        }
        if (user_gender == '') {
            error.push("user gender not set");
        }
        if (user_contract == '') {
            error.push("user contract not set");
        }
        if (user_status == '') {
            error.push("user status not set");
        }
        if (user_post == '' && $scope.is_add == true) {
            error.push("user post not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                user_id: user_id,
                user_first_name: user_first_name,
                user_last_name: user_last_name,
                user_email: user_email,
                user_matricule: user_matricule,
                user_number: user_number,
                user_employment_date: user_employment_date,
                user_gender: user_gender,
                user_contract: user_contract,
                user_status: user_status,
                user_boss: user_boss,
                user_location: user_location,
                user_post: user_post
            };

            $scope.is_userform_loading = true;

            if($scope.addModifText == 'Modify'){
                console.log(params);
                $http.put('/api/v1/user/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_userform_loading = false;

                        $('#users-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_userform_loading = false;

                    $('#users-list').dimmer('hide');

                });
            }else{
                params.user_id = $scope.user_cuid;

                $http.post('/api/v1/user/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_userform_loading = false;

                        $('#users-list').dimmer('hide');

                        $rootScope.loadItems();

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_userform_loading = false;

                    $('#users-list').dimmer('hide');

                });
            }
        }
    };

    $scope.deleteUser = function (user) {

        var r = confirm('Delete ' + user.firstName + ' ' + user.lastName + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/user?id=' + user.cuid)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.cancelUserModification = function () {

        $('#users-list').dimmer('hide');

    };

    $scope.user_name = '';
    $scope.user_assignation_date = '';

    $scope.startReassignUserPost = function (userPost) {

        $scope.is_add = true;

        $('#user_post-list').dimmer('show', {closable: false});

        $scope.user_name = userPost.firstName + ' ' + userPost.lastName;
        $scope.cuid = userPost.cuid;
        $scope.user_assignation_date = userPost.assignationDate.substr(0, 10);
        $scope.current_post_id = userPost._postID;
        $('#user_post_dd').dropdown('set selected', userPost._postID);

        $http.get('/api/v1/post?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.posts = data.data;

            }).error(function (data, status, headers, config) {

        });
    };

    $scope.ReassignUserPost = function () {

        var current_post_id = $('#current_post_id').val();
        var cuid =$('#cuid').val();
        var postID = $('#user_post_dd').dropdown('get value');
        var assignationDate = $scope.user_assignation_date;

        var error = [];

        if(postID == ''){
            error.push("user Post not set");
        }

        if (postID == current_post_id) {
            error.push("user Post not valid");
        }
        //postID, user_id, assignationDate
        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                postID: postID,
                user_id: cuid,
                assignationDate: assignationDate
            };

            $scope.is_userPostform_loading = true;

            $http.post('/api/v1/userPost/', params)
                .success(function (data, status, headers, config) {

                    alert('Successfully modified');

                    $scope.is_userPostform_loading = false;

                    $('#user_post-list').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Modification Failed');

                $scope.is_userPostform_loading = false;

                $('#user_post-list').dimmer('hide');

            });
        }
    };

    $scope.cancelUserPostModification = function () {

        $('#user_post-list').dimmer('hide');

    };

    $rootScope.quiz_name = '';
    $rootScope.quiz_id = -1;
    $rootScope.is_quizform_loading = false;

    $scope.startModifyQuiz = function (quiz) {

        $rootScope.is_add = false;

        $('.quiz.long.modal').modal('show');

        $rootScope.addModifText = 'Modify';

        $rootScope.quiz_name = quiz.quiz_name;
        $rootScope.quiz_id = quiz.quizID;

        $('#quiz_pt').dropdown('set selected', quiz.plannedTrainingID + '');
        $('#quiz_type').dropdown('set selected', quiz.quizType + '');
        $('#quiz_sub_category').dropdown('set selected', quiz.subCategoryID);

        $http.get('/api/v1/subs/sub_cat?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.sub_category = data.data;

            }).error(function (data, status, headers, config) {

            });

        $http.get('/api/v1/training/pt?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.plannedTraining = data.data;

            }).error(function (data, status, headers, config) {

        });


    };

    $scope.deleteQuiz = function (quiz) {

        var r = confirm('Delete ' + quiz.quiz_name + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/quiz?id=' + quiz.quizID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.startAddQuiz = function () {

        $('.quiz.long.modal').modal('show');

        $rootScope.addModifText = 'Add';

        $rootScope.quiz_name = '';
        $rootScope.quiz_id = -1;
        $('#quiz_pt').dropdown('clear');
        $('#quiz_type').dropdown('clear');
        $('#quiz_sub_category').dropdown('clear');


        $http.get('/api/v1/post/service?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.services = data.data;

            }).error(function (data, status, headers, config) {

        });// Load services
        $http.get('/api/v1/trainingLocation?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training_sites = data.data;

            }).error(function (data, status, headers, config) {

        });
        $http.get('/api/v1/post/department?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.departments = data.data;

            }).error(function (data, status, headers, config) {
        });
        $http.get('/api/v1/post/direction?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.directions = data.data;

            }).error(function (data, status, headers, config) {

        });
        $http.get('/api/v1/subs/sub_cat?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.sub_category = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/training/pt?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.plannedTraining = data.data;

            }).error(function (data, status, headers, config) {

        });

    };
    
    $scope.startAddPt = function () {

        // Load services
        $http.get('/api/v1/post/service?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.services = data.data;

            }).error(function (data, status, headers, config) {

        });// Load services
        $http.get('/api/v1/trainingLocation?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training_sites = data.data;

            }).error(function (data, status, headers, config) {

        });
        $http.get('/api/v1/post/department?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.departments = data.data;

            }).error(function (data, status, headers, config) {
        });
        $http.get('/api/v1/post/direction?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.directions = data.data;

            }).error(function (data, status, headers, config) {

        });
        // Load trainings
        $http.get('/api/v1/training?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training = data.data;

            }).error(function (data, status, headers, config) {

        });
        // Load trainings
        $http.get('/api/v1/training/trainersList')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.trainers = data.data;

            }).error(function (data, status, headers, config) {

        });
        $http.get('/api/v1/training/eval_report')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.evaluation_forms = data.data;

            }).error(function (data, status, headers, config) {

        });

        $.fn.fullpage.destroy('all');

        $('#pt_page').fullpage({
            controlArrows: false,
            fitToSection: false,
            autoScrolling: false,
            keyboardScrolling: false
        });

        $('.training.long.modal').modal('show');

    };

    $scope.startPtSessions = function (pt) {

        // Load Sessions of PT
        $http.get('/api/v1/training/sessions?pt_id=' + pt.plannedTrainingID)
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.sessions_list = data.data;

            }).error(function (data, status, headers, config) {

        });// Load services

        $('.sessions.long.modal').modal('show');

    };

    $scope.deletePt = function (pt) {

        var r = confirm('Delete ' + pt.training_name + ' ?');
        if(r == true){
            // Show list loader
            $('#content-lists').dimmer('show');

            $http.delete('/api/v1/training/pt?id=' + pt.plannedTrainingID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $('#content-lists').dimmer('hide');

                    $rootScope.loadItems();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

                $('#content-lists').dimmer('hide');


            });
        }

    };

    $scope.startQuizQuestions = function (quiz) {
        $rootScope.current_quiz = quiz;
        $('.quiz-questions.long.modal').modal('show');
        $rootScope.load_questions();
    };

    $scope.startQuizResults = function (quiz) {

        // Load Quiz Takers
        $http.get('/api/v1/quiz/takers?quiz_id=' + quiz.quizID)
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.quiz_takers_list = data.data;

            }).error(function (data, status, headers, config) {

        });

        $('.quiz_result.long.modal').modal('show');

    };

    $rootScope.showReports = function () {

        $('.report.long.modal').modal('show');

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

        $('#report_1').click();
    }
    
    $rootScope.notifyTraining = function (plannedTrainingID) {

        var params = {
            plannedTrainingID: plannedTrainingID
        };

        $scope.is_userPostform_loading = true;

        $http.post('/api/v1/training/notify', params)
            .success(function (data, status, headers, config) {

                alert('Successfully notified');


            }).error(function (data, status, headers, config) {

            alert('Notification Failed');

        });

    }

    function init() {

        $http.get('/api/v1/user?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.user = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/userLocation?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.userLocation = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/post?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.posts = data.data;

            }).error(function (data, status, headers, config) {

        });

        // Load services
        $http.get('/api/v1/post/service?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.services = data.data;

            }).error(function (data, status, headers, config) {

        });
        // Load trainings
        $http.get('/api/v1/training?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training = data.data;

            }).error(function (data, status, headers, config) {

        });

        // Load services
        $http.get('/api/v1/post/department?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.departments = data.data;

            }).error(function (data, status, headers, config) {

        });

        // Load Directions
        $http.get('/api/v1/post/direction?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.directions = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/post?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.posts = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/subs/sub_cat?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.sub_category = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/training/pt?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.plannedTraining = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/trainingLocation?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.training_sites = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/subs/sub_cat?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.sub_category = data.data;

            }).error(function (data, status, headers, config) {

        });

        $http.get('/api/v1/training/pt?id=all')
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.plannedTraining = data.data;

            }).error(function (data, status, headers, config) {

        });


    }

    init();

    $rootScope.changePage('planned training');

});