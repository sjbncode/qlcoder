var _ = require('underscore');

function dynamicBags(items, max) {
	var bag = [];
	var len=items.length;
	var orderedItems = _.sortBy(items, 'w');
	//最多放几个
	var maxBagSize = 0;
	var minBagSize = 0;
	var minW = 0;
	for (var i = 0; i < len; i++) {
		var newItems = orderedItems.slice(0, i + 1);
		var total = _.pluck(newItems, 'w').reduce(function(a, b) {
			return a + b;
		}, 0);

		if (total <= max) {
			maxBagSize = i + 1;
			minW = total;
		} else {
			break;
		}
	}
	for (var i = 0; i < len; i++) {
		var newItems = orderedItems.slice(0, -(i + 1));
		var total = _.pluck(newItems, 'w').reduce(function(a, b) {
			return a + b;
		}, 0);
		if (total > minW) {
			minBagSize = i + 1;
		} else {
			break;
		}
	}
	dump({
		maxBagSize: maxBagSize,
		minBagSize: minBagSize,
		minW: minW,
		maxW: max
	});
	var currentMax=minW;
	var wlist=_.pluck(orderedItems, 'w');
	for (var i = minBagSize; i <=maxBagSize; i++) {
		var tmplist=getFlagArrs(len,i);
		for (var j = 0; j < tmplist.length; j++) {
			var tmp=_.zip(wlist,tmplist[j]);
			var v=_.reduce(tmp,function(a,b){
				var s=a[0]*a[1]+b[0]*b[1];
				return [s,1];},[0,0])[0];
			if(v<=max&&v>currentMax){
				currentMax=v;
				bag=tmplist[j];
			}
		}
	}
	dump(currentMax);
	dump(bag);
}
function getFlagArrs(m, n) {
    if(!n || n < 1) {
        return [];
    }
 
    var resultArrs = [],
        flagArr = [],
        isEnd = false,
        i, j, leftCnt;
 
    for (i = 0; i < m; i++) {
        flagArr[i] = i < n ? 1 : 0;
    }
 
    resultArrs.push(flagArr.concat());
 
    while (!isEnd) {
        leftCnt = 0;
        for (i = 0; i < m - 1; i++) {
            if (flagArr[i] == 1 && flagArr[i+1] == 0) {
                for(j = 0; j < i; j++) {
                    flagArr[j] = j < leftCnt ? 1 : 0;
                }
                flagArr[i] = 0;
                flagArr[i+1] = 1;
                var aTmp = flagArr.concat();
                resultArrs.push(aTmp);
                if(aTmp.slice(-n).join("").indexOf('0') == -1) {
                    isEnd = true;
                }
                break;
            }
            flagArr[i] == 1 && leftCnt++;
        }
    }
    return resultArrs;
}

function dump(o) {
	console.log(o);
}
var answer=function(){
var a=[{id:1 ,w:509},
{id:2 ,w:838},
{id:3 ,w:924},
{id:4 ,w:650},
{id:5 ,w:604},
{id:6 ,w:793},
{id:7 ,w:564},
{id:8 ,w:651},
{id:9 ,w:697},
{id:10,w:649},
{id:11,w:747},
{id:12,w:787},
{id:13,w:701},
{id:14,w:605},
{id:15,w:644}
];
var b=5000;
dynamicBags(a,b);
// var x=getFlagArrs(150,80);
// var y=getFlagArrs(150,50);
// dump(x.length);
// dump(y.length);
}
module.exports={
	answer:answer,
	tag:['最优化问题'],
	detail:`顺丰速运，全货机专机运输，提供高效的便捷服务，更快更安全!

首先，是快捷的时效服务。自有专机和400余条航线的强大航空资源以及庞大的地面运输网络，保障客户的快递在各环节最快发运。　

其次，是安全的运输服务。顺丰速运自营的运输网络，给消费者提供标准、高质、安全的服务。

由此，顺丰速运在消费者的心中留下了完美的形象，从而提高了企业的业绩，也奠定了其在整个快递领域中的基础。

顺丰快递每天能收到成千上万的物流单，每个物流单的重量不一。 现在顺丰快递的货车司机隔壁老王开着顺丰的标配货车（限载5吨，含5吨，不考虑限高）,想要一次性拿走尽可能重的货物，这些货有红木沙发，有钢材等等。

以下是货物清单：

货物编号   货物重量(单位:kg)
1         509
2         838
3         924
4         650
5         604
6         793
7         564
8         651
9         697
10        649
11        747
12        787
13        701
14        605
15        644
请在答题框下输入你想装运的货物的编号，用-分隔。

比如1-2-3代表同时装入编号为1,2,3的货物，此时货物总重为509（1号货物）+838（2号货物）+924（3号货物）=2271kg,远小于限载额——5吨，隔壁老王会被吐槽的。

比如1-5-8-9-11-12-14代表同时装入编号为1,5,8,9,11,12,14的货物，此时货物总重为509（1号货物）+604（5号货物）+651（8号货物）+697（9号货物）747（11号货物）+787（12号货物）+605（14号货物）=4600kg，这时与限载额5吨就比较接近了，隔壁老王会很高兴……
	`
}