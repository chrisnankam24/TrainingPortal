/**
 * Created by user on 11/4/2016.
 */

$('#proposition_list').slimScroll({height: '200px', alwaysVisible: true});
$('#quiz-question-table').slimScroll({height: '375px', alwaysVisible: true});

var controllerElmt = document.getElementById('quiz-form');
var qScope = angular.element(controllerElmt).scope();

function setQController() {
    controllerElmt = document.getElementById('quiz-form');
    qScope = angular.element(controllerElmt).scope()
}

$('#q_service').dropdown({
    direction: 'upward',
    forceSelection: false,

    onChange: function (value, text, $selectedItem) {
        var services_id = value.split(',');
        if(services_id.length > 0){
            setQController();
            qScope.reSelectService(services_id);
        }
    }
});
$('#q_department').dropdown({
    direction: 'upward',
    forceSelection: false,

    onChange: function (value, text, $selectedItem) {
        var departments = value.split(',');
        if(departments.length > 0){
            setQController();
            qScope.reSelectDepartment(departments);
        }
    }
});
$('#q_direction').dropdown({
    direction: 'upward',
    forceSelection: false,

    onChange: function (value, text, $selectedItem) {
        var directions = value.split(',');
        if(directions.length > 0){
            setQController();
            qScope.reSelectDirection(directions);
        }
    }
});

$('#quiz_pt').dropdown({
    forceSelection: false,

    onChange: function (value, text, $selectedItem) {
        setQController();
        qScope.plannedTrainingChanged();
    }
});

delete_quiz_participant = function (elmt) {
    var part = elmt.parentElement.parentElement.id.split(':');
    var cuid = part[0];
    var site_id = part[1];
    setQController();
    qScope.remove_participant(cuid, site_id);
    elmt.parentElement.parentElement.remove();
};

