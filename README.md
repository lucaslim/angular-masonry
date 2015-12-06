# angular-masonry
[AngularJS](http://angularjs.org/) Directive for Masonry Layout by [David DeSandro](http://masonry.desandro.com/)

## Usage
### Browserify
install from npm
```npm
npm install --save ng-masonry 
```
require module
```js
var ngMasonry = require('ngMasonry')
```
attach module to application
```js
var app = angular.module('app', [ngMasonry]);
```

### Manually
include in HTML
```html
<script src="angular.js"></script>
<script src="angular-masonry.js"></script>
```
attach to application
```js
var app = angular.module('app', ['ngMasonry']);
```

## Example
Any options listed in [Masonry](http://masonry.desandro.com/options.html) website can be used in the 'data-masonry-options' attribute
```html
<div data-masonry data-masonry-options='{ "columnWidth": 200 }'>
    <div data-masonry-item data-ng-repeat="item in list">
        {{ item }}
    </div>
</div>
```

## Credits
This directive is created based on Masonry Layout by [David DeSandro](http://masonry.desandro.com/)