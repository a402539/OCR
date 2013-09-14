/*
 Recognise text from image
 (c) 2013, ABС brothers
*/
(function () {
"use strict";
﻿/*
 основная
 (c) 2013, ABС brothers
*/
(function()
{
	var ocr = {						// менеджер загрузки image
		'run': function(item)	{					// добавить запрос в конец очереди
console.log('run' , item); 
			return item;
		}
		,'unshift': function(item)	{				// добавить запрос в начало очереди
			items.unshift(item);
			chkTimer();
			return items.length;
		}
		,'getCounts': function()	{				// получить размер очереди + колич.выполняющихся запросов
//console.log('getCounts' , curCount, items.length); 
			return items.length + (curCount > 0 ? curCount : 0);
		}
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['ocr'] = ocr; 	// основная
})();



﻿/*
 утилиты
 (c) 2013, ABС brothers
*/
(function()
{
	var utils = {						// менеджер загрузки image
		'run': function(item)	{					// добавить запрос в конец очереди
console.log('run' , item); 
			return item;
		}
		,'unshift': function(item)	{				// добавить запрос в начало очереди
			items.unshift(item);
			chkTimer();
			return items.length;
		}
		,'getCounts': function()	{				// получить размер очереди + колич.выполняющихся запросов
//console.log('getCounts' , curCount, items.length); 
			return items.length + (curCount > 0 ? curCount : 0);
		}
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['utils'] = utils; 	// общие утилиты
})();


﻿/*
 histogram
 (c) 2013, ABС brothers
*/
(function()
{
	var histogram = {						// менеджер загрузки image
		'run': function(item)	{					// добавить запрос в конец очереди
console.log('run' , item); 
			return item;
		}
		,'unshift': function(item)	{				// добавить запрос в начало очереди
			items.unshift(item);
			chkTimer();
			return items.length;
		}
		,'getCounts': function()	{				// получить размер очереди + колич.выполняющихся запросов
//console.log('getCounts' , curCount, items.length); 
			return items.length + (curCount > 0 ? curCount : 0);
		}
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['histogram'] = histogram; 	// построение histogram
})();


}());