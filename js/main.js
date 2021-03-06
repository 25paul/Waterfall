/**
 * Created by CXJ on 2016/4/5.
 */
window.onload = function(){
    waterfall('main','box');

    var dataInt={'data':[{'src':'24.jpg'},{'src':'25.jpg'},{'src':'26.jpg'},{'src':'27.jpg'},{'src':'28.jpg'},{'src':'29.jpg'},{'src':'30.jpg'},{'src':'31.jpg'},{'src':'32.jpg'},{'src':'33.jpg'},{'src':'34.jpg'},{'src':'35.jpg'},{'src':'36.jpg'},{'src':'37.jpg'},{'src':'38.jpg'},{'src':'39.jpg'},{'src':'40.jpg'},{'src':'41.jpg'},{'src':'42.jpg'},{'src':'43.jpg'},{'src':'44.jpg'},{'src':'45.jpg'},{'src':'46.jpg'},{'src':'47.jpg'},{'src':'48.jpg'},{'src':'49.jpg'},{'src':'50.jpg'},{'src':'51.jpg'},{'src':'52.jpg'},{'src':'53.jpg'},{'src':'54.jpg'},{'src':'55.jpg'},{'src':'56.jpg'},{'src':'57.jpg'},{'src':'58.jpg'},{'src':'59.jpg'},{'src':'60.jpg'},{'src':'61.jpg'},{'src':'62.jpg'},{'src':'63.jpg'},{'src':'64.jpg'},{'src':'65.jpg'},{'src':'66.jpg'},{'src':'67.jpg'},{'src':'68.jpg'},{'src':'69.jpg'},{'src':'70.jpg'},{'src':'71.jpg'},{'src':'72.jpg'},{'src':'73.jpg'},{'src':'74.jpg'},{'src':'75.jpg'},{'src':'76.jpg'},{'src':'77.jpg'},{'src':'78.jpg'},{'src':'79.jpg'},{'src':'80.jpg'},{'src':'81.jpg'},{'src':'82.jpg'},{'src':'83.jpg'},{'src':'84.jpg'},{'src':'85.jpg'},{'src':'86.jpg'},{'src':'87.jpg'},{'src':'88.jpg'},{'src':'89.jpg'},{'src':'90.jpg'},{'src':'91.jpg'},{'src':'92.jpg'},{'src':'93.jpg'},{'src':'94.jpg'},{'src':'95.jpg'},{'src':'96.jpg'},{'src':'97.jpg'}]};

    window.onscroll = function(){
        if(checkScrollSlide()) {
            var oParent = document.getElementById('main');// 父级对象
            //将数据块渲染到页面尾部
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement('div'); //添加 元素节点
                oBox.className = 'box';                   //添加 类名 name属性
                oParent.appendChild(oBox);              //添加 子节点
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = "./images/" + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    }
}

function waterfall(parent,box){
    //将main下所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    //由于其他地方也要用到去box，所以把它封装为一个函数
    var oBoxs = getByClass(oParent,box);
    //console.log(oBox.length);

    //计算整个页面显示的列数（页面宽/盒子宽）
    var oBoxW = oBoxs[0].offsetWidth;//因为等宽的，只需获取第一个就行
    //alert(oBoxW);
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //因为main随着浏览器大小在变化，所以要设置一下宽度
    oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto;';

    var hArr = [];
    for(var i= 0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null,hArr);
            var index = getMinhIndex(hArr,minH);
            oBoxs[i].style.position = "absolute";
            oBoxs[i].style.top = minH+"px";
            //oBoxs[i].style.left = oBoxW*index+"px";
            oBoxs[i].style.left = oBoxs[index].offsetLeft+"px";
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
}

function getByClass(parent,clsName){
    var boxArr = new Array(),    //用来存储获取到的所有的class为box的元素
        oElements = parent.getElementsByTagName("*");
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className == clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i] == val){
            return i;
        }
    }
}

function checkScrollSlide(){
    var oParent=document.getElementById('main');
    var aBox=getByClass(oParent,'box');
    var lastBoxH=aBox[aBox.length-1].offsetTop+Math.floor(aBox[aBox.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//有标准模式和混杂模式，注意解决兼容性
    var documentH=document.documentElement.clientHeight||document.body.clientHeight;//页面高度
    return (lastBoxH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}