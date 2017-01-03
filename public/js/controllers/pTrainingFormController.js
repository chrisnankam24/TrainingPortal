/**
 * Created by user on 11/16/2016.
 */

var controllerElmt = document.getElementById('planned-training-form');
var tfScope = angular.element(controllerElmt).scope();

function setController() {
    console.log('Setting tfScope');
    controllerElmt = document.getElementById('planned-training-form');
    tfScope = angular.element(controllerElmt).scope()
}

var selected_training = null;
var selected_trans_mode = null;
var selected_training_type = null;
var training_sites = [];
var training_audience = null;
var eval_form = null;

$('#pt-training').dropdown({
    forceSelection: false,
    onChange: function (value, text, $selectedItem) {

    }
});

$('#pt_service').dropdown({
    direction: 'upward',
    forceSelection: false,

    onChange: function (value, text, $selectedItem) {
        var services_id = value.split(',');
        if(services_id.length > 0){
            setController();
            tfScope.reSelectService(services_id);
        }
    }
});
$('#pt_department').dropdown({
    direction: 'upward',
    forceSelection: false,

    onChange: function (value, text, $selectedItem) {
        var departments = value.split(',');
        if(departments.length > 0){
            setController();
            tfScope.reSelectDepartment(departments);
        }
    }
});
$('#pt_direction').dropdown({
    direction: 'upward',
    forceSelection: false,

    onChange: function (value, text, $selectedItem) {
        var directions = value.split(',');
        if(directions.length > 0){
            setController();
            tfScope.reSelectDirection(directions);
        }
    }
});
$('#pt_eval_form').dropdown({
    forceSelection: false,
    onChange: function (value, text, $selectedItem) {

    }
});
$('#pt_training_audience').dropdown({

});
$('#pt_training_sites').dropdown({
    forceSelection: false,

    onChange: function(value, text, $selectedItem) {
        var ts_id = value.split(',');
        if(ts_id.length > 0){
            setController();
            tfScope.reSelectTrainingSite(ts_id);
        }
    }
});
$('#pt_training_type').dropdown({
    onChange: function (value, text, $selectedItem) {

    }
});
$('#pt_trans_mode').dropdown({
    onChange: function (value, text, $selectedItem) {

    }
});

$('#pt_resources').dropdown({forceSelection: false});

delete_participant = function (elmt) {
    var part = elmt.parentElement.parentElement.id.split(':');
    var cuid = part[0];
    var site_id = part[1];
    setController();
    tfScope.remove_participant(cuid, site_id);
    elmt.parentElement.parentElement.remove();
};

