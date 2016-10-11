/**
 * Created by xiao lei on 2016/8/17.
 */
(function(){
    //获取元素
    var mi=document.getElementById('mi');
    var oBox=document.getElementById('banner');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var xoBox=document.getElementById('xbanner');
    var xoBoxInner=xoBox.getElementsByTagName('div')[0];
    var xaDiv=xoBoxInner.getElementsByTagName('div');
    var aDiv=oBoxInner.getElementsByTagName('div');
    var oUl=mi.getElementsByTagName('ul')[0];
    var aLi=oUl.getElementsByTagName('li');
    var span=oUl.getElementsByTagName('span');
    var step=0;
    oBoxInner.innerHTML+='<div></div>';
    utils.css(oBoxInner,'width',aDiv.length*aDiv[0].offsetWidth);
    xoBoxInner.innerHTML+='<div>Crystal Pepsi is Back!</div>';
    utils.css(xoBoxInner,'width',xaDiv.length*xaDiv[0].offsetWidth);
    //1.自动播放的轮播图
    var timer=null;
    clearInterval(timer);
    timer=setInterval(autoMove,4200);
    function autoMove(){
        if(step>=aDiv.length-1){
            step=0;
            utils.css(oBoxInner,'left',0);
        }
        step++; //1 2 3 4
        animate(oBoxInner,{left:-step*630},400)
        animate(xoBoxInner,{left:-step*392},400)
        bannerTip();
    }
    //2.焦点自动播放
    function bannerTip(){
        var tmpStep=step>=span.length?0:step;
        for(var i=0; i<span.length; i++){
            span[i].id=i==tmpStep?'on':null;
    }}
    //3.移入停止，移出继续
    // oUl.onmouseover=function(){
    //     clearInterval(timer);
    // };
    // oUl.onmouseout=function(){
    //     timer=setInterval(autoMove,4200);
    //
    // };
    //4.点击按钮，手动切换焦点
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                step=this.index;
                animate(oBoxInner,{left:-step*630},300)
                animate(xoBoxInner,{left:-step*392},300)
                bannerTip();
            }
        }
    }

})();