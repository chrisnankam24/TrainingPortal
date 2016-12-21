/**
 * Created by user on 11/4/2016.
 */
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
    };

    $rootScope.setSearchText = function () {
        // Set search text
        $scope.search_text = "Search " + $scope.active_page + " ...";
    }

});