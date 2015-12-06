'use strict';

var
    angular = window.angular || require('angular');

module.exports = angular.module('code.masonry.directive', [])
    .controller('masonryController', require('./masonry.controller'))
    .directive('masonry', require('./masonry.directive'))
    .directive('masonryItem', require('./masonry.item.directive'));