(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('sgb-screen-login', ['megazord'])
    .controller('LoginController', ['router', '$injector', '$stateParams', '$translate', function(router, $injector, $stateParams, $translate){
        var defaultLoginHandler = function(username, password) {
            //TODO: Default to rest api call instead of this dummy implementation
            return username == password;
        };

        var loginHandler = $injector.get('loginHandler');
        if(!loginHandler) {
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
},{}]},{},[1]);
