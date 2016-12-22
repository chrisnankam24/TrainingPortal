/**
 * Created by user on 11/4/2016.
 */

var $rootScope = null;
function setRootScope() {
    var $body = angular.element(document.body);
    $rootScope = $body.scope().$root;
}

// Create client controller
app.controller("clientController", function ($scope, $rootScope) {

    // Current active page
    $rootScope.active_page = "training";

    // Header page Switch follower
    $rootScope.changeToPage = function(page) {
        $.fn.fullpage.moveTo(0, 0);
        // Set active page
        $rootScope.active_page = page;
        $rootScope.setSearchText();
        $rootScope.loadListItems();
        //update URL fragment generating new history record
        //hasher.setHash(page + '/');
        //isSet = true;
    };

   /* crossroads.addRoute('training', function(){
        $('#header_training').click();
        console.log('Going to training:: ' + isSet);
        if(isSet){
            console.log('Executing');
            angular.element($('#header_training')).triggerHandler('click');
        }
        isSet = false;
    });

    crossroads.addRoute('quiz', function () {
        $('#header_quiz').click();
        console.log('Going to quiz');
        // if(!isSet){
        //     console.log('Executing');
        //     angular.element($('#header_quiz')).triggerHandler('click');
        // }
        isSet = false;

    });
    crossroads.addRoute('resources', function () {
        $('#header_resources').click();
        //angular.element($('#header_resources')).triggerHandler('click');
    });
    crossroads.addRoute('management', function () {
        $('#header_management').click();
        //angular.element($('#header_management')).triggerHandler('click');
    });
*/
    $rootScope.setSearchText = function () {
        // Set search text
        $scope.search_text = "Search " + $scope.active_page + " ...";
    }

});