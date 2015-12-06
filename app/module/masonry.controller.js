'use strict';

var
    angular = window.angular || require('angular'),
    masonry = require('masonry-layout');

// @ngInject
module.exports = function () {
    var vm = this;

    vm.config = {};
    vm.postRender = null;
    vm.ready = ready;
    vm.initialize = initialize;

    function ready() {
        return !!vm.config && !!vm.config.masonryContainer && !!vm.config.masonryItem;
    }

    function initialize() {

        var
            defaultOpts = {itemSelector: '[' + vm.config.masonryItem + ']'},
            opts = !vm.config.masonryOption
                ? defaultOpts
                : angular.extend(defaultOpts, vm.config.masonryOption);

        new masonry('[' + vm.config.masonryContainer + ']', opts);
    }
};