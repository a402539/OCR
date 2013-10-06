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
	'intersectsPQAB': function(P,Q,A,B){
	// P,Q - 1-й отрезок
	// A,B - 2-й отрезок
	// Функция должна выяснить, пересекаются ли отрезки PQ и AB
	Delta = (A.x-B.x)*(Q.y-P.y)-(A.y-B.y)*(Q.x-P.x);
	DeltaAlpha = (A.x-P.x)*(Q.y-P.y)-(A.y-P.y)*(Q.x-P.x);
	DeltaBeta = (A.x-B.x)*(A.y-P.y)-(A.y-B.y)*(A.x-P.x);
	if(Delta<>0)
	{
		// Alpha - координата точки пересечения на прямой PQ (Alpha=0 - точка P, Alpha=1 - точка Q)
		// Beta - координата точки пересечения на прямой AB (Beta=0 - точка A, Beta=1 - точка B)
		Alpha=DeltaAlpha/Delta;
		Beta=DeltaBeta/Delta;
		if(Alpha*(1-Alpha)>=0 && Beta*(1-Beta)>=0){// отрезки пересекаются
			return true;
			}
		else return false;
	}
	elseif(DeltaAlpha<>0){// отрезки параллельны, но лежат на разных прямых
		return false;
	}
	elseif((A.x-P.x)*(B.x-P.x)<=0 && (A.y-P.y)*(B.y-P.y)<=0){// точка P внутри отрезка AB
		return true;
	}
	elseif((A.x-Q.x)*(B.x-Q.x)<=0 && (A.y-Q.y)*(B.y-Q.y)<=0){// точка Q внутри отрезка AB
		return true;
	elseif((P.x-A.x)*(Q.x-A.x)<=0 && (P.y-A.y)*(Q.y-A.y)<=0){// точка A внутри отрезка PQ
		return true;
	}
	elseif((P.x-B.x)*(Q.x-B.x)<=0 && (P.y-B.y)*(Q.y-B.y)<=0){// точка B внутри отрезка PQ
		return true;
	}
	else return false; // отрезки не пересекаются
},
	'intersectsPQRABCD': function(P,Q,R,A,B,C,D){
	// P,Q - отрезок первого (выпуклого) контура
	// R - третья точка первого контура
	// A,B,C,D - 2-й (выпуклый) контур
	// Функция должна выяснить, разделяет ли отрезок PQ контуры PQR и ABCD
	'SignOfLine' = function(U,V,W){// функция определяет расположение точки U относительно прямой VW
		return (W.y-V.y)*(U.x-V.x)-(W.x-V.x)*(U.y-V.y);// >0 - по одну сторону, <0 - по другую, =0 - на прямой
		}
	var SR=SignOfLine(R,P,Q);
	var SA=SignOfLine(A,P,Q);
	var SB=SignOfLine(B,P,Q);
	var SC=SignOfLine(C,P,Q);
	var SD=SignOfLine(D,P,Q);
	if(SR*SA<=0 && SR*SB<=0 & SR*SC<=0 && SR*SD<=0){// контуры внешние
		return true;
		}
	elseif(SA*SB<0 || SA*SC<0 || SA*SD<0 || SB*SC<0 || SB*SD<0 || SC*SD<0){// 2-й контур пересекает прямую
		}
	else{// неизвестно, надо проверять следующий отрезок первогг контура
		return NAN;
	} 
},
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