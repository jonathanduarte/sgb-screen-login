(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '_screen', '$scope', 
                function(_router, _screenParams, _screen, $scope){
                    
        _screen.initialize($scope, _screenParams);
        $scope.$on('$ionicView.beforeEnter', function(){
            $scope.login = {
                username: '',
                password: ''
            };
        })
   
        var getPlatform = function() {
            var iOS = ionic.Platform.isIOS();
            var android = ionic.Platform.isAndroid(); 
            if (iOS) return "iOS";
            if (android) return "android"; 
            return "unknown"; 
        }

        $scope.doLogin = function() {
            _router.fireEvent({
                name: 'doLogin', 
                params: {
                    platform: getPlatform(), 
                    username: $scope.login.username,
                    password: $scope.login.password
                }
            });  
        };

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
