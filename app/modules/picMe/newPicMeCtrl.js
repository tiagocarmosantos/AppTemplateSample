(function () {
    
    'use strict';

    angular.module("ListaTelefonica").controller("newPicMeController", ['picMeAPI', 'mobileNgMsg', '$rootScope', '$scope', '$location', 'filterAPI', newPicMeController])

    function newPicMeController(picMeAPI, mobileNgMsg, $rootScope, $scope, $location, filterAPI) { 

        const vm = this

        vm.showFilters = () => {
            console.log('showFilters')
            document.querySelector('.listFilters').classList.toggle('picmeHidden')
        }

        vm.savePicMe = () => {
            console.log('savePicMe')
            vm.picme.canvasSensor.element.width = vm.picme.videoSensor.element.videoWidth
            vm.picme.canvasSensor.element.height = vm.picme.videoSensor.element.videoHeight
            vm.picme.canvasSensor.element.getContext('2d').filter = vm.picme.videoSensor.element.style.filter
            vm.picme.canvasSensor.element.getContext('2d').drawImage(vm.picme.videoSensor.element, 0, 0)

            vm.picme.imageSensor.image.title = new Date().toLocaleString()
            vm.picme.imageSensor.image.contentType = 'image/webp'
            vm.picme.imageSensor.image.content = vm.picme.canvasSensor.element.toDataURL('image/webp')

            picMeAPI.savePicMe({ user: vm.picme.imageSensor.user, image: vm.picme.imageSensor.image }).then(data => {
                console.log(data)
                mobileNgMsg.addSuccess('PicME Salvo!')
            })
            .catch(error => {
                console.log(error)
                mobileNgMsg.addError(error.message)
            })
        }

        vm.switchCam = () => {
          console.log('switchCam')
          vm.picme.videoSensor.front = !vm.picme.videoSensor.front
          vm.picme.videoSensor.getStream()
        }

        vm.InitPicMe = () => {
            console.log('InitLoadImagePicMe')
            return {
              videoSensor: {
                element: document.querySelector("#picMeCam"),
                front: false,
                stream: null,
                filters: filterAPI.getFilters(),
                stopStream: function() {
                  if (this.stream) {
                      this.stream.getTracks().map(track => {
                        track.stop();
                      })
                  }
                },
                getStream: function() {
                  this.stopStream()

                  var mediaConfig = { audio: false, video: { facingMode: (this.front? "user" : "environment") }  }
                  navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia || navigator.mediaDevices.msGetUserMedia || navigator.mediaDevices.oGetUserMedia
                  navigator.mediaDevices.getUserMedia(mediaConfig).then(mediaStream => {
                      this.stream = mediaStream
                      this.element.srcObject = this.stream;
                  })
                }
              },
              canvasSensor: {
                element: document.querySelector("#picMeCanvas")
              },
              imageSensor: { 
                element: document.querySelector("#picMeImage"),
                user: {
                    name: 'defaultName',
                    email: 'defaultEmail',
                    password: 'defaultPassword'
                },
                image: {
                  title: '',
                  contentType: '',
                  content: ''
                }
              }
            }
        }

        (function initController() {
            console.log('newPicMe')
            $rootScope.config.template.showFooter = false
            $rootScope.config.template.showHeader = false
            vm.picme = vm.InitPicMe()
            vm.picme.videoSensor.getStream()
            vm.picme.imageSensor.user.name = $location.$$search.name
            vm.picme.imageSensor.user.email = $location.$$search.email
            vm.routeListPicMe = '#!/picMe/picMe'
        })()

        $scope.$on('$destroy', () => {
            vm.picme.videoSensor.stopStream()
            $rootScope.config.template.showFooter = true
            $rootScope.config.template.showHeader = true
        })

        $scope.$on('$viewContentLoaded', () => {
            
        })
    }

})()

