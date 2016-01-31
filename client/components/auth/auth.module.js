'use strict';

angular.module('angularfull2App.auth', [
  'angularfull2App.constants',
  'angularfull2App.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
