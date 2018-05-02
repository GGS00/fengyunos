/**
 * INSPINIA - Responsive Admin Theme
 *
 */
(function() {
	angular.module('cloudshop', [
		'ui.router', // Routing
		'oc.lazyLoad', // ocLazyLoad
		'ui.bootstrap', // Ui Bootstrap
		'ngIdle', // Idle timer
		'ngSanitize' // ngSanitize
	])
})();

// Other libraries are loaded dynamically in the config.js file using the library ocLazyLoad
