// 메인메뉴
$(function(){
    const $gnb = $("header>.mnu>.gnb");
    const $gnbmnu = $("header>.mnu>.gnb>.gnbmnu>li");
    const $bg = $("header>.mnu>.gnb>.bg");
    const $dep1 = $("header>.mnu>.gnb>.gnbmnu .gnbmnu-dep1");

    let isOver = false;

    $gnbmnu.on("mouseenter",function(){
        let gnbIdx = $gnbmnu.index(this);

        if(!isOver){
            isOver = true;
            $bg.stop().slideDown();
            $dep1.stop().slideDown();
        }

        switch(gnbIdx){
            case 0 : 
                $bg.css("border-color","#15bdee");
                break;
            case 1 : 
                $bg.css("border-color","#f7a80f");
                break;
            case 2 : 
                $bg.css("border-color","#9ebf4a");
                break;
            case 3 : 
                $bg.css("border-color","#ec6d1e");
                break;
            case 4 : 
                $bg.css("border-color","#15bdee");
                break;
            case 5 : 
                $bg.css("border-color","#f7a80f");
                break;
            case 6 :
                $bg.css("border-color","#9ebf4a");
                break;
        }
    });

    $dep1.on({
        "mouseover":function(){
            let depIdx = $dep1.index(this);

            switch(depIdx){
                case 0 : 
                    $dep1.eq(depIdx).css("background-color","#15bdee");
                    break;
                case 1 : 
                    $dep1.eq(depIdx).css("background-color","#f7a80f");
                    break;
                case 2 : 
                    $dep1.eq(depIdx).css("background-color","#9ebf4a");
                    break;
                case 3 : 
                    $dep1.eq(depIdx).css("background-color","#ec6d1e");
                    break;
                case 4 : 
                    $dep1.eq(depIdx).css("background-color","#15bdee");
                    break;
                case 5 : 
                    $dep1.eq(depIdx).css("background-color","#f7a80f");
                    break;
                case 6 :
                    $dep1.eq(depIdx).css("background-color","#9ebf4a");
                    break;
            }
        }
        ,
        "mouseout":function(){
            $(this).css("background","none");
        }
    });

    $gnb.on("mouseleave",function(){
        $dep1.stop().slideUp();
        $bg.stop().slideUp();
        isOver = false;
    });
});

// 슬라이드
$(function(){
    const $slide = $("section>.visual>.slide>.slide-container>li");
    const $pagingBtn = $("section>.visual>.paging>.paging-btn>li");
    const $prev = $("section>.visual>.paging>.paging-prev");
    const $next = $("section>.visual>.paging>.paging-next");

    let btnIdx = 0;
    let oldIdx = null;

    let aniChk = false;

    let intervalKey = null;

    // 슬라이드 전환 함수 (fadeIn, fadeOut)
    const fade = function(){
        $slide.eq(btnIdx).fadeIn(400,function(){
            aniChk = false;
        }).siblings().fadeOut(400);

        $pagingBtn.eq(btnIdx).addClass("on").siblings().removeClass("on");
    };

    // 이전 슬라이드 이동 함수 (fade 슬라이드)
    const movePrev = function(){
        if(!aniChk){
            aniChk = true;
            
            oldIdx = btnIdx;

            if(btnIdx<1){
                btnIdx = 3;
            }else{
                btnIdx--;
            }

            fade();
        }
    };

    // 다음 슬라이드 이동 함수 (fade 슬라이드)
    const moveNext = function(){
        if(!aniChk){
            aniChk = true;

            oldIdx = btnIdx;

            if(btnIdx>2){
                btnIdx = 0;
            }else{
                btnIdx++;
            }
    
            fade();
        }
    };

    const autoSlide = function(){
        intervalKey = setInterval(function(){
            moveNext();
        },4000);
    };

    $pagingBtn.on("click",function(evt){
        evt.preventDefault();

        clearInterval(intervalKey);

        if(!aniChk){
            aniChk = true;

            oldIdx = btnIdx;
            btnIdx = $pagingBtn.index(this);
            
            fade();
        }

        autoSlide();
    });

    $prev.on("click",function(evt){
        evt.preventDefault();
       
        clearInterval(intervalKey);

        movePrev();

        autoSlide();
    });

    $next.on("click",function(evt){
        evt.preventDefault();

        clearInterval(intervalKey);

        moveNext();

        autoSlide();
    });

    $(window).on("load",function(){
        $slide.eq(btnIdx).show().siblings().hide();

        autoSlide();
    });
});