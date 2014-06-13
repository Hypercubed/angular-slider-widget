/*
 * angular-slider-widget
 * (c) 2014 J. Harshbarger
 * Licensed MIT
 */

/* jshint undef: true, unused: true */
/* global angular:true */

(function() {
  'use strict';

  // Todo: customize labels, scale function

  var template = ['<div class="hc-slider">',
                    '<div class="hc-number">',
                      '<input type="number" min="{{min}}" max="{{max}}" ng-model="numberValue" step="{{step}}">',
                    '</div>',
                    '<div class="hc-range">',
                    '<input type="range" class="" ng-model="rangeValue">',
                      '<span class="bubble limit floor" ng-show="left" >{{min | number:fractionSize}}</span>',
                      '<span class="bubble limit ceiling" ng-show="right">{{max | number:fractionSize}}</span>',
                    '</div>',
                  '</div>'].join('');

  var app = angular.module('hc.slider',['debounce']);

  app
    .directive('hcSlider', function($timeout, debounce) {
      return {
        scope: {
          value: '=ngModel',
          _max: '&?max',
          _min: '&?min',
          _step: '&?step',
          _fractionSize: '&?'
        },
        template: template,
        link: function(scope, element, attr) {

          element.addClass('slider');
          var $range = element.find('input[type=range]');

          getReadonlyValues();

          scope.value = +scope.value || 0;
          scope.rangeValue = +scope.value || 0;
          scope.numberValue = +scope.value || 0;

          var applyValue = debounce(function(value) {
            scope.value = +value;
          }, 100);

          function getReadonlyValues() {
            scope.max = scope._max() || 1;
            scope.min = scope._min() || 0;
            scope.step = scope._step() || 0;
            scope.fractionSize = scope._fractionSize() || parseInt(Math.log(scope.step)/Math.log(0.1));
          }

          function changeRangeValue(newVal) {

            scope.rangeValue = +newVal;
            updateDom();

            applyValue(+newVal);
          }

          function changeNumberValue(newVal) {

            scope.numberValue = +newVal;
            updateDom();

            applyValue(+newVal);
          }

          function updateRange() {
            getReadonlyValues()

            $range.attr('max', scope.max);  // Need to update range before value.
            $range.attr('min', scope.min);
            $range.attr('step', scope.step);

            scope.rangeValue = +scope.value || 0;
            scope.numberValue = +scope.value || 0;
            updateDom();
          }

          function updateDom() {
            var percent = (+scope.rangeValue-scope.min)/(scope.max-scope.min)*100;
            scope.left = percent > 10;
            scope.right = percent < 90;
          }

          updateRange();
          
          scope.$watch('rangeValue', changeRangeValue);
          scope.$watch('numberValue', changeNumberValue);
          scope.$watchCollection('[value,_max(),_min(),_step()]', updateRange);

        }
      };
    });

})();