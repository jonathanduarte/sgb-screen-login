'use strict';
angular.module('sgb-screen-login', ['megazord'])
    .controller('sgb-screen-login-controller', ['_router', '_screenParams', '_screen', '$scope','$timeout',
                function(_router, _screenParams, _screen, $scope, $timeout){
                    
        _screen.initialize($scope, _screenParams);
        $scope.params = $scope._screenParams; 
        $scope.clearFields = function() {
            $scope.login = {
                username: '',
                password: ''
            };
        }
        $scope.$on('$ionicView.beforeEnter', function(){
            $scope.clearFields(); 
        })

        $scope.$on('$ionicView.loaded', function() {
            if ($scope.params.triggerAnimation) {
                $timeout(function() {
                    $scope.showAnimation=true; 
                }, $scope.params.triggerTime);
            }
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
            })
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



