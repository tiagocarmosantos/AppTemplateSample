(function () {
	
	'use strict';

	angular.module("ngComponents").service("IAGenerator", [IAGenerator])

	function IAGenerator() {

        this.moderateFromIA = function (imageContainerID, moderateConfig) {

          return new Promise((resolve, reject) => {

            mobilenet.load().then((model) => {
              var image = document.querySelector(`img[id=${imageContainerID}]`)
              model.classify(image).then((predictions) => {

                var predictionsApproved = predictions.filter((item) => { 
                  return item.className.includes(moderateConfig.className) && item.probability >= moderateConfig.probability
                });

                (predictionsApproved.length > 0 ? resolve({ Error: false, Msg: '', Predictions: predictionsApproved }) : reject({ Error: true, Msg: 'Essa imagem não atende aos critérios de aceitação!', Predictions: predictions }));
                
              })
            })

          })
        }
	}

})();

