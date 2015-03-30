(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '$injector', '$stateParams', '$scope', '$translate', '$q', function(router, _screenParams, $injector, $stateParams, $scope, $translate, $q){
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

        $scope.clearFields = function () {
            $scope.login = {
                username: '',
                password: ''
            };
        };

        $scope.doLogin = function() {
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
},{}]},{},[1]);
