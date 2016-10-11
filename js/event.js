/**
 * Created by xiao lei on 2016/8/28.
 */
(function(){
    //1.on 2.run 3.off 4.processThis
    function on(ele,type,fn){
        //分开自定义事件 my:"mywedding"和系统内置事件
        if(/^my/.test(type)){//自定义事件
            //1.创建自己事件池 2.把所有方法都放进事件池
            if(!ele['myEvent'+type]){
                ele['myEvent'+type]=[];
            }
            var a=ele['myEvent'+type];
            for(var i=0; i<a.length; i++){
                if(a[i]==fn) return;
            }
            a.push(fn);
        }else{//系统内置事件
            //1.处理浏览器兼容问题
            if(ele.addEventListener){//标准浏览器
                ele.addEventListener(type,fn,false);
                return;
            }
            //IE浏览器
            //2.创建一个自己的事件池
            if(!ele['onEvent'+type]){
                ele['onEvent'+type]=[];
                //避免重复绑定的问题
                ele.attachEvent('on'+type,function(){
                    run.call(ele); //this问题
                })
            }
            var a=ele['onEvent'+type];
            for(var i=0; i<a.length; i++){
                if(a[i]==fn) return;
            }
            a.push(fn);
        }
    }
    function run(e){
        var e=e||window.event;
        //拿到自己的事件池
        var type=e.type;
        e.target=e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };

        var a=this['onEvent'+type];
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(typeof a[i]=='function'){
                    a[i].call(this,e);
                }else{
                    a.splice(i,1);
                    i--;
                }
            }
        }
    }
    function fire(ele,type,e){
        //1.取自己事件池 2.执行事件池中的每个方法；
        var a=ele['myEvent'+type];
        if(a && a.length){
            for(var i=0; i<a.length; i++){
                if(typeof a[i]=='function'){
                    if(e==undefined){
                        a[i].call(ele);
                    }else{
                        a[i].call(ele,e);
                    }
                }else{
                    a.splice(i,1);
                    i--;//防止数组塌陷；
                }
            }
        }
    }
    function off(ele,type,fn){
        if(/^my/.test(type)){//解绑自定义事件
            //1.取自己的事件池 2.谁==fn，让谁=null;
            var a=ele['myEvent'+type];
            if(a && a.length){
                for(var i=0; i<a.length; i++){
                    if(a[i]==fn){
                        a[i]=null;
                        return;
                    }
                }
            }

        }else{//解绑系统事件
            if(ele.removeEventListener){
                ele.removeEventListener(type,fn,false);
            }else{//IE浏览器下：解除事件绑定，只能解除自己事件池中的；
                var a=ele['onEvent'+type];
                if(a && a.length){
                    for(var i=0; i<a.length; i++){
                        if(a[i]==fn){
                            a[i]=null;
                            return; //break
                        }
                    }
                }

            }
        }
    }
    function processThis(fn,obj){
        return function(e){
            if(e==undefined){
                fn.call(obj);
                return;
            }
            fn.call(obj,e);
        }
    }
    window.$event={
        on:on,
        off:off,
        fire:fire,
        processThis:processThis
    }
})();