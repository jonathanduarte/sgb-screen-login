'use strict';

angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q', function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q){

        _screen.initialize($scope, _screenParams);

        $scope.companyLogo = _screenParams.companyLogo;
        $scope.userPassFields = _screenParams.userPassFields;
        $scope.clearSubmitButtons = _screenParams.clearSubmitButtons;
        $scope.enterButton = _screenParams.enterButton;

        var defaultLoginHandler = function(username, password) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            result.resolve(username == password);
            return result.promise;
        };

        var loginHandler;
        if(_screenParams.loginHandler) {
            loginHandler = _screenParams.loginHandler;
        }
        else {
            loginHandler = defaultLoginHandler;
        }

        $scope.login = {};

        $scope.enter = function(){
            router.fireEvent({name: 'enterApp'});
        };

        $scope.clearFields = function () {
            $scope.login = {
                username: '',
                password: ''
            };
        };

        $scope.doLogin = function() {
            //Validate username and password (if needed)
            console.log('username val is ' + _screenParams.usernameValidation);
            if(_screenParams.usernameValidation) {
                var exp = new RegExp(_screenParams.usernameValidation);
                if(!exp.test($scope.login.username)) {
                    alert($translate('login_invalid_username'));
                    return;
                }
            }

            if(_screenParams.passwordValidation) {
                var exp = new RegExp(_screenParams.passwordValidation);
                if(!exp.test($scope.login.password)) {
                    alert($translate('login_invalid_password'));
                    return;
                }
            }

            $injector.invoke(loginHandler, null, { username: $scope.login.username, password: $scope.login.password })
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