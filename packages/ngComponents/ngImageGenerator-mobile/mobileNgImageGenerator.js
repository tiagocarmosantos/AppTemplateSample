(function () {
	
	'use strict';

	angular.module("ngComponents").service("imageGenerator", [imageGenerator])

	function imageGenerator() {

        this.drawCanvas = function (canvasContainerID, fileSrc) {
            var canvas = document.querySelector(`canvas[id=${canvasContainerID}]`);
            canvas = (!!canvas ? canvas : document.createElement('canvas'))

            var ctx = canvas.getContext("2d");
            var imageElement = this.drawImage(null, fileSrc)

            ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

            return canvas
        }

        this.drawImage = function (imageContainerID, fileSrc) {
          var image = document.querySelector(`img[id=${imageContainerID}]`);
          image = (!!image ? image : new Image())
          image.src = fileSrc

          return image
        }
	}

})();

