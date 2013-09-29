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
		,'alfaHash': {}
		,'getAlfaArray': function()	{			// Получить алфавит
            var w = 32, h = 32;
            var arr = [
                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Ы', 'Щ', 'Э', 'Ю', 'Я',
                'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'ы', 'щ', 'э', 'ю', 'я'
            ];
            var i = 0
            //for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                var canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                var ctx = canvas.getContext('2d');
                ctx.font = "normal bold 32px Arial";
                ctx.textBaseline = 'Top';
                //ctx.fillStyle = "red";
                ctx.fillStyle = "#ffffff";
                ctx.fillText(item, 0, 32);
var imgData1 = ctx.getImageData(0, 0, w, h);
document.getElementById("controls").appendChild(canvas);
                histogram.imgFilter({
                    'from': 0
                    ,'to': 50
                    ,'delta': 3
                    ,'width': w
                    ,'height': h
                    ,'x': 0
                    ,'y': 0
                    ,'ctx': ctx
                });
imgData1 = ctx.getImageData(0, 0, w, h);
                this.alfaHash[item] = histogram.findLetters({
                    'width': w
                    ,'height': h
                    ,'x': 0
                    ,'y': 0
                    ,'ctx': ctx
                })[0];
var imgData = ctx.getImageData(0, 0, w, h);
/*
*/
 			//}
		}
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
            var delta = ph['delta'] || 0;
            var begX = ph['x'] || 0;
            var begY = ph['y'] || 0;
            var from = ('from' in ph ? ph['from'] : 50);
            var to = ('to' in ph ? ph['to'] : 255);
            var ww = ph['width'] || this.width;
            var hh = ph['height'] || this.height;
            var ctx = ph['ctx'] || this.ctx;
            var imgData = ctx.getImageData(begX, begY, ww, hh);
            for (var i = 0, len = imgData.data.length; i < len; i+=4) {
                var zn = imgData.data[i + delta];
                if (zn >= from && zn < to) {
                    imgData.data[i] = 
                    imgData.data[i+1] = 
                    imgData.data[i+2] = 255;
                    imgData.data[i+3] = 255;
                } else {        // точка черная
                    imgData.data[i] = 
                    imgData.data[i+1] = 
                    imgData.data[i+2] = 0;
                    imgData.data[i+3] = 255;
                }
			}
            /*
            for (var i = 0, len = imgData.data.length; i < len; i++) {
              if (imgData.data[i] > from && imgData.data[i] < to) imgData.data[i] = 255;
			}*/
            ctx.putImageData(imgData, begX, begY, 0, 0, ww, hh);
			return len;
		}
		,'findLetters': function(ph)	{	    	// поиск символов
            var begX = ph['x'] || 0;
            var begY = ph['y'] || 0;
            var ww = ph['width'] || this.width; // в пикселах
            var hh = ph['height'] || this.height;
            var ctx = ph['ctx'] || this.ctx;
            var imgData = ctx.getImageData(begX, begY, ww, hh);

            var Letters = {}; // Хэш символов
            var num = 0; // количество символов
            var puxel = []; // вспомогательный двумерный массив - для каждого пиксела - индекс символа в массиве letters

            var smvConcat = function(raw, col, to) {
                var ind = puxel[raw][col];
if(ind === to) {    // пытаемся обьединить сомвол сам с собой
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
                    if (imgData.data[i - 4] === 0) {                // если точка левее текущей черная
                        smvConcat(stroka, kolonka - 1, num);
                    }
                }
                if (stroka > 0) {
                    var ind1 = null;
                    if (imgData.data[i - w4] === 0) {               // если точка выше текущей черная
                        smvConcat(stroka - 1, kolonka, num);
                    }
                    if (imgData.data[i - w4 + 4] === 0) {           // если точка выше+правее текущей черная
                        smvConcat(stroka - 1, kolonka + 1, num);
                    }
                    if (imgData.data[i - w4 - 4] === 0) {           // если точка выше+левее текущей черная
                        smvConcat(stroka - 1, kolonka - 1, num);
                    }
                }
 			}
            var out = [];
            for (var key in Letters) {
                out.push(Letters[key]);
			}
            return this.normalization(out);
		}
		,'normalization': function(Letters)	{	    	// нормализация
            for (var i = 0, len = Letters.length; i < len; i++) {
                var simv = Letters[i];
                simv['bounds'] = window.abcAPI['utils'].bounds(simv['coordinates']);
                for (var j = 0, len1 = simv['coordinates'].length; j < len1; j++) {
                    var arr = simv['coordinates'][j];
                    arr[0] -= simv['bounds'].min.x;
                    arr[1] -= simv['bounds'].min.y;
                }
                simv['bounds'].max.x -= simv['bounds'].min.x;
                simv['bounds'].min.x = 0;
                simv['bounds'].max.y -= simv['bounds'].min.y;
                simv['bounds'].min.y = 0;
/*
*/
            }
            return Letters;
		}
		,'drawResult': function(ph)	{	    	// нарисуем символы
histogram.getAlfaArray();
            var begX = ph['x'] || 0;
            var begY = ph['y'] || 0;
            var ww = ph['width'] || this.width; // в пикселах
            var w4 = 4*ww;
            var hh = ph['height'] || this.height;
            var Letters = ph['res'];
            //var Letters = this.normalization(ph['res']);
            var imgDataDraw = this.ctx.getImageData(ph['tx'], ph['ty'], ww, hh);
            for (var i = 0, len1 = imgDataDraw.data.length; i < len1; i+=4) {       // Покрасим белым поле вывода
                imgDataDraw.data[i] = 
                imgDataDraw.data[i+1] = 
                imgDataDraw.data[i+2] = 
                imgDataDraw.data[i+3] = 255;
            }
            var k = 0;
            for (var key in this.alfaHash) {
                var simv = this.alfaHash[key];
                var add = ww * k;
                for (var j = 0, len1 = simv['coordinates'].length; j < len1; j++) {
                    var arr = simv['coordinates'][j];
                    var indRes = (arr[1] + 0) * w4 + arr[0]*4;
                    imgDataDraw.data[indRes] = 
                    imgDataDraw.data[indRes + 1] = 
                    imgDataDraw.data[indRes + 2] = 0;
                }
                k++;
break;
            }
            for (var i = 0, len = Letters.length; i < len; i++) {
                var simv = Letters[i];
                var add = 20 * k;
                for (var j = 0, len1 = simv['coordinates'].length; j < len1; j++) {
                    var arr = simv['coordinates'][j];
                    var indRes = (arr[1] + add) * w4 + arr[0]*4;
                    imgDataDraw.data[indRes] = 
                    imgDataDraw.data[indRes + 1] = 
                    imgDataDraw.data[indRes + 2] = 0;
                    //imgDataDraw.data[indRes + 3] = 255;
                }
                k++;
//break;
            }

           this.ctx.putImageData(imgDataDraw, ph['tx'], ph['ty'], 0, 0, ww, hh);
		}
		,'nok': function(n1, n2)	{	    	// сравнение
            var ww = s1['bounds'].max.x * s2['bounds'].max.x;
            var p = n1 % n2;
            while (p != 0) {
                n1 = n2;
                n2 = p;
                p = n1 % n2;
            }
            return n2;
		}
		,'compare': function(s1, s2)	{	    	// сравнение
            var ww = this.nok(s1['bounds'].max.x, s2['bounds'].max.x);
            var hh = this.nok(s1['bounds'].max.y, s2['bounds'].max.y);
            return false;
		}
        
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['histogram'] = histogram; 	// построение histogram
})();