// Create Planned Training Form controller
app.controller("pTrainingFormController", function ($scope, $http, $rootScope) {

    $scope.show_audience = true;
    $scope.show_training_sites = 0;

    $scope.training_code = 'ABC2345';

    $scope.show_submit = false;

    $scope.session_duration = 2;
    $scope.max_per_session = 10;
    $scope.start_date = Date.now().toString('yyyy-MM-dd');
    $scope.conference_num = 0;
    $scope.e_learning_address = "";

    $scope.selected_services = [];
    $scope.selected_sites = [];

    $scope.SITES_CONTAINER = [];

    $scope.proccessDirection = function (directionID) { // Direction ID selected
        for(var i = 0; i < $scope.CONFIG.departments.length; i++){
            if(directionID == $scope.CONFIG.departments[i].directionID){
                $('#pt_department').dropdown('set selected', $scope.CONFIG.departments[i].departmentID);
            }
        }
    };

    $scope.proccessDepartment = function (departmentID) { // Department ID selected
        for(var i = 0; i < $scope.CONFIG.services.length; i++){
            if(departmentID == $scope.CONFIG.services[i].departmentID){
                $('#pt_service').dropdown('set selected', $scope.CONFIG.services[i].serviceID);
            }
        }
    };

    $scope.reSelectDirection = function (directions) {
        $('#pt_department').dropdown('clear');
        for(var j = 0; j < directions.length; j++) {
            for(var i = 0; i < $scope.CONFIG.departments.length; i++){
                if(directions[j] == $scope.CONFIG.departments[i].directionID){
                    $('#pt_department').dropdown('set selected', $scope.CONFIG.departments[i].directionID);
                }
            }
        }
    };

    $scope.reSelectDepartment = function (departments) {
        $('#pt_service').dropdown('clear');
        for(var j = 0; j < departments.length; j++) {
            for(var i = 0; i < $scope.CONFIG.services.length; i++){
                if(departments[j] == $scope.CONFIG.services[i].departmentID){
                    $('#pt_service').dropdown('set selected', $scope.CONFIG.services[i].serviceID);
                }
            }
        }
    };

    $scope.processService = function (serviceID) {
        $scope.selected_services.push(serviceID);
    };

    $scope.processTrainingSite = function (ts) {
        $scope.selected_sites.push(ts);
    };

    $scope.reSelectService = function (services_id) {
        $scope.selected_services = [];
        for(var i = 0; i < services_id.length; i++){
            $scope.selected_services.push(services_id[i]);
        }

        $scope.generate_participants();
    };

    $scope.reSelectTrainingSite = function (ts_id) {
        $scope.selected_sites = [];

        for(var i = 0; i < ts_id.length; i++){
            $('#pt_training_sites').dropdown('set selected', ts_id[i]);
            for(var j = 0; j < $scope.CONFIG.training_sites.length; j++){
                if(ts_id[i] == $scope.CONFIG.training_sites[j].trainingLocationID){
                    $scope.selected_sites.push($scope.CONFIG.training_sites[j]);
                }
            }
        }
    };

    $scope.alterAudience = function (val) {
        if(val == 'EXTERNE'){
            $scope.show_audience = false;
        }else{
            $scope.show_audience = true;
        }
    };

    $scope.alterTrainingMode = function (mode) {

        if(mode == 'PRESENTIEL'){
            $scope.show_training_sites = 0;
        }else if(mode == 'VIDEO-CONFERENCE'){
            $scope.show_training_sites = 1;
        }else{
            $scope.show_training_sites = 2;
        }
    };

    $scope.generate_participants = function () {

        if($scope.show_audience) {
            var error = [];

            // Get selected services
            var services_id = $scope.selected_services;

            if(services_id.length < 1){

                error.push('No service selected');

            }else if($scope.show_training_sites == 0 && $scope.selected_sites.length < 1){

                error.push('No training site selected');

            }else if($scope.show_training_sites == 1 && $scope.conference_num == 0){

                error.push('No conference number set');

            }else if($scope.show_training_sites == 2 && $scope.e_learning_address == ""){

                error.push('No E-learining address set');

            }else if($scope.training_code == ''){

                error.push('No E-learining address set');

            }

            if(error.length < 1) {

                $('#participants-block').dimmer('show');

                var sites = $scope.selected_sites;

                var params = {
                    services_id: services_id
                };

                $http.post('/api/v1/user/users_in_services', params)
                    .success(function (data, status, headers, config) {

                        var participants = data.data;

                        $scope.SITES_CONTAINER = generate_site_participants(sites, participants);

                        $('#participants-block').dimmer('hide');

                    }).error(function (data, status, headers, config) {

                    $('#participants-block').dimmer('hide');

                });
            }else{
                alert(error);
                $scope.SITES_CONTAINER = [];
            }

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
                var index = j % sites_container.length;
                part.site_id = sites_container[index].id;
                sites_container[index].participants.push(part);
            }
        }
        else{   // Participants only. Ignore sites variable
            sites_container.push({
                site_name: 'Participants',
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

    $scope.delete_participant = function (id) {
        var part = $('#' + id).parent().parent().attr('id').split(':');
        var cuid = part[0];
        var site_id = part[1];
        remove_participant(cuid, site_id);
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

                $scope.remove_participant(part_id, from_site_id);

                for(var i = 0; i < $scope.SITES_CONTAINER.length; i++){
                    if(to_site_id == $scope.SITES_CONTAINER[i].id){
                        console.log('Adding to ' + to_site_id);
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

    $scope.init_session = function (id) {

        $('.session-block').slimscroll({destroy: true});

        $('.session-block').slimscroll({
            height: '230px',
            //alwaysVisible: true
        });

        var session = document.getElementById(id);

        Sortable.create(session,{
            group: 'sessions',
            onAdd: function (evt) {

                var from_session_id = evt.from.id;
                var to_session_id = evt.to.id;
                var parts = evt.item.id.split(':');
                var part_id = parts[0];
                var firstName = parts[1];
                var lastName = parts[2];
                var region = parts[3];
                var town = parts[4];
                var site = parts[5];
                var _serviceID = parts[6];


                for(var i = 0; i < $scope.site_session_participants.length; i++){
                    for(var k = 0; k < $scope.site_session_participants[i].site_sessions.length; k++){
                        if(from_session_id == $scope.site_session_participants[i].site_sessions[k].session_id){
                            for(var t = 0; t < $scope.site_session_participants[i].site_sessions[k].session_participants.length; t++){

                                if(part_id == $scope.site_session_participants[i].site_sessions[k].session_participants[t].cuid) {
                                    $scope.site_session_participants[i].site_sessions[k].session_participants.splice(t, 1);
                                    break;
                                }

                            }
                        }
                        if(to_session_id == $scope.site_session_participants[i].site_sessions[k].session_id){
                            $scope.site_session_participants[i].site_sessions[k].session_participants.push({
                                cuid: part_id,
                                firstName: firstName,
                                lastName: lastName,
                                town: town,
                                region: region,
                                site: site,
                                _serviceID: _serviceID
                            });
                        }
                    }
                }
            }

        });

    };

    var initCount = 0;

    $scope.initForm = function () {

        try {

            if(initCount < 10) {

                $('#pt_training_audience').dropdown('set selected', 'INTERNE');
                $('#pt_training_type').dropdown('set selected', $scope.CONFIG.training_types[0].trainingType);
                $('#pt_trans_mode').dropdown('set selected', $scope.CONFIG.trans_modes[0].transmissionMode);
                $('#pt-training').dropdown('set selected', $scope.CONFIG.training[0].trainingID);
                initCount++;

            }

        }catch (error){

        }
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

    $scope.initialise = function () {
        //// Initialise Trans mode and training audience
        $('#pt_trans_mode').dropdown('set selected', 1);
        $('#pt_training_audience').dropdown('set selected', 1);
        $('#pt-details-tab .menu .item').tab();
        $('#site_id_0').click();
        for(var i = 0; i < $scope.site_session_participants.length; i++){
            $('#session_contents_' + i).slimScroll({height: '375px'});
            for(var j = 0; j < $scope.site_session_participants[i].site_sessions.length; j++){
                flatpickr("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_start_date', {enableTime: true, minDate: new Date()});
                flatpickr("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_end_date', {enableTime: true, minDate: new Date()});
                $("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_trainers').dropdown({forceSelection: false});
                try {
                    flatpickr("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_start_date', {enableTime: true, minDate: new Date()}).setDate(new Date($scope.site_session_participants[i].site_sessions[j].session_start_date));
                    flatpickr("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_end_date', {enableTime: true, minDate: new Date()}).setDate(new Date($scope.site_session_participants[i].site_sessions[j].session_end_date));
                }catch (ex){

                }

            }
        }
    };

    $scope.proceedPlanning = function () {

        $('#planned-training-form').dimmer('show');

        var site_session_participants = [];

        var colors = ['rgba(244, 67, 54, 0.4)', 'rgba(233, 30, 99, 0.4)', 'rgba(156, 39, 176, 0.4)', 'rgba(103, 58, 183, 0.4)',
            'rgba(63, 81, 181, 0.4)', 'rgba(33, 150, 243, 0.4)', 'rgba(31, 169, 244, 0.4)', 'rgba(0, 191, 212, 0.4)',
            'rgba(0, 150, 136, 0.4)', 'rgba(76, 175, 111, 0.4   )'];

        var color_index = Math.floor(Math.random() * colors.length);

        for(var i = 0; i < $scope.SITES_CONTAINER.length; i++) {

            var site_sessions = [];

            var hr_step = $scope.session_duration;

            var init_date = Date.parse($scope.start_date + ' 08:00');

            var site_participants = $scope.SITES_CONTAINER[i].participants;

            if(site_participants.length < 1){
                alert($scope.SITES_CONTAINER[i].site_name + ' has no participants. Please delete this site if necessary before Proceeding');
                return;
            }

            // Determine # of sessions
            var num_sessions = Math.ceil($scope.SITES_CONTAINER[i].participants.length / $scope.max_per_session);

            // Initialize site sessions
            for(var j = 0; j < num_sessions; j++) {

                site_sessions[j] = {
                    session_name: 'Session ' + (j+1),
                    session_id : $scope.SITES_CONTAINER[i].id + '_session_' + j,
                    session_start_date: init_date.toString('yyyy-MM-dd HH:mm'),
                    session_end_date: init_date.addHours(hr_step).toString('yyyy-MM-dd HH:mm'),
                    session_color: colors[color_index],
                    session_trainers: [],
                    session_participants : []
                };

                color_index++;
                color_index = color_index % colors.length;
            }

            for(var k = 0; k < site_participants.length; k++){
                var part = site_participants[k];
                var index = k % num_sessions;
                part.session_id = site_sessions[index].session_id;
                site_sessions[index].session_participants.push(part);
            }

            site_session_participants.push({
                site_name: $scope.SITES_CONTAINER[i].site_name,
                trainingLocationID: $scope.SITES_CONTAINER[i].trainingLocationID,
                site_id: 'site_id_' + i,
                site_sessions: site_sessions
            });
        }

        $scope.site_session_participants = site_session_participants;

        $.fn.fullpage.moveTo(0, 1);

        $('#planned-training-form').dimmer('hide');

        $scope.show_submit = true;
    };

    $scope.move_back = function () {

        $.fn.fullpage.moveTo(0, 0);

        $scope.show_submit = false;

    };

    $scope.submitPT = function () {

        var error = [];

        for(var i = 0; i < $scope.site_session_participants.length; i++){
            for(var j = 0; j < $scope.site_session_participants[i].site_sessions.length; j++){

                var trainers =  $("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_trainers').dropdown('get value').split(',');

                $scope.site_session_participants[i].site_sessions[j].session_start_date = $("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_start_date').val();
                $scope.site_session_participants[i].site_sessions[j].session_end_date = $("#" + $scope.site_session_participants[i].site_sessions[j].session_id + '_end_date').val();

                for(var k = 0; k < trainers.length; k++){
                    for(var t = 0; t < $scope.CONFIG.trainers.length; t++) {
                        if($scope.CONFIG.trainers[t].id == trainers[k]){
                            $scope.site_session_participants[i].site_sessions[j].session_trainers.push({
                                is_external: $scope.CONFIG.trainers[t].is_external,
                                id: $scope.CONFIG.trainers[t].id
                            });
                            break;
                        }
                    }

                }

                if($scope.site_session_participants[i].site_sessions[j].session_participants.length < 1) {
                    error.push('No participant selected for ' + $scope.site_session_participants[i].site_name + ', ' +  $scope.site_session_participants[i].site_sessions[j].session_name);
                }
            }
        }

        if(error.length > 0){
            alert(error);
        }else{

            $('#planned-training-form').dimmer('show');

            var resource_ids= $('#training_resources').dropdown('get value');

            var params = {
                'trainingID': $('#pt-training').dropdown('get value'),
                'trans_mode': $('#pt_trans_mode').dropdown('get value'),
                'training_type': $('#pt_training_type').dropdown('get value'),
                is_site: $scope.show_training_sites == 0,
                conference_no: $scope.conference_num,
                e_learning: $scope.e_learning_address,
                training_code: $scope.training_code,
                'session_duration': $scope.session_duration,
                'training_audience': $('#pt_training_audience').dropdown('get value'),
                'evaluationFormID': $('#pt_eval_form').dropdown('get value') == '' ? -1 : $('#pt_eval_form').dropdown('get value'),
                'training_sites': $scope.site_session_participants,
                resource_ids: resource_ids.split(',')
            };

           $http.post('/api/v1/training/PTraining', params)
                .success(function (data, status, headers, config) {

                    $.fn.fullpage.destroy('all');

                    $('#main_list_page').fullpage({
                        controlArrows: false,
                        fitToSection: false,
                        autoScrolling: false,
                        keyboardScrolling: false
                    });

                    $scope.move_back();

                    $('#planned-training-form').dimmer('hide');

                    $rootScope.changePage('planned training');

                    $('.training.long.modal').modal('hide');

                }).error(function (data, status, headers, config) {

                $('#planned-training-form').dimmer('hide');
            });
        }

    };

    $scope.doCancel = function () {

        $.fn.fullpage.destroy('all');

        $('#main_list_page').fullpage({
            controlArrows: false,
            fitToSection: false,
            autoScrolling: false,
            keyboardScrolling: false
        });

        $rootScope.changePage('planned training');

    };

    $scope.loadSessionParticipants = function (session) {

        // Load Session Participants
        $http.get('/api/v1/training/session_participants?session_id=' + session.sessionID)
            .success(function (data, status, headers, config) {

                $rootScope.CONFIG.session_part_list = data.data;

            }).error(function (data, status, headers, config) {

        });// Load services
        
    };
    
    $scope.init_session_parts = function () {
        $('.part_session_taking_status').dropdown();
    };

    $scope.set_session_taken = function (participant, taken) {

        var params = {
            sessionID: participant.sessionID,
            user_id: participant.cuid,
            taken: taken
        };

        $http.post('/api/v1/training/session_taking', params)
            .success(function (data, status, headers, config) {

                alert('Successfully modified');

            }).error(function (data, status, headers, config) {

            alert('Modification Failed');

        });

    };

    $scope.delete_pt_resource = function (resource) {

        var r = confirm('Delete ' + resource.resource_name + ' ?');

        if(r == true){

            $http.delete('/api/v1/training/ptResource?plannedTrainingID=' + $rootScope.current_pt.plannedTrainingID + '&resourceID=' + resource.resourceID)
                .success(function (data, status, headers, config) {

                    alert('Successfully deleted');

                    $rootScope.loadPtDetails();

                }).error(function (data, status, headers, config) {

                alert('Deletion Failed')

            });
        }

    }

    $scope.add_pt_resources = function () {

        var params = {
            plannedTrainingID : $rootScope.current_pt.plannedTrainingID,
            resourcesID: $('#pt_resources').dropdown('get value')
        };

        $http.post('/api/v1/training/ptResource', params)
            .success(function (data, status, headers, config) {

                alert('Successfully added');

                $rootScope.loadPtDetails();

            }).error(function (data, status, headers, config) {

            alert('Addition Failed')

        });

    }
});
