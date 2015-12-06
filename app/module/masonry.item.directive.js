'use strict';

// @ngInject
module.exports = function () {

    var directive = {
        restrict: 'EA',
        require: '^masonry',
        link: link
    };

    return directive;

    function link(scope, element, attributes, controller) {
        if (scope.$last) {
            controller.config.masonryItem = attributes.$attr.masonryItem;

            if(controller.ready()) {
                controller.initialize();
            }
        }
    }
};