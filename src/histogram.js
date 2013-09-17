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
            this.ctx.putImageData(imgData, begX, begY, 0, 0, ww, hh);
			return len;
		}
		,'findLetters': function(ph)	{	    	// поиск символов
            var begX = ph['x'] || 0;
            var begY = ph['y'] || 0;
            var ww = ph['width'] || this.width; // в пикселах
            var hh = ph['height'] || this.height;
            var imgData = this.ctx.getImageData(begX, begY, ww, hh);

            var Letters = {}; // Хэш символов
            var num = 0; // количество символов
            var puxel = []; // вспомогательный двумерный массив - для каждого пиксела - индекс символа в массиве letters

            var smvConcat = function(raw, col, to) {
                var ind = puxel[raw][col];
if(ind === to) {
var tt =1;
return;
}

                var simv = Letters[ind];
                for (var j = 0, len1 = simv['coordinates'].length; j < len1; j++) {
                    var arr = simv['coordinates'][j];
                    puxel[arr[1]][arr[0]] = to;
                }
                Letters[to]['coordinates'] = simv['coordinates'].concat(Letters[to]['coordinates']);
                delete Letters[ind];
                //puxel[raw][col] = to;
            }

            for (var i = 0, w4 = 4*ww, len = imgData.data.length; i < len; i+=4) { // каждый пиксел - 4 элемента
                var zn = imgData.data[i];
                if (zn === 255) continue;   // если белая точка переходим к следующей
            	 // всего колонок ww
            	 // всего строк hh
            	var stroka = Math.floor(i / w4),                    // номер строки, нумерация с 0
                    kolonka = Math.floor(i / 4 - ww * stroka),    // номер колонки, нумерация с 0
                    ind = null;
                    
                num++;
                Letters[num] = {
                    'type': 'MULTIPOINT'
                    ,'coordinates': [[kolonka, stroka]]
                };
                if(!puxel[stroka]) puxel[stroka] = [];
                puxel[stroka][kolonka] = num;

                if (kolonka > 0) {
                    if (imgData.data[i - 4] < 255) {                // если точка левее текущей не белая
                        smvConcat(stroka, kolonka - 1, num);
                    }
                }
                if (stroka > 0) {
                    var ind1 = null;
                    if (imgData.data[i - w4] < 255) {               // если точка выше текущей не белая
                        smvConcat(stroka - 1, kolonka, num);
                    }
                    if (imgData.data[i - w4 + 4] < 255) {           // если точка выше+правее текущей не белая
                        smvConcat(stroka - 1, kolonka + 1, num);
                    }
                    if (imgData.data[i - w4 - 4] < 255) {           // если точка выше+левее текущей не белая
                        smvConcat(stroka - 1, kolonka - 1, num);
                    }
                }
 			}
			return Letters;
		}
		,'normalization': function(Letters)	{	    	// нормализация
            for (var key in Letters) {
                var simv = Letters[key];
                simv['bounds'] = window.abcAPI['utils'].bounds(simv['coordinates']);
                
                for (var j = 0, len1 = simv['coordinates'].length; j < len1; j++) {
                    var arr = simv['coordinates'][j];
                    arr[0] -= simv['bounds'].min.x;
                    arr[1] -= simv['bounds'].min.y;
                }
            }
            return Letters;
		}
		,'drawResult': function(ph)	{	    	// нарисуем символы
            var begX = ph['x'] || 0;
            var begY = ph['y'] || 0;
            var ww = ph['width'] || this.width; // в пикселах
            var w4 = 4*ww;
            var hh = ph['height'] || this.height;

            var Letters = this.normalization(ph['res']);
            var imgDataDraw = this.ctx.getImageData(ph['tx'], ph['ty'], 100, 400);
            for (var i = 0, len1 = imgDataDraw.data.length; i < len1; i+=4) {       // Покрасим белым поле вывода
                imgDataDraw.data[i] = 
                imgDataDraw.data[i+1] = 
                imgDataDraw.data[i+2] = 
                imgDataDraw.data[i+3] = 255;
            }
            var i = 0;
            for (var key in Letters) {
                var simv = Letters[key];
                var add = 100 * i++;
                for (var j = 0, len1 = simv['coordinates'].length; j < len1; j++) {
                    var arr = simv['coordinates'][j];
                    var indRes = (arr[1] + add) * 100 + arr[0];
                    imgDataDraw.data[indRes] = 
                    imgDataDraw.data[indRes + 1] = 
                    imgDataDraw.data[indRes + 2] = 0;
                }
           }
           this.ctx.putImageData(imgDataDraw, ph['tx'], ph['ty'], 0, 0, 100, 400);
		}
        
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['histogram'] = histogram; 	// построение histogram
})();