// Create quiz questions controller
app.controller("quizQuestionsController", function ($scope, $rootScope, $http) {
    
    $scope.question_list = [];
    $scope.proposition_list = [];
    $scope.quiz_question_title = '';
    $scope.isModif = false;
    $scope.question_id = '';

    $scope.selected_services = [];
    $scope.show_audience = false;

    $rootScope.isMCQ = true;

    $rootScope.load_questions = function () {

        var params = {
            quizID: $rootScope.current_quiz.quizID
        };

        $('#quiz-questions-list').dimmer('show');

        $http.post('/api/v1/quiz/quizQuestions', params).success(function (data, status, headers, config) {
                $scope.question_list = data.data;
                $('#quiz-questions-list').dimmer('hide');

        }).error(function (data, status, headers, config) {
            $('#quiz-questions-list').dimmer('hide');
        });
    };

    $rootScope.addProposition = function () {
        $scope.proposition_list.push({
            id: 'proposition_' + $scope.proposition_list.length,
            text: 'Enter Proposition',
            checked: false
        })
    };

    $rootScope.deleteProposition = function (prop_id) {
        for(var i = 0; i < $scope.proposition_list.length; i++){
            if($scope.proposition_list[i].id == prop_id) {
                $scope.proposition_list.splice(i, 1);
            }
        }
    };

    $rootScope.showPropositions = function () {
        $rootScope.isMCQ = !$rootScope.isMCQ;
    };

    $scope.addModifyQuestion = function () {

        for(var i = 0; i < $scope.proposition_list.length; i++){
            $scope.proposition_list[i].checked = $('#' + $scope.proposition_list[i].id).prop('checked');
        }

        var errors = [];
        var question = $scope.quiz_question_title;
        var question_id = $('#question_id').val();
        var isMCQ = $scope.isMCQ;

        if(question == ''){
            errors.push('Question text not set');
        }
        if(isMCQ == true && $scope.proposition_list.length < 2){
            errors.push('Question is MCQ but not enough propositions set');
        }
        if(errors.length > 0){
            alert(errors)
        }else{
            var params = {
                question_id: question_id,
                quiz_id: $rootScope.current_quiz.quizID,
                question_text: question,
                is_mcq: isMCQ,
                propositions: $scope.proposition_list
            };

            if($scope.isModif == false){

                $http.post('/api/v1/quiz/question', params).success(function (data, status, headers, config) {
                    alert('Addition successful');
                    $scope.proposition_list = [];
                    $scope.quiz_question_title = '';
                    $rootScope.load_questions();

                }).error(function (data, status, headers, config) {
                    alert('Addition Failed');
                });
            }else{

                $http.put('/api/v1/quiz/question', params).success(function (data, status, headers, config) {
                    alert('Update successful');
                    $scope.proposition_list = [];
                    $scope.quiz_question_title = '';
                    $rootScope.load_questions();

                }).error(function (data, status, headers, config) {
                    alert('Update Failed');
                });
            }
        }

    };
    
    $scope.deleteQuestion = function (question) {
        var r = confirm('Delete ' + question.questionID + ' ?');
        if(r == true){

            $http.delete('/api/v1/quiz/question?id=' + question.questionID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $rootScope.load_questions();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed');

            });
        }
    };
    
    $scope.startModifyQuestion = function (question) {

        $scope.isModif = true;
        $scope.question_id = question.questionID;

        if(question.question_type == 'Open'){
            $scope.quiz_question_title = question.question_title;
            $rootScope.isMCQ = false;
        }else{

            $scope.quiz_question_title = question.question_title;
            $rootScope.isMCQ = true;
            var params = {
                question_id: question.questionID
            };

            $http.post('/api/v1/quiz/questionPropositions', params).success(function (data, status, headers, config) {
                $scope.proposition_list = data.data;

                for(var i = 0; i < $scope.proposition_list.length; i++){
                    $('#' + $scope.proposition_list[i].id).prop('checked', $scope.proposition_list[i].checked);
                }

            }).error(function (data, status, headers, config) {

            });
        }

    };

    $scope.clear = function () {
        $scope.isModif = false;
        $scope.proposition_list = [];
        $scope.quiz_question_title = '';
        $scope.isMCQ = true;
        $scope.question_id = '';
    };

    $scope.addModifyQuiz = function () {

        var quiz_id = $('#quiz_id').val();
        var quiz_name = $scope.quiz_name;
        var quiz_type = $('#quiz_type').dropdown('get value');
        var quiz_pt = $('#quiz_pt').dropdown('get value');
        var quiz_sub_cat = $('#quiz_sub_category').dropdown('get value');
        var participants = $scope.SITES_CONTAINER[0].participants;

        var error = [];

        if (quiz_name == '') {
            error.push("Quiz name not set");
        }
        if (quiz_type == '') {
            error.push("Quiz type not set");
        }
        if (quiz_pt == '' && quiz_type == 'Closed') {
            error.push("Quiz pt not set");
        }
        if (quiz_sub_cat == '') {
            error.push("Quiz sub category not set");
        }

        if (error.length > 0) {
            alert(error);
        } else {
            var params = {
                quiz_id: quiz_id,
                quiz_name: quiz_name,
                plannedTrainingID: quiz_pt,
                subCategoryID: quiz_sub_cat,
                quizType: quiz_type,
                participants: participants
            };

            $scope.is_quizform_loading = true;

            if($scope.addModifText == 'Modify'){
                $http.put('/api/v1/quiz/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully modified');

                        $scope.is_quizform_loading = false;

                        $rootScope.loadItems();

                        $('.quiz.long.modal').modal('hide');

                    }).error(function (data, status, headers, config) {

                    alert('Modification Failed');

                    $scope.is_quizform_loading = false;

                    $('#quiz-list').dimmer('hide');


                });
            }else{
                $http.post('/api/v1/quiz/', params)
                    .success(function (data, status, headers, config) {

                        alert('Successfully Added');

                        $scope.is_quizform_loading = false;

                        $rootScope.loadItems();

                        $('.quiz.long.modal').modal('hide');

                    }).error(function (data, status, headers, config) {

                    alert('Addition Failed');

                    $scope.is_quizform_loading = false;

                });
            }
        }
    };

    $scope.cancel = function () {

        $('#quiz_pt').dropdown('clear');
        $('#quiz_type').dropdown('clear');
        $('#quiz_sub_category').dropdown('clear');

    };

    $scope.alterAudience = function (val) {
        if(val == 'Closed'){
            $scope.show_audience = false;
        }else{
            $scope.show_audience = true;
        }
        $scope.generate_participants();
    };

    $scope.generate_participants = function () {

        var error = [];

        // Get selected services
        var services_id = $scope.selected_services;

        var pt_id = $('#quiz_pt').dropdown('get value');

        if(error.length < 1) {

            if($scope.show_audience == true){

                $('#quiz-takers').dimmer('show');

                var sites = $scope.selected_sites;

                var params = {
                    services_id: services_id
                };

                $http.post('/api/v1/user/users_in_services', params)
                    .success(function (data, status, headers, config) {

                        var participants = data.data;

                        $scope.SITES_CONTAINER = generate_site_participants(sites, participants);

                        $('#quiz-takers').dimmer('hide');

                    }).error(function (data, status, headers, config) {

                    $('#quiz-takers').dimmer('hide');

                });

            }else{

                $('#quiz-takers').dimmer('show');

                var params = {
                    pt_id: pt_id
                };

                $http.post('/api/v1/user/users_in_planned_training', params)
                    .success(function (data, status, headers, config) {

                        var participants = data.data;

                        $scope.SITES_CONTAINER = generate_site_participants(sites, participants);

                        $('#quiz-takers').dimmer('hide');

                    }).error(function (data, status, headers, config) {

                    $('#quiz-takers').dimmer('hide');

                });

            }
        }else{
            alert(error);
            $scope.SITES_CONTAINER = [];
        }

    };

    function generate_site_participants(sites, participants) {

        // Create sites container
        var sites_container = [];

        var colors = ['rgba(244, 67, 54, 0.4)', 'rgba(233, 30, 99, 0.4)', 'rgba(156, 39, 176, 0.4)', 'rgba(103, 58, 183, 0.4)',
            'rgba(63, 81, 181, 0.4)', 'rgba(33, 150, 243, 0.4)', 'rgba(31, 169, 244, 0.4)', 'rgba(0, 191, 212, 0.4)',
            'rgba(0, 150, 136, 0.4)', 'rgba(76, 175, 111, 0.4   )'];

        var color_index = Math.floor(Math.random() * colors.length);

        if($scope.show_training_sites == 0) {   // Training Sites neccessary
            // Initialize container
            for(var i = 0; i < sites.length; i++) {
                sites_container.push({
                    site_name: sites[i].site,
                    site_color: colors[color_index],
                    region: sites[i].region,
                    town: sites[i].town,
                    id: 'site_' + i,
                    trainingLocationID: sites[i].trainingLocationID,
                    participants: []
                });
                color_index++;
                color_index = color_index % colors.length;
            }

            for(var j = 0; j < participants.length; j++){
                var part = participants[j];
                var index = Math.floor(Math.random() * (sites_container.length));
                part.site_id = sites_container[index].id;
                sites_container[index].participants.push(part);
            }
        }
        else{   // Participants only. Ignore sites variable
            sites_container.push({
                site_name: 'Takers',
                site_color: colors[color_index],
                region: null,
                town: null,
                trainingLocationID: -1,
                id: 'single_part',
                participants: []
            });

            for(var j = 0; j < participants.length; j++){
                var part = participants[j];
                part.site_id = sites_container[0].id;
                sites_container[0].participants.push(part);
            }
        }


        return sites_container;

    }

    $scope.reSelectService = function (services_id) {
        $scope.selected_services = [];
        for(var i = 0; i < services_id.length; i++){
            $scope.selected_services.push(services_id[i]);
        }
    };

    $scope.processService = function (serviceID) {
        $scope.selected_services.push(serviceID);
    };

    $scope.proccessDirection = function (directionID) { // Direction ID selected
        for(var i = 0; i < $scope.CONFIG.departments.length; i++){
            if(directionID == $scope.CONFIG.departments[i].directionID){
                $('#q_department').dropdown('set selected', $scope.CONFIG.departments[i].departmentID);
            }
        }
    };

    $scope.proccessDepartment = function (departmentID) { // Department ID selected
        for(var i = 0; i < $scope.CONFIG.services.length; i++){
            if(departmentID == $scope.CONFIG.services[i].departmentID){
                $('#q_service').dropdown('set selected', $scope.CONFIG.services[i].serviceID);
            }
        }
    };

    $scope.reSelectDirection = function (directions) {
        $('#q_department').dropdown('clear');
        for(var j = 0; j < directions.length; j++) {
            for(var i = 0; i < $scope.CONFIG.departments.length; i++){
                if(directions[j] == $scope.CONFIG.departments[i].directionID){
                    $('#q_department').dropdown('set selected', $scope.CONFIG.departments[i].directionID);
                }
            }
        }
    };

    $scope.reSelectDepartment = function (departments) {
        $('#q_service').dropdown('clear');
        for(var j = 0; j < departments.length; j++) {
            for(var i = 0; i < $scope.CONFIG.services.length; i++){
                if(departments[j] == $scope.CONFIG.services[i].departmentID){
                    $('#q_service').dropdown('set selected', $scope.CONFIG.services[i].serviceID);
                }
            }
        }
    };

    $scope.reSelectService = function (services_id) {
        $scope.selected_services = [];
        for(var i = 0; i < services_id.length; i++){
            $scope.selected_services.push(services_id[i]);
        }
        $scope.generate_participants();
    };

    $scope.plannedTrainingChanged = function () {
        $scope.generate_participants();
    };

    $scope.remove_participant = function(part_id, site_id) {

        // Create sites container
        var sites_container = $scope.SITES_CONTAINER;

        for(var i = 0; i < sites_container.length; i++){
            if(site_id == sites_container[i].id){
                for(var j = 0; j < sites_container[i].participants.length; j++){
                    if(sites_container[i].participants[j].cuid == part_id){
                        sites_container[i].participants.splice(j, 1);
                        break;
                    }
                }
                break;
            }
        }

        $scope.SITES_CONTAINER = sites_container;
    };

    $scope.initForm = function () {

        if($('#quiz_type').dropdown('get value') == '') {

            $('#quiz_type').dropdown('set selected', 'Closed');
        }
    };

    $scope.init = function (id) {

        $('.site-block').slimscroll({destroy: true});

        $('.site-block').slimscroll({
            height: '240px',
            //alwaysVisible: true
        });

        var site = document.getElementById(id);

        Sortable.create(site, {
            group: 'sites',
            onAdd: function (evt) {

                var elmt = evt.item;
                var idEl = elmt.id.split(':');
                var part_id = idEl[0];
                var from_site_id = idEl[1];
                var firstName = idEl[2];
                var lastName = idEl[3];
                var region = idEl[4];
                var site = idEl[5];
                var town = idEl[6];
                var _serviceID = idEl[7];

                var to_site_id = evt.to.id;

                elmt.id = part_id + ':' + to_site_id + ':' + firstName + ':' + lastName + ':' + region + ':' + site + ':' + town + ':' + _serviceID;

                for(var i = 0; i < $scope.SITES_CONTAINER.length; i++){
                    if(from_site_id == $scope.SITES_CONTAINER[i].id){
                        for(var j = 0; j < $scope.SITES_CONTAINER[i].participants.length; j++){
                            if($scope.SITES_CONTAINER[i].participants[j].cuid == part_id){
                                $scope.SITES_CONTAINER[i].participants.splice(j, 1);
                                break;
                            }
                        }
                    }
                    if(to_site_id == $scope.SITES_CONTAINER[i].id){
                        $scope.SITES_CONTAINER[i].participants.push({
                            cuid: part_id,
                            firstName: firstName,
                            lastName: lastName,
                            region: region,
                            site: site,
                            site_id: to_site_id,
                            town: town,
                            _serviceID: _serviceID
                        });
                        break;
                    }
                }
            }
        });

    };

});