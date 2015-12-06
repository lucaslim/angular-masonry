(function () {
    'use strict';

    var
        appName = 'code.masonry',
        angular = window.angular || require('angular'),
        masonryModule = require('./module/');

    angular.module(appName, [masonryModule.name]);

    angular.bootstrap(document, [appName]);
}());