/**
 * Created by user on 11/14/2016.
 */


var PROPOSITION_MAPPER = []; // Contains mapping of type {questionID, response (propositionID/text) } for selected propositions

setQuestionProp = function (questionID, response) {

    for(var i = 0; i < PROPOSITION_MAPPER.length; i++){
        if(questionID == PROPOSITION_MAPPER[i].questionID){
            PROPOSITION_MAPPER[i].response = response;
            break;
        }
    }
};


// Create quiz form controller
app.controller("quizFormController", function ($scope, $rootScope, $http) {

    $scope.QUIZ_NAME = '';

    $scope.LOADING_STATE = '';


    $rootScope.loadQuizForm = function (quiz_id, planned_training_id) {

        PROPOSITION_MAPPER = []; // Reset mapper

        $scope.LOADING_STATE = '';

        $scope.PARAMS = {};

        $scope.QUIZ_ID = quiz_id;

        $scope.quiz_id = quiz_id;
        $scope.planned_training_id = planned_training_id;

        // Show form modal
        $('.quiz.long.modal').modal('show');
        // Show form modal loader
        $('#quiz-form').dimmer('show');

        var params = {
            quiz_id: quiz_id,
            planned_trining_id: planned_training_id
        };

        console.log(params);

        $http.post('/api/v1/quiz/quizForm', params)
            .success(function (data, status, headers, config) {
                var res = data.data;
                $scope.QUIZ_NAME = res.formName;

                $scope.PARAMS = res;

                // Initialise mapper
                for(var i = 0; i < res.questions.length; i++){

                    if(res.questions[i].questionType == 'MCQ'){

                        // Get correct response to include
                        var correctPropID = '';
                        for(var t=0; t <  res.questions[i].questionPropositions.length; t++){
                            if(res.questions[i].questionPropositions[t].propositionCorrect == 1){
                                correctPropID = res.questions[i].questionPropositions[t].propositionID;
                            }
                        }

                        PROPOSITION_MAPPER.push({
                            questionID: res.questions[i].questionID,
                            questionType: res.questions[i].questionType,
                            response: res.questions[i].questionPropositions[0].propositionID,
                            correctPropositionID: correctPropID
                        });
                    }else{
                        PROPOSITION_MAPPER.push({
                            questionID: res.questions[i].questionID,
                            questionType: res.questions[i].questionType,
                            response: ""
                        });
                    }
                }

                // Clear Questions
                $scope.LOADING_STATE = 'Clearing UI';
                $('.questionElement').remove();

                for(var j = 0; j < res.questions.length; j++){

                    $scope.LOADING_STATE = 'Loading question ' + (j + 1);
                    var question = {};

                    if(res.questions[j].questionType == 'MCQ'){
                        var propElmts = [];
                        for(var k = 0; k < res.questions[j].questionPropositions.length; k++){
                            var prop = res.questions[j].questionPropositions[k];
                            propElmts.push(createPropCheckElmt(prop.propositionText, k==0, res.questions[j].questionID, prop.propositionID));
                        }

                        var gps = [];
                        var t = 0;
                        while(t < propElmts.length){
                            gps.push(createPropGroupElmt(propElmts[t], propElmts[t+1]));
                            t += 2;
                        }
                        question = createQuestion(j+1, res.questions[j].questionText, gps);
                    }else{
                        question = createCommentElmt(j+1, res.questions[j].questionText, res.questions[j].questionID);
                    }

                    $('#quiz-question-list').append(question);
                }

                // Hide form loader UI
                $('#quiz-form').dimmer('hide');

            }).error(function (data, status, headers, config) {

        });

    };

    function createPropCheckElmt(propText, isChecked, questionID, propositionID) {
        var checkedText = "";

        if(isChecked){
            checkedText = "checked";
        }

        var elmt =  "<div class='eight wide field'>" +
            "<div class='ui checkbox'>" +
            "<input type='radio' name='" + questionID + "' " + checkedText + " onclick='setQuestionProp(" + questionID + ", " + propositionID + ")'>" +
            "<label>" + propText + "</label>" +
            "</div>" +
            "</div>";

        return elmt;
    }

    function createPropGroupElmt(elmt1, elmt2) {

        var group = "<div class='inline fields' style='margin-bottom: 8px;'>" + elmt1 + (elmt2== undefined ? '':elmt2) + "</div>";

        return group;
    }

    function createQuestion(index, criteriaText, groups) {

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
            "</div>" +
            "<div class='ui divider questionElement'></div>";

        return question;
    }

    function createCommentElmt(index, question_text, question_id) {
        var elmt = "<div class='ui form commentElement' style='margin-bottom: 10px;'>" +
            "<div class='field'> " +
            "<label><em style='font-weight: normal;'>" + index +  '. ' + question_text + "</em></label> " +
            "<textarea onkeyup='setQuestionProp(" + question_id + ", this.value)' rows='2' id='form-comment'></textarea>" +
            "</div>" +
            "</div>";

        return elmt;
    }

    $scope.submitForm = function (quiz_id, planned_training_id) {

        $scope.LOADING_STATE = 'Submitting form';

        // Show form loader UI
        $('#evaluation-form').dimmer('show');

        var params = {
            quiz_id: $scope.quiz_id,
            planned_training_id: $scope.planned_training_id,
            user_response: PROPOSITION_MAPPER
        };

        // Send user response to server
        $http.post('/api/v1/quiz/correctQuiz', params)
            .success(function (data, status, headers, config) {

                // Hide form loader UI
                $('#evaluation-form').dimmer('hide');

                // Set take
                $('#quiz_button').hide();

                // hide form modal
                $('.long.modal').modal('hide');

                $rootScope.loadQuizItem($scope.quiz_id, $scope.planned_training_id);

            }).error(function (data, status, headers, config) {

        });
    }

});