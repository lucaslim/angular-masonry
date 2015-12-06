;(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular', 'Masonry'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(
            typeof angular ? angular : require('angular'),
            typeof Masonry ? Masonry : require('masonry-layout')
        );
    } else {
        root.ngMasonry = factory(angular, Masonry);
    }
}(this, function (angular, Masonry) {
    'use strict';
    angular.module('ngMasonry', [])
        .controller('masonryController', function () {
            var vm = this;

            vm.config = {};
            vm.ready = ready;
            vm.initialize = initialize;
            vm.reLayout = reLayout;

            function ready() {
                return !!vm.config && !!vm.config.masonryContainer;
            }

            function initialize() {
                var defaultOpts = {itemSelector: '[' + vm.config.masonryItem + ']'},
                    opts = !vm.config.masonryOption
                        ? defaultOpts
                        : angular.extend(defaultOpts, vm.config.masonryOption);

                vm.container = new Masonry('[' + vm.config.masonryContainer + ']', opts);
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

            function compile(element) {
                var child = element.children();
                if (child.length >= 1 && child.attr('data-masonry-item') !== undefined) {
                    var newChild = child.attr('data-masonry-after-render', '');
                    child.remove();
                    element.append(newChild);
                }

                return {
                    post: function (scope, element, attributes, controller) {
                        controller.config.masonryContainer = attributes.$attr.masonry;
                        controller.config.masonryOption = JSON.parse(attributes.masonryOptions || '{}');
                    }
                };
            }
        })
        .directive('masonryItem', function () {
            var directive = {
                restrict: 'A',
                require: '^masonry',
                priority: 1,
                link: link
            };

            return directive;

            function link(scope, element, attributes, controller) {
                if (scope.$last && controller.ready()) {
                    controller.config.masonryItem = attributes.$attr.masonryItem;
                    controller.initialize();
                }
            }
        })
        .directive('masonryAfterRender', function ($timeout) {

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
                        controller.reLayout();
                        $timeout.cancel(timeout);
                    });
                }
            }
        });
}));
