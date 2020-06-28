(function () {
    
    'use strict';

    angular.module("ngComponents").run(['$templateCache', mobileNgInputFileTemplate]);

    function mobileNgInputFileTemplate($templateCache) {
       // The templateCache would be created automatically with GRUNT tool.
        $templateCache.put('view/MobileNgInputFileTemplate_Template.html', '<input type="file" placeholder="Selecione uma arquivo" />');
    }

    angular.module("ngComponents").directive('mobileNgInputFile', ['imageGenerator', '$window', mobileNgInputFile])

    function mobileNgInputFile(imageGenerator, $window) {
    	return {
    		restrict: 'E',
    		scope: {
    			ngModel: "="
               ,ngInitLoad: "&"
               ,ngFinishLoad: "&"
               ,ngTarget: "@"
    		},
            templateUrl: 'view/MobileNgInputFileTemplate_Template.html',
            replace: true,
    		link: function (scope, element, attributes) { 

                scope.ngModel = { title: '', contentType: '', content: '' }

                element.bind('click', (clickEvent) => {
                    element[0].value = null
                })                

    			element.bind('change', (changeEvent) => {

                    if (!!scope.ngInitLoad) { 
                        scope.ngInitLoad() 
                    }

    				scope.$apply(() => {

                        var files = Array.from(changeEvent.target.files)
                        // console.log(files[0].type)

                        if (files[0].type.includes('image')) {
                            InputFileImage(files)
                        } else if (files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || files[0].type == 'application/vnd.ms-excel') {
                            InputFileExcel(files)
                        } else {
                            InputFile(files)
                        }

    				})
    			})

                function InputFileImage(files) {
                    var compress = new $window.Compress()

                    compress.compress(files, {
                        size: 4, // the max size in MB, defaults to 2MB
                        quality: .75, // the quality of the image, max is 1,
                        maxWidth: 1920, // the max width of the output image, defaults to 1920px
                        maxHeight: 1920, // the max height of the output image, defaults to 1920px
                        resize: true, // defaults to true, set false if you do not want to resize the image width and height
                    }).then((result) => {
                        //   returns an array of compressed images
                        var file = result[0]

                        var reader = new FileReader()
                        reader.readAsDataURL(file.photo.data)
                        
                        reader.onload = function(fileObject) {
                            
                            scope.ngModel.title = file.photo.name
                            scope.ngModel.contentType = file.photo.type
                            scope.ngModel.content = fileObject.target.result
                            //scope.ngModel.file = file.photo

                            if (!!scope.ngTarget) { 
                                var ngTargetSplit = scope.ngTarget.split(" ")
                                ngTargetSplit.map((item) => {
                                    imageGenerator.drawImage(item, scope.ngModel.content)
                                })
                            }

                            if (!!scope.ngFinishLoad) { 
                                scope.ngFinishLoad() 
                            }
                        };

                    })
                }

                function InputFileExcel(files) {
                    var file = files[0]
                    var reader = new FileReader()
                    reader.readAsBinaryString(file)
                    
                    reader.onload = function(fileObject) {
                        scope.ngModel.title = file.name
                        scope.ngModel.contentType = file.type

                        var workbook = XLSX.read(fileObject.target.result, { type: 'binary' })
                        workbook.SheetNames.forEach(function(sheetName) {
                          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
                           // console.log(XL_row_object)
                           scope.ngModel.content = XL_row_object
                        })

                        if (!!scope.ngTarget) { 
                            var ngTargetSplit = scope.ngTarget.split(" ")
                            ngTargetSplit.map((item) => {
                                // TO DO SOMETHING
                            })
                        }

                        if (!!scope.ngFinishLoad) { 
                            scope.ngFinishLoad() 
                        }
                    };
                }


                function InputFile(files) {
                    var file = files[0]
                    var reader = new FileReader()
                    reader.readAsDataURL(file)
                    
                    reader.onload = function(fileObject) {
                        scope.ngModel.title = ''
                        scope.ngModel.contentType = ''
                        scope.ngModel.content = fileObject.target.result

                        if (!!scope.ngTarget) { 
                            var ngTargetSplit = scope.ngTarget.split(" ")
                            ngTargetSplit.map((item) => {
                                // TO DO SOMETHING
                            })
                        }

                        if (!!scope.ngFinishLoad) { 
                            scope.ngFinishLoad() 
                        }
                    };
                }

    		}
    	}
    }

})();

