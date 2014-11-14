/*
 утилиты
 (c) 2013, ABС brothers
*/
(function() {
	//расширяем namespace
	if(!window.abcAPI) window.abcAPI = {};
	window.abcAPI.utils = { 	// общие утилиты
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
        'intersectsPQAB': function(P,Q,A,B) {
            // P,Q - 1-й отрезок
            // A,B - 2-й отрезок
            // Функция должна выяснить, пересекаются ли отрезки PQ и AB
            var Delta = (A.x-B.x)*(Q.y-P.y)-(A.y-B.y)*(Q.x-P.x),
                DeltaAlpha = (A.x-P.x)*(Q.y-P.y)-(A.y-P.y)*(Q.x-P.x),
                DeltaBeta = (A.x-B.x)*(A.y-P.y)-(A.y-B.y)*(A.x-P.x);

            if (Delta !== 0) {
                // Alpha - координата точки пересечения на прямой PQ (Alpha=0 - точка P, Alpha=1 - точка Q)
                // Beta - координата точки пересечения на прямой AB (Beta=0 - точка A, Beta=1 - точка B)
                var Alpha = DeltaAlpha/Delta,
                    Beta = DeltaBeta/Delta;
                if(Alpha*(1-Alpha)>=0 && Beta*(1-Beta)>=0){// отрезки пересекаются
                    return true;
                }
                else return false;
            } else if (DeltaAlpha !== 0) {// отрезки параллельны, но лежат на разных прямых
                return false;
            } else if ((A.x-P.x)*(B.x-P.x) <= 0 && (A.y-P.y)*(B.y-P.y) <= 0) {// точка P внутри отрезка AB
                return true;
            } else if((A.x-Q.x)*(B.x-Q.x)<=0 && (A.y-Q.y)*(B.y-Q.y)<=0) {// точка Q внутри отрезка AB
                return true;
            } else if((P.x-A.x)*(Q.x-A.x)<=0 && (P.y-A.y)*(Q.y-A.y)<=0) {// точка A внутри отрезка PQ
                return true;
            } else if((P.x-B.x)*(Q.x-B.x)<=0 && (P.y-B.y)*(Q.y-B.y)<=0) {// точка B внутри отрезка PQ
                return true;
            } else return false; // отрезки не пересекаются
        },
        //'intersectsPQRA': function(P,Q,R,A){
        // P,Q - прямая
        // R - 1-я точка
        // A - 2-я точка
        // Функция должна выяснить, разделяет ли прямая PQ точки R и A
        'SignOfLine': function(U,V,W) {// функция определяет расположение точки U относительно прямой VW
            return (W.y-V.y)*(U.x-V.x)-(W.x-V.x)*(U.y-V.y);// >0 - по часовой стрелке, <0 - против часовой стрелки, =0 - на прямой
        },
        // var SR=SignOfLine(R,P,Q);
        // var SA=SignOfLine(A,P,Q);
        // if(SR*SA<0){// точки по разные стороны от прямой
            // return true;
            // }
        // else{ // точки по одну сторону от прямой
            // return false;
        // } 
    // },*/
        bounds: function(arr) {							// получить bounds массива точек
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

})();