/*
 histogram
 (c) 2013, ABС brothers
*/
(function()
{
    'use strict;'
	var histogram = {						// менеджер загрузки image
		'ctx': null
		,'width': 0
		,'height': 0
		,'step': 1
		,'imgToCanvas': function(img)	{			// image в canvas
//console.log('histogram' , img.width); 
            var canvas = document.createElement('canvas');
            canvas.width = this.width = img.width;
            canvas.height = this.height = img.height;
            this.ctx = canvas.getContext('2d');
            this.ctx.drawImage(img, 0, 0);
			return canvas;
		}
		,'imgFilter': function(ph)	{	    	// обнулить пикселы со значениями от (from, to)
            var begX = ph['x'] || 0;
            var begY = ph['y'] || 0;
            var from = ph['from'] || 50;
            var to = ph['to'] || 255;
            var ww = ph['width'] || this.width;
            var hh = ph['height'] || this.height;
            var imgData = this.ctx.getImageData(begX, begY, ww, hh);
            for (var i = 0, len = imgData.data.length; i < len; i+=4) {
               if (imgData.data[i] > from && imgData.data[i] < to) 
                            imgData.data[i] = 
                            imgData.data[i+1] = 
                            imgData.data[i+2] = 
                            imgData.data[i+3] = 255;
 			}
            /*
            for (var i = 0, len = imgData.data.length; i < len; i++) {
              if (imgData.data[i] > from && imgData.data[i] < to) imgData.data[i] = 255;
			}*/
            this.ctx.putImageData(imgData, begX, begY, begX, begY, ww, hh);
			return len;
		}
		,'findLetters': function(ph)	{	    	// поиск символов
            var begX = ph['x'] || 0;
            var begY = ph['y'] || 0;
            var from = ph['from'] || 50;
            var to = ph['to'] || 255;
            var ww = ph['width'] || this.width; // в пикселах
            var hh = ph['height'] || this.height;
            var imgData = this.ctx.getImageData(begX, begY, ww, hh);
            var out = ph;
            var notNull=0; // число непустых пикселов
            var Letters = []; // массив символов
            var Letter=[]; // символ - временный массив для хранения текущего символа
            var LetterIndex=-1; // временный индекс символов соседних пикселей
            var puxel=[]; // вспомогательный двумерный массив - для каждого пиксела - индекс символа в массиве letters
            for (var i = 0, len = imgData.data.length; i < len; i+=4) { // каждый пиксел - 4 элемента
            	 // всего колонок ww
            	 // всего строк -len%(-4*ww)
            	 stroka=i%(4*ww); // номер строки, нумерация с 0
            	 kolonka=(i-4*ww*stroka)%4; // номер колонки, нумерация с 0
               if (imgData.data[i] < 255) {
                notNull++;
                if (stroka==0){
                	if(kolonka==0){
                		puxel[0][0]=0; Letters[0][0]=[0,0];
                	}
                	else{
                		LetterIndex=puxel[0,kolonka-1];
                		if (LetterIndex>=0){
                			Letters[0][kolonka]=[0,0];
                		}
                	}
                		
                // вверху слева
                LetterIndex=puxel[?(stroka==0,0,stroka-1),?(kolonka==0,0,kolonka-1)];
                // вверху прямо
                LetterIndex2=puxel[?(stroka==0,0,stroka-1),kolonka];
                if(LetterIndex<0){LettreIndex=LetterIndex2}
                else{
                	if(LetterIndex2>=0){
                		// Содержимое массива Letters[LetterIndex2] добавить к массиву Letters[LetterIndex]
                		}
                }
               }
 			}
            out['notNull'] = notNull;
			return out;
		}
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['histogram'] = histogram; 	// построение histogram
})();
