'use strict';

angular.module('ngMasonry', [])
    .controller('masonryController', function () {
        var vm = this;

        vm.config = {};
        vm.container = undefined;
        vm.ready = ready;
        vm.initialize = initialize;
        vm.reLayout = reLayout;

        function ready() {
            return !!vm.config && !!vm.config.masonryContainer;
        }

        function initialize() {
            var defaultOpts = {itemSelector: vm.config.masonryItem},
                opts = !vm.config.masonryOptions ? defaultOpts : angular.extend(defaultOpts, vm.config.masonryOptions);

            vm.container = new Masonry(vm.config.masonryContainer, opts);

            if (typeof imagesLoaded !== 'undefined') {
                new imagesLoaded(vm.config.masonryContainer, function () {
                    vm.reLayout();
                });
            }
        }

        function reLayout() {
            vm.container.layout();
        }
    })
    .directive('masonry', function () {
        var directive = {
            restrict: 'A',
            controller: 'masonryController',
            compile: compile
        };

        return directive;

        function compile(element, attributes) {
            var flag = false,
                child = angular.element(document.querySelectorAll('[' + attributes.$attr.masonry + '] [data-masonry-item], [' + attributes.$attr.masonry + '] [masonry-item]'));

            angular.forEach(child, function (obj) {
                obj = angular.element(obj);
                if (obj.attr('ng-repeat') !== undefined || obj.attr('data-ng-repeat') !== undefined) {
                    flag = true;
                    obj.attr('data-masonry-after-render', '');
                }
            });
            return {
                pre: function (scope, element, attributes, controller) {
                    controller.config.masonryContainer = '[' + attributes.$attr.masonry + ']';
                    controller.config.masonryOptions = JSON.parse(attributes.masonryOptions || '{}');
                },
                post: function (scope, element, attributes, controller) {
                    if (!flag) {
                        controller.initialize();
                    }
                }
            };
        }
    })
    .directive('masonryItem', function () {
        var directive = {
            restrict: 'A',
            require: '^masonry',
            priority: 1,
            compile: compile
        };

        return directive;

        function compile() {
            return {
                pre: function (scope, element, attributes, controller) {
                    if (controller.config.masonryItem === undefined) {
                        controller.config.masonryItem = '[' + attributes.$attr.masonryItem + ']';
                    }
                }
            };
        }
    })
    .directive('masonryAfterRender', ["$rootScope", "$timeout", function ($rootScope,$timeout) {
        'ngInject';
        var directive = {
            restrict: 'A',
            require: '^masonry',
            priority: 0,
            link: link
        };

        return directive;

        function link(scope, element, attr, controller) {
            if (scope.$last) {
                var timeout = null;
                timeout = $timeout(function () {
                    controller.initialize();
                    $timeout.cancel(timeout);
                    $rootScope.$emit('masonryLoaded');
                });
            }
        }
    }]);
