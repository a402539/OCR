/*
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
        ,
        'bounds': function(arr) {							// получить bounds массива точек
            var res = {
                min: {
                    x: Number.MAX_VALUE,
                    y: Number.MAX_VALUE
                },
                max: {
                    x: -Number.MAX_VALUE,
                    y: -Number.MAX_VALUE
                },
                extend: function(x, y) {
                    if (x < this.min.x) this.min.x = x;
                    if (x > this.max.x) this.max.x = x;
                    if (y < this.min.y) this.min.y = y;
                    if (y > this.max.y) this.max.y = y;
                    return this;
                },
                extendArray: function(arr) {
                    if (!arr) { return this };
                    for(var i=0, len=arr.length; i<len; i++) {
                        this.extend(arr[i][0], arr[i][1]);
                    }
                    return this;
                },
                intersects: function (bounds, dx, dy) { // (Bounds, dx, dy) -> Boolean
                    var min = this.min,
                        max = this.max,
                        dx = dx || 0,
                        dy = dy || 0,
                        min2 = bounds.min,
                        max2 = bounds.max;
                    return max2.x + dx >= min.x && min2.x - dx <= max.x && max2.y + dy >= min.y && min2.y - dy <= max.y;
                }
            };
            
            return res.extendArray(arr);
        }
	};

	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI['utils'] = utils; 	// общие утилиты
})();
