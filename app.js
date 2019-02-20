var myApp = angular.module('app1', []);

myApp.controller('FormController', ['$scope', 'myServices', function($scope, myServices) {
    $scope.testerName = '';
    $scope.formDisabled = true;
    $scope.error = false;

    $scope.checkValidity = function() {
        $scope.formDisabled = $scope.testerName.length >= 2 ? false : true; 
    }

    var hardCodedAnswer = [
        {
            "firstName": "Melisa",
            "lastName": "Kadosh",
            "country": "Israel",
            "device": "iPhone 6",
            "bugs": [
                {
                    "id": 1,
                    "title": "button misplaced"
                },
                {
                    "id": 4,
                    "title": "incorrect home page"
                }
            ]
        },
        {
            "firstName": "Lynda",
            "lastName": "Golumb",
            "country": "New Zealand",
            "device": "Huawei P10",
            "bugs": [
                {
                    "id": 2,
                    "title": "device is stuck"
                },
                {
                    "id": 3,
                    "title": "can't load application"
                },
                {
                    "id": 5,
                    "title": "no input validation"
                }
            ]
        },
        {
            "firstName": "Artem",
            "lastName": "Puzailov",
            "country": "Ukraine",
            "device": "Galaxy S7",
            "bugs": [
                {
                    "id": 7,
                    "title": "Chrome displays jibberish"
                }
            ]
        },
        {
            "firstName": "Rob",
            "lastName": "Rabbi",
            "country": "UK",
            "device": "Xiomi Note 5",
            "bugs": [
                {
                    "id": 11,
                    "title": "invalid text"
                },
                {
                    "id": 21,
                    "title": "shifted display"
                },
                {
                    "id": 13,
                    "title": "mis aligned buttons"
                },
                {
                    "id": 15,
                    "title": "server crash"
                }
            ]
        },
        {
            "firstName": "Neved",
            "lastName": "Dorsell",
            "country": "Sweden",
            "device": "Nokia D56",
            "bugs": [
                {
                    "id": 13,
                    "title": "slow loading"
                },
                {
                    "id": 16,
                    "title": "pixeled video"
                }
            ]
        },
        {
            "firstName": "Silvi",
            "lastName": "Rushfeld",
            "country": "Germany",
            "device": "LG G5",
            "bugs": [
                {
                    "id": 11,
                    "title": "blank end page"
                }
            ]
        },
        {
            "firstName": "Will",
            "lastName": "Debill",
            "country": "US",
            "device": "iPhone X",
            "bugs": [
                {
                    "id": 11,
                    "title": "login stuck"
                },
                {
                    "id": 21,
                    "title": "shifted display"
                }
            ]
        }
    ];

    $scope.fetchBug = function() {
        myServices.getBugs($scope.testerName).then(function(data, status) {
            $scope.res = data;
        }, function(error) {
            $scope.res = hardCodedAnswer;
            $scope.error = true;

            if (!$scope.res.length) {
                $scope.res = [$scope.res];
            }

            $scope.res.sort(function(a, b) {
                var textA = a.firstName.toUpperCase();
                var textB = b.firstName.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        });

        //$scope.res = hardCodedAnswer;
    }

    $scope.parseBugs = function(arr) {
        return arr.map(a => a.title).toString();
    }
}]);

myApp.factory('myServices', function($http) {

    return {
        getBugs: function(testerName) {
            return $http.get('https://test-api.techsee.me/api/ex/' + testerName);
        }
    };
});