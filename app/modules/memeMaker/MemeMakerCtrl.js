(function () {
    
    'use strict';

    angular.module("AppTemplate").controller("MemeMakerController", ['$scope', '$timeout', MemeMakerController])

    function MemeMakerController($scope, $timeout) { 

        var init = function () {
            window.topLineText = "";
            window.bottomLineText = "";
            document.getElementById('topLineText').addEventListener('input', textChangeListener, false);
            document.getElementById('bottomLineText').addEventListener('input', textChangeListener, false);
            document.getElementById('file').addEventListener('change', handleFileSelect, false);
            document.getElementById('saveBtn').addEventListener('click', saveFile, false);
            document.getElementById('inverterBtn').addEventListener('click', InverterImage, false);
            document.getElementById('striperBtn').addEventListener('click', StriperImage, false);
            document.getElementById('grayscalerBtn').addEventListener('click', GrayscalerImage, false);
        }

        var redrawMeme = function (image, topLine, bottomLine) {
            // Get Canvas2DContext
            var canvas = document.querySelector('canvas');
            var ctx = canvas.getContext("2d");
            // Your code here
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            ctx.font = "36px Impact";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.textAlign="center"; 

            if(topLine != null) {
                ctx.fillText(topLine, (canvas.width / 2), 40);
                ctx.strokeText(topLine, (canvas.width / 2), 40);
            }

            if(topLine != null) {
                ctx.fillText(bottomLine, (canvas.width / 2), 470);
                ctx.strokeText(bottomLine, (canvas.width / 2), 470);
            }
        }


        var textChangeListener = function (evt) {
            var id = evt.target.id;
            var text = evt.target.value;

            if (id == "topLineText") {
                window.topLineText = text;
            } else {
                window.bottomLineText = text;
            }

            redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
        }

        var saveFile = function () {
            var urlData = document.querySelector('canvas').toDataURL().replace("image/png", "image/octet-stream");

            var linkHTML = document.createElement("a");
            linkHTML.setAttribute("href", urlData);
            linkHTML.setAttribute("download", "MemeMaked.jpg");
            linkHTML.click();
        }

        var inverterColor = function (ctxCanvas, imageData){
            for (var i=0;i<imageData.data.length;i+=4)
            {
                imageData.data[i]=255-imageData.data[i];
                imageData.data[i+1]=255-imageData.data[i+1];
                imageData.data[i+2]=255-imageData.data[i+2];
                imageData.data[i+3]=255;
            }
            ctxCanvas.putImageData(imageData,0,0);
        }

        var handleFileSelect = function (evt) {
          var canvasWidth = 500;
          var canvasHeight = 500;
          var file = evt.target.files[0];
          
          
          
          var reader = new FileReader();
          reader.onload = function(fileObject) {
            var data = fileObject.target.result;
            
            // Create an image object
            var image = new Image();
            image.onload = function() {
              
              window.imageSrc = this;
              redrawMeme(window.imageSrc, null, null);
            }
            
            // Set image data to background image.
            image.src = data;
            //console.log(fileObject.target.result);
          };
          reader.readAsDataURL(file)
        }

        var painterGreen = function (ctxCanvas, imageData){
            var numPixels = imageData.data.length / 4; 
            for (var i=0;i<numPixels;i++)
            {
                if (i % 10 ===0) {
                    imageData.data[i * 4 + 1]= 255;
                    imageData.data[i * 4 + 3]= 255;
                }
            }
            ctxCanvas.putImageData(imageData,0,0);
        }

        var painterGrayscale = function (ctxCanvas, imageData){
            for (var i=0;i<imageData.data.length;i+=4)
            {
              // Method #01 - Average
              //var grayScale = ((imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) / 3);

              // Method #02 - Average
              //var grayScale = (imageData.data[i] * 0.299 + imageData.data[i+1] * 0.587 + imageData.data[i+2] * 0.114);

              // Method #03 - Desaturation
              //var grayScale = (Math.max(imageData.data[i], imageData.data[i+1], imageData.data[i+2]) + Math.min(imageData.data[i], imageData.data[i+1], imageData.data[i+2]) / 2);

              // Method #04.1 - Maximum Composition
              //var grayScale = Math.max(imageData.data[i], imageData.data[i+1], imageData.data[i+2]);

              // Method #04.2 - Mainimum Composition
              //var grayScale = Math.min(imageData.data[i], imageData.data[i+1], imageData.data[i+2]);

              // Method #05 - Single Channel
              var grayScale = imageData.data[i];

              imageData.data[i]=grayScale;
              imageData.data[i+1]=grayScale;
              imageData.data[i+2]=grayScale;
              imageData.data[i+3]=255;
            }
            ctxCanvas.putImageData(imageData,0,0);
        }

        function InverterImage(){
          // Get Canvas2DContext
          var canvas = document.querySelector('canvas');
          var ctx = canvas.getContext("2d");
          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          inverterColor(ctx, imageData);
        }

        function StriperImage(){
          // Get Canvas2DContext
          var canvas = document.querySelector('canvas');
          var ctx = canvas.getContext("2d");
          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          painterGreen(ctx, imageData);
        }

        function GrayscalerImage() {
          // Get Canvas2DContext
          var canvas = document.querySelector('canvas');
          var ctx = canvas.getContext("2d");
          var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          painterGrayscale(ctx, imageData);
        }
      

        (function initController() {
            init();
        })();

    }

})()

