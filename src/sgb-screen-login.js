'use strict';

angular.module('sgb-screen-login', ['megazord'])
    .controller('LoginController', ['router', '$injector', '$stateParams', '$translate', 'loginHandler', function(router, $injector, $stateParams, $translate, loginHandlerParam){
        var defaultLoginHandler = function(username, password) {
            //TODO: Default to rest api call instead of this dummy implementation
            return username == password;
        };

        var loginHandler;
        if(loginHandlerParam) {
            loginHandler = loginHandlerParam;
        }
        else {
            loginHandler = defaultLoginHandler;
        }

        $scope.login = {};

        $scope.clearFields = function () {
            $scope.login = {
                username: '',
                password: ''
            };
        };

        $scope.doLogin = function() {
            loginHandler($scope.login.username, $scope.login.password)
                .then(function(result){
                    if(result) {
                        router.fireEvent({name: 'loginFinished', params: {
                            username: $scope.login.username,
                            password: $scope.login.password
                        }});
                    }
                    else {
                        alert($translate('login_invalid_credentials'));
                    }
                });
        };
    }]);