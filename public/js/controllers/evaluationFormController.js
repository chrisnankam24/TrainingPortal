/**
 * Created by user on 11/10/2016.
 */

var PROPOSITION_MAPPER = []; // Contains mapping of type {criteriaID, propositionID} for selected propositions

setCriteriaProp = function (criteriaID, propositionID) {

    for(var i = 0; i < PROPOSITION_MAPPER.length; i++){
        if(criteriaID == PROPOSITION_MAPPER[i].criteriaID){
            PROPOSITION_MAPPER[i].propositionID = propositionID;
            break;
        }
    }
};

// Create evaluation form controller
app.controller("evaluationFormController", function ($scope, $rootScope, $http) {

    $scope.FORM_NAME = '';

    $scope.LOADING_STATE = '';

    $rootScope.loadEvaluationForm = function (session_id) {

        PROPOSITION_MAPPER = []; // Reset mapper

        $scope.LOADING_STATE = '';

        $scope.PARAMS = {};

        $scope.SESSION_ID = session_id;

        // Show form modal
        $('.evaluation.long.modal').modal('show');
        // Show form modal loader
        $('#evaluation-form').dimmer('show');

        var params = {
            session_id: session_id
        };

        $http.post('/api/v1/training/trainingForm', params)
            .success(function (data, status, headers, config) {
                var res = data.data;

                if(res != {}){
                    $scope.FORM_NAME = res.formName;

                    $scope.PARAMS = res;

                    // Initialise mapper
                    for(var i = 0; i < res.criteria.length; i++){
                        // Set first criteria proposition as active
                        PROPOSITION_MAPPER.push({
                            criteriaID: res.criteria[i].criteriaID,
                            propositionID: res.criteria[i].criteriaPropositions[0].propositionID,
                            criteriaComment: ''
                        });
                    }

                    // Clear and rebuild UI
                    // Clear Questions
                    $scope.LOADING_STATE = 'Clearing UI';
                    $('.questionElement').remove();
                    $('.commentElement').remove();


                    for(var j = 0; j < res.criteria.length; j++){

                        $scope.LOADING_STATE = 'Loading question ' + (j + 1);

                        var propElmts = [];
                        for(var k = 0; k < res.criteria[j].criteriaPropositions.length; k++){
                            var prop = res.criteria[j].criteriaPropositions[k];
                            propElmts.push(createPropCheckElmt(prop.propositionText, k==0, res.criteria[j].criteriaID, prop.propositionID));
                        }

                        var gps = [];
                        var t = 0;
                        while(t < propElmts.length){
                            gps.push(createPropGroupElmt(propElmts[t], propElmts[t+1]));
                            t += 2;
                        }
                        var question = createQuestion(j+1, res.criteria[j].criteriaText, gps, res.criteria[j].criteriaID);

                        $('#question-list').append(question);
                    }

                    $scope.LOADING_STATE = 'Loading comment element';

                    // Create comment and append
                    //$('#form-group').append(createCommentElmt('form-comment'));

                    // Hide form loader UI
                    $('#evaluation-form').dimmer('hide');

                }else{
                    // Hide form loader UI
                    $('#evaluation-form').dimmer('hide');
                }

            }).error(function (data, status, headers, config) {

        });

    };

    function createPropCheckElmt(propText, isChecked, criteriaID, propositionID) {
        var checkedText = "";

        if(isChecked){
            checkedText = "checked";
        }

        var elmt =  "<div class='eight wide field'>" +
                        "<div class='ui checkbox'>" +
                            "<input type='radio' name='" + criteriaID + "' " + checkedText + " onclick='setCriteriaProp(" + criteriaID + ", " + propositionID + ")'>" +
                            "<label>" + propText + "</label>" +
                        "</div>" +
                    "</div>";

        return elmt;
    }

    function createPropGroupElmt(elmt1, elmt2) {

        var group = "<div class='inline fields' style='margin-bottom: 8px;'>" + elmt1 + (elmt2== undefined ? '':elmt2) + "</div>";

        return group;
    }

    function createQuestion(index, criteriaText, groups, criteriaID) {

        var gps = "";

        for(var i = 0; i < groups.length; i++){
            gps += groups[i];
        }

        var question =  "<div class='questionElement'>" +
                            "<div>" +
                                "<em>" + index + ". " + criteriaText + "</em>" +
                            "</div>" +
                            "<div>" +
                                "<div class='ui form' style='margin-top: 10px; margin-left: 30px;'>" +
                                    "<div class='grouped fields'>" + gps  + "</div>" +
                                "</div>" +
                            "</div>" +
                            "<div class='ui form commentElement' style='margin-bottom: 10px;'>" +
                                "<div class='field'> " +
                                    "<textarea placeholder='Drop in your comment' rows='1' id='" + criteriaID + '_form_comment' + "'></textarea>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class='ui divider questionElement'></div>";

        return question;
    }

    function createCommentElmt(id) {
        var elmt = "<div class='ui form commentElement' style='margin-bottom: 10px;'>" +
                        "<div class='field'> " +
                            "<label><em>Comment</em></label> " +
                            "<textarea placeholder='Drop in your comment' rows='2' id='" + id + "'></textarea>" +
                        "</div>" +
                    "</div>";

        return elmt;
    }

    $scope.submitForm = function (session_id) {

        $scope.LOADING_STATE = 'Submitting form';

        // Show form loader UI
        //$('#evaluation-form').dimmer('show');


        for(var i = 0; i < PROPOSITION_MAPPER.length; i++){
            PROPOSITION_MAPPER[i].criteriaComment = $('#' + PROPOSITION_MAPPER[i].criteriaID + '_form_comment').val();
        }

        var params = {
            plannedTrainingID: $scope.PARAMS.plannedTrainingID,
            evaluationFormID: $scope.PARAMS.evaluationFormID,
            user_response: PROPOSITION_MAPPER
        };

        // Send user response to server
        $http.post('/api/v1/training/trainingEvaluation', params)
            .success(function (data, status, headers, config) {

                // Hide form loader UI
                $('#evaluation-form').dimmer('hide');

                // Set take evaluation
                $('#eval_button').hide();

                // hide form modal
                $('.long.modal').modal('hide');

            }).error(function (data, status, headers, config) {

        });

    }

});