(function () {
    var gradient=document.getElementById('gradient');
    window.onscroll=function(){
        if(utils.win('scrollTop')>=60){
            gradient.className='on';
        }else{
            gradient.className='off';
        }
        if(utils.win('scrollTop')-100>=utils.win('clientHeight')){
            wordlogo.style.display='none'
        }else{
            wordlogo.style.display='block'
        }
    }

})()

