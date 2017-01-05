/**
 * Created by user on 12/19/2016.
 */
/**
 * Created by user on 11/4/2016.
 */


// Create quiz results controller
app.controller("quizResultsController", function ($scope, $rootScope, $http) {

    $scope.isModif = false;

    $scope.show_audience = false;

    $scope.clear = function () {
        $scope.isModif = false;
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

    $scope.initResultTable = function () {

        var params = {
            dom: 'Bfrtip',
            "info": false,
            "scrollX": true,
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        };

        $('#quiz-result-table').DataTable({}).destroy();
        $('#quiz-result-table').DataTable(params);

        $('.dtWrapper .grid .row').addClass('left aligned');
        $('.dtWrapper .grid').css('margin-top', '-21px');

        $('.dt-buttons').removeClass('buttons').css('display', 'inline').css('margin-bottom', '12px');
        $('.dt-buttons .button').removeClass('buttons').addClass('circular mini').css('font-size', '10px');
        $('#quiz-result-table_filter').css('float', 'right').css('margin-bottom', '12px');
        $('#quiz-result-table_paginate').css('float', 'right').addClass('ui buttons');
        $('#quiz-result-table_paginate').css('float', 'right').css('margin-top', '7px').addClass('ui mini buttons');
        $('#quiz-result-table_paginate .paginate_button').addClass('ui button very mini');

    };

});