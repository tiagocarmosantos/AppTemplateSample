(function () {
    
    'use strict';

    angular.module("ngComponents").run(['$templateCache', mobileNgTableTemplate]);

    function mobileNgTableTemplate($templateCache) {
       // The templateCache would be created automatically with GRUNT tool.
        $templateCache.put('view/MobileNgTable_Template.html', '<table data-role="table" data-mode="columntoggle" class="{{class}}">     <thead>         <tr>             <th ng-show=commandColumnSelect data-sort-ignore="true"></th>             <th data-priority={{header.priority}} data-sort-ignore="{{!header.sort}}" data-hide="{{header.hide}}" data-ng-repeat="header in columnDefs">{{header.displayName}}</th>             <th data-sort-ignore="true" ng-show=commandColumnView data-ignore="true" data-name="View"></th>             <th data-sort-ignore="true" ng-show=commandColumnEdit data-ignore="true" data-name="Edit"></th>             <th data-sort-ignore="true" ng-show=commandColumnDelete data-ignore="true" data-name="Delete"></th>         </tr>     </thead>     <tbody>         <tr ng-show=tableLoading><td colspan="12">Carregando...</td></tr>         <tr data-ng-repeat="row in data | filter:search" repeat-finish="endRepeat()" data-ng-click="rowClick($event,row)" on-long-press="itemOnLongPress($event,row)" on-touch-end="itemOnTouchEnd($event,row)">             <td ng-show=commandColumnSelect><input data-role="none" ng-show=commandColumnSelect ng-model=row[select] type="checkbox" data-ng-click="rowSelectClick($event,row)" /></td>             <td data-ng-repeat="field in columnDefs" width="{{field.width}}"><div data-ng-cell>{{::row[field.field] | mobileNgTableFilter:field.filter}}</div></td>             <td ng-show=commandColumnView><a ng-show={{row[visualisable]}} href="#" data-role="button" data-iconpos="notext" data-ng-click="rowViewClick($event,row)"> View </a>{{row[Visualizavel]}}</td>             <td ng-show=commandColumnEdit><a ng-show={{row[editable]}} href="#" data-role="button" data-iconpos="notext" data-ng-click="rowEditClick($event,row)"> Edit </a>{{row[Editavel]}}</td>             <td ng-show=commandColumnDelete><a ng-show={{row[deletable]}} href="#" data-role="button" data-iconpos="notext" data-ng-click="rowDeleteClick($event,row)"> Delete </a>{{row[Deletavel]}}</td>         </tr>     </tbody>     <tfoot ng-show=pager.enable>         <tr>             <th colspan="12">                 <nav aria-label="Page navigation" style="float: left;" >                     <ul class="{{pager.class}}">                         <li><a href="" aria-label="First" data-ng-click="pagerFirstClick($event, pager)"><span aria-hidden="true">&laquo;</span></a></li>                         <li><a href="" aria-label="Previous" data-ng-click="pagerPreviousClick($event, pager)"><span aria-hidden="true">&lsaquo;</span></a></li>                         <li>&nbsp;<input data-role="none" ng-model="pager.startPage" style="width: 40px; text-align: right;" type="text" value="{{pager.startPage}}"/>&nbsp; de &nbsp; {{ functionTotal(pager.total, pager.limitPerPage) }}&nbsp;</li>                         <li><a href="" aria-label="Next" data-ng-click="pagerNextClick($event, pager)"><span aria-hidden="true">&rsaquo;</span></a></li>                         <li><a href="" aria-label="Last" data-ng-click="pagerLastClick($event, pager)"><span aria-hidden="true">&raquo;</span></a></li>                         <li>                             <select data-role="page-size" class="input-sm" ng-model=pager.limitPerPage ng-change="pagerReloadClick($event, pager)" >                                 <option data-ng-repeat="size in pager.sizes" ng-selected="size == pager.limitPerPage" value="{{size}}">{{size}}</option>                             </select>                         </li>                         <li><a href="" aria-label="Reload" data-ng-click="pagerReloadClick($event, pager)"><span aria-hidden="true">Reload</span></a></li>                     </ul>                 </nav>                 <div aria-label="Page navigation" style="float: right;">                     Exibindo &nbsp; {{pager.StartInterval | number}} &nbsp;-&nbsp; {{pager.EndInterval | number}} &nbsp; de &nbsp; {{pager.total}}                 </div>             </th>         </tr>     </tfoot> </table>');
    }

    angular.module("ngComponents").directive('mobileNgTable', ['$filter', mobileNgTable])

    function mobileNgTable($filter) {
        return {
            restrict: 'E',
            scope: {
                loadRepeat: '=loadRepeat'
            },
            templateUrl: 'view/MobileNgTable_Template.html',
            replace: true,
            link : function(scope) { 
                var option = scope.loadRepeat;
                scope.class = option.class;
                scope.columnDefs = option.columnDefs;
                scope.$parent.$watch(option.search, function (newSearch) { scope.search = newSearch; }, true);
                
                scope.rowClick = option.rowClick;
                            
                scope.rowSelectClick = option.rowSelectClick;
                scope.commandColumnSelect = false;
                scope.select = option.select;
                if (scope.rowSelectClick && scope.select != null) {
                    scope.commandColumnSelect = true;
                }

                scope.rowDeleteClick = option.rowDeleteClick;
                scope.commandColumnDelete = false;
                scope.deletable = option.deletable;
                if (scope.rowDeleteClick && scope.deletable != null) {
                    scope.commandColumnDelete = true;
                }
                
                scope.rowEditClick = option.rowEditClick;
                scope.commandColumnEdit = false;
                scope.editable = option.editable;
                if (scope.rowEditClick && scope.editable != null) {
                    scope.commandColumnEdit = true;
                }

                scope.rowViewClick = option.rowViewClick;
                scope.commandColumnView = false;
                scope.visualisable = option.visualisable;
                if (scope.rowViewClick && scope.visualisable != null) {
                    scope.commandColumnView = true;
                }

                scope.itemOnLongPress = option.itemOnLongPress;
                scope.itemOnTouchEnd = option.itemOnTouchEnd;          

                scope.pager = option.pager;
                scope.pager.type = option.pager.type;         

                if(scope.pager.type == 'local') {
                    scope.pagerReloadClick = function (e, pager) {
                        scope.$parent.$watch(option.data, function (newdata) { 
                            var begin = ((pager.startPage - 1) * pager.limitPerPage);
                            var end = begin + pager.limitPerPage;
                            scope.data = newdata.slice(begin, end);
                            scope.pager.StartInterval = begin + 1;
                            scope.pager.EndInterval  = (end > newdata.length ? newdata.length : end);
                            scope.pager.total = newdata.length;
                        }, true);
                    }
                    scope.pagerReloadClick(null, scope.pager);
                } else {
                    scope.$parent.$watch(option.data, function (newdata) { scope.data = newdata; }, true);
                    scope.pagerReloadClick = function (e, pager)
                    {
                        option.pagerReloadClick(e, pager);
                        var begin = ((parseInt(pager.startPage) - 1) * parseInt(pager.limitPerPage));
                        var end = begin + parseInt(pager.limitPerPage);
                        scope.pager.StartInterval = begin + 1;
                        scope.pager.EndInterval = (end > parseInt(scope.pager.total) ? parseInt(scope.pager.total) : end);
                    }
                    scope.pagerReloadClick(null, scope.pager);
                }
                
                scope.pagerFirstClick = function (e, pager) {
                    if (scope.pagerReloadClick) {
                        if (parseInt(pager.startPage) != parseInt(1)) {
                            pager.startPage = 1;
                            scope.pagerReloadClick(e, pager);
                        }
                    }
                };
                scope.pagerPreviousClick = function (e, pager) {
                    if (scope.pagerReloadClick) {
                        if ((parseInt(pager.startPage) > parseInt(1))) {
                            pager.startPage = pager.startPage - 1;
                            scope.pagerReloadClick(e, pager);
                        }
                    }
                };
                scope.pagerNextClick = function (e, pager) {
                    if (scope.pagerReloadClick) {
                        if ((parseInt(pager.startPage) < parseInt(pager.totalPages))) {
                            pager.startPage = pager.startPage + 1;
                            scope.pagerReloadClick(e, pager);
                        }
                    }
                }
                scope.pagerLastClick = function (e, pager) {
                    if (scope.pagerReloadClick) {
                        if ((parseInt(pager.startPage) != parseInt(pager.totalPages))) {
                            pager.startPage = pager.totalPages;
                            scope.pagerReloadClick(e, pager);
                        }
                    }
                };
                scope.functionTotal = function (total, limitPerPage) {
                    scope.pager.totalPages = Math.round((total % limitPerPage > 0 ? parseInt(total / limitPerPage) + 1 : (total / limitPerPage)));
                    return scope.pager.totalPages;
                };
                scope.tableLoading = true;
                scope.endRepeat = function () {
                    scope.tableLoading = false;
                };
            }
        }
    }

    angular.module("ngComponents").filter('mobileNgTableFilter', ['$filter', mobileNgTableFilter])

    function mobileNgTableFilter($filter) {
        return function(value, filterData) {
            if(filterData){
                var filter = filterData.trim().split(":");
                var filterName = filter[0];
                var expression = filter[1];
                return $filter(filterName)(value,expression);
            }else{
                return value;
            }
        };
    }

    //Add this directive where you keep your directives
    angular.module("ngComponents").directive('onLongPress', ['$timeout', '$parse', onLongPress])

    function onLongPress($timeout, $parse) {
        return {
            restrict: 'A',
            link: function ($scope, $elm, $attrs) {
                var onLongPress = $attrs.onLongPress;
                var invokerOnLongPress = $parse(onLongPress);
                
                var onTouchEnd = $attrs.onTouchEnd;
                var invokerOnTouchEnd = $parse(onTouchEnd);
                
                $elm.bind('touchstart', function (evt) {
                    // Locally scoped variable that will keep track of the long press
                    $scope.longPress = true;

                    // We'll set a timeout for 600 ms for a long press
                    $timeout(function () {
                        if ($scope.longPress) {
                            // If the touchend event hasn't fired,
                            // apply the function given in on the element's on-long-press attribute
                            $scope.$apply(function () {
                                // Invoke the handler on the scope,
                                // mapping the jQuery event to the
                                // $event object.
                                invokerOnLongPress(
                                   $scope
                                   ,{
                                     $event: evt
                                   }
                                );
                            });
                        }
                    }, 600);
                });

                $elm.bind('touchend', function (evt) {
                    // Prevent the onLongPress event from firing
                    $scope.longPress = false;
                    // If there is an on-touch-end function attached to this element, apply it
                    if ($attrs.onTouchEnd) {
                        $scope.$apply(function () {
                            // Invoke the handler on the scope,
                            // mapping the jQuery event to the
                            // $event object.
                            invokerOnTouchEnd(
                               $scope
                               ,{
                                 $event: evt
                               }
                            );
                        });
                    }
                });
            }
        };
    }

    angular.module("ngComponents").directive('ngCell', ['$compile', ngCell])

    function ngCell($compile) {
        var ngCell = {
            scope: false,
            compile: function() {
                return {
                    pre: function($scope, iElement) {
                        if($scope.field.cellTemplate){
                            // Step 1: parse HTML into DOM element
                            var template = angular.element($scope.field.cellTemplate);

                            // Step 2: compile the template
                            var linkFn = $compile(template);

                            // Step 3: link the compiled template with the scope.
                            //linkFn($scope);

                            iElement.empty();
                            iElement.append(linkFn($scope));
                        }
                    }
                };
            }
        };
        return ngCell;
    }

})();

