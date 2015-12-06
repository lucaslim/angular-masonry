'use strict';

// @ngInject
module.exports = function () {

    var directive = {
        restrict: 'EA',
        controller: 'masonryController',
        link: link,
    };

    return directive;

    function link(scope, element, attributes, controller) {
        controller.config.masonryContainer = attributes.$attr.masonry;
        controller.config.masonryOption = JSON.parse(attributes.masonryOptions);
    }
};