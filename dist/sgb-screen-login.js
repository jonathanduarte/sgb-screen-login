(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '_screen', '$injector', '$stateParams', '$scope', '$translate', '$q','$ionicPopup', 
                function(_router, _screenParams, _screen, $injector, $stateParams, $scope, $translate, $q, $ionicPopup){

        _screen.initialize($scope, _screenParams);

        //Screen template parameters
        $scope.companyLogo = _screenParams.companyLogo;
        $scope.userPassFields = _screenParams.userPassFields;
        $scope.clearSubmitButtons = _screenParams.clearSubmitButtons;
        $scope.enterButton = _screenParams.enterButton;

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

        $scope.enter = function(){
            _router.fireEvent({name: 'enterApp'});
        };

        $scope.clearFields = function () {
            $scope.login = {
                username: '',
                password: ''
            };
        };

        $scope.showPopup = function(message) {
            console.log('deberia mostrar')
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

                console.log("not returning"); 

                $injector.invoke(loginHandler, null, { username: $scope.login.username, password: $scope.login.password })
                    .then(function(result){
                        if(result) {
                            _router.fireEvent({name: 'loginFinished', params: {
                                username: $scope.login.username,
                                password: $scope.login.password
                            }});
                        }
                        else {
                            $scope.attemptsLeft--;
                            var msg = ($scope.attemptsLeft?'login_invalid_credentials':'Su cuenta ha sido bloqueada'); 
                            $scope.showPopup(msg);
                        }
                    });
            } else {
                var msg = ($scope.attemptsLeft?'login_invalid_credentials':'Su cuenta ha sido bloqueada'); 
                $scope.showPopup(msg);
            }
        };
    }]);




},{}]},{},[1]);
