/*
 основная
 (c) 2013, ABС brothers
*/
(function()
{
	var ocr = {						// менеджер загрузки image
		'image': null
		,'run': function(url)	{					// загрузить image
			return item;
		}
		,'setImage': function(url)	{		// загрузить image
            var imageObj = new Image();
            imageObj.onload = function() {
                ocr.image = imageObj;
                //console.log('imageObj' , imageObj); 
            };
            imageObj.onerror = function() {
                console.log('onerror: ' , url); 
            };
            imageObj.src = url;
		}
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['ocr'] = ocr; 	// основная
})();

