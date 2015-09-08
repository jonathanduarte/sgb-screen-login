(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q){

        //Screen template parameters
        _screen.initialize($scope, _screenParams);
        $scope.data = $stateParams.data; 
        $scope.login = {
            username: '',
            passsword: ''
        };
        $scope.attemptsLeft = (_screenParams.maxAttempts?_screenParams.maxAttempts : 3); 

        //FIELD & FORM VALIDATION
        $scope.checkField = function (field,regexp) {
            if (field===undefined || !regexp) return true; 
            var exp = new RegExp(regexp);
            return (exp.test(field));
        }
        
        $scope.clearFields = function () {
            $scope.login = {
                username:'',
                password: ''
            };
        };

        $scope.checkUsername = function(field,regexp) {
            if (!$scope._screenParams.onScreenValidation) return; 
            $scope.userIcon = $scope.checkField(field,regexp);
            $scope.userIcon = $scope.login.username.length==0?undefined:$scope.userIcon;        
        }

        $scope.checkPassword = function(field,regexp) {
            if (!$scope._screenParams.onScreenValidation) return;
            $scope.passwordIcon = $scope.checkField(field,regexp);
            $scope.passwordIcon = $scope.login.password.length==0?undefined:$scope.passwordIcon;        
        }

        $scope.formValidated = function () {
            return $scope.checkField($scope.login.username, $scope._screenParams.usernameValidation) && 
                   $scope.checkField($scope.login.password, $scope._screenParams.passwordValidation);
        }

        $scope.resetForm = function() {
            $scope.clearFields(); 
            $scope.passwordIcon = undefined; 
            $scope.userIcon = undefined; 
        }

        //LOGIN HANDLER

        //Default login handler
        var defaultLoginHandler = function(username, password) {
            //TODO: Default to rest api call instead of this dummy implementation
            var result = $q.defer();
            result.resolve(username == password);
            return result.promise;
        };

        var loginHandler = (_screenParams.loginHandler?_screenParams.loginHandler : defaultLoginHandler);

        $scope.doLogin = function() {
            if ($scope.attemptsLeft>0) {

                //Validate username and password (if needed)     
                if (!$scope.formValidated()) {
                    return; 
                }
            

                $injector.invoke(loginHandler, null, { username: $scope.login.username, password: $scope.login.password })
                    .then(function(result){
                        if(result) {
                            /* If $scope.keepSession Do something */
                            _router.fireEvent({
                                name: 'loginFinished', 
                                params: {
                                    username: $scope.login.username,
                                    password: $scope.login.password
                                }
                            });
                        }
                        else {
                            $scope.attemptsLeft--;
                            $scope.resetForm(); 
                            if ($scope.attemptsLeft > 0) {
                                _router.fireEvent({
                                    name: 'loginFailed', 
                                    params: {}
                                });
                            } else {
                                $scope.resetForm();  
                                _router.fireEvent({
                                    name: 'loginBlocked', 
                                    params: {}
                                });
                            }
                        }
                    });

            } else { 
                $scope.resetForm(); 
                _router.fireEvent({
                    name: 'loginBlocked', 
                    params: {}
                });
        
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

        $scope.goTo = function(event) {
            _router.fireEvent(
                {
                 name: event, 
                 params: {}
                }
            );
        }

    }]);

},{}]},{},[1]);
