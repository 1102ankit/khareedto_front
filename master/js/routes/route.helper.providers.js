/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

(function() {
    'use strict';

    angular
        .module('app.routes')
        .provider('RouteHelpers', RouteHelpersProvider)
        ;


    function RouteHelpersProvider() {

      /* jshint validthis:true */
      return {
        // provider access level
        basepath: basepath,
        // controller access level
        $get: function() {
          return {
            basepath: basepath,
          };
        }
      };

      // Set here the base of the relative path
      // for all app views
      function basepath(uri) {
        return 'views/' + uri;
      }


    }


})();

