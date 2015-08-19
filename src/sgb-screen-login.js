'use strict';
angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q, $ionicPopup){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = $stateParams.data; 

        //Dummy implementation for blocked account
        $scope.attemptsLeft = (_screenParams.maxAttempts?_screenParams.maxAttempts : 3); 

        var defaultLoginHandler = function(username, password) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            result.resolve(username == password);
            return result.promise;
        };

        var loginHandler = (_screenParams.loginHandler?_screenParams.loginHandler : defaultLoginHandler);
        $scope.login = {};
        
        $scope.clearFields = function () {
            $scope.login = {
                username:'',
                password: ''
            };
        };

        $scope.showPopup = function(message) {
            $translate(message).then(function(result){
               var alertPopup = $ionicPopup.alert({
                   title: result
                });
                alertPopup.then(function(res) {
                    $scope.clearFields();
                });
            }); 
        }

        $scope.checkField = function (regexp, field) {
            if(regexp) {
                var exp = new RegExp(regexp);
                return (exp.test(field));
            }
            return true; 
        }

        $scope.doLogin = function() {
            console.log($scope.login.username);
            if ($scope.attemptsLeft>0) {
                //Validate username and password (if needed)
                //console.log('username val is ' + _screenParams.usernameValidation);

                if (!($scope.checkField(_screenParams.usernameValidation, $scope.login.username))) {
                    $scope.showPopup('login_invalid_username');
                    return; 
                }
                if (!($scope.checkField(_screenParams.passwordValidation, $scope.login.password))) {
                    $scope.showPopup('login_invalid_password');
                    return; 
                }

                $injector.invoke(loginHandler, null, { username: $scope.login.username, password: $scope.login.password })
                    .then(function(result){
                        if(result) {
                            /* If $scope.keepSession Do something */
                            _router.fireEvent({name: 'loginFinished', params: {
                                username: $scope.login.username,
                                password: $scope.login.password
                            }});
                        }
                        else {
                            $scope.attemptsLeft--;
                            var msg = ($scope.attemptsLeft?'login_invalid_credentials':'login_attempts_reached'); 
                            $scope.showPopup(msg);
                        }
                    });
            } else { 
                $scope.showPopup('login_blocked');
            }
        };

        $scope.forgotPass = function () {
            _router.fireEvent(
                {
                 name: 'forgotPassword', 
                 params: {}
                }
            );
        }


        $scope.extraParams = {
            username: $scope.login.username,
            password: $scope.login.password, 
            loginFunction : $scope.doLogin
        };

    }]);



