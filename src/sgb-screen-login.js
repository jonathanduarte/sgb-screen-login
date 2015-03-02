'use strict';

angular.module('sgb-screen-login', ['megazord'])
    .controller('LoginController', ['router', '$injector', '$stateParams', '$scope', '$translate', '$q', 'loginHandler', function(router, $injector, $stateParams, $scope, $translate, $q, loginHandlerParam){
        var defaultLoginHandler = function(username, password) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            result.resolve(username == password);
            return result.promise;
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
                        $translate('login_invalid_credentials').then(function(message){
                            alert(message);
                        });
                    }
                });
        };
    }]);