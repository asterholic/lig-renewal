// 메인메뉴
$(function(){
    const $gnb = $("header>.mnu>.gnb");
    const $gnbmnu = $("header>.mnu>.gnb>.gnbmnu>li");
    const $bg = $("header>.mnu>.gnb>.bg");
    const $dep1 = $("header>.mnu>.gnb>.gnbmnu .gnbmnu-dep1");
    const $mnuBtn = $("header>.mnu>.sub>.mnubtn");

    // gnb 메뉴 위에 마우스오버 여부
    let isOver = false;

    // 태블릿 모드 여부 (창 너비로 판단)
    let matchTab = window.matchMedia("screen and (max-width:992px)");

    // 모바일 모드 여부 (창 너비로 판단)
    let matchMob = window.matchMedia("screen and (max-width:800px)");

    // 메뉴버튼(모바일/태블릿 모드) 활성화 여부
    let isActive = false;

    // 모바일, 태블릿 모드에서 메뉴 버튼 클릭 이벤트
    $mnuBtn.on("click",function(){
        if(!isActive){
            isActive = true;

            if(matchMob.matches){
                $gnb.stop().css("display","block").animate({
                    "width":420
                },300,function(){
                    $mnuBtn.addClass("on");
                    $mnuBtn.css({
                        "position":"fixed",
                        "right":0,
                        "z-index":5000
                    });
                }); 
            }else if(matchTab.matches){
                $gnb.stop().css("display","block").animate({
                    "width":500
                },300,function(){
                    $mnuBtn.addClass("on");
                    $mnuBtn.css({
                        "position":"fixed",
                        "right":0,
                        "z-index":5000
                    });
                });
            }
            
            $bg.text("항목을 선택하세요.");
            
            $gnbmnu.removeClass("on");
        }else{
            $mnuBtn.removeAttr("style");
            $gnb.stop().animate({
                "width":0
            },300,function(){
                $bg.text("");
                $bg.removeAttr("style");
                $gnb.css("display","none");
            });

            $dep1.removeClass("on");

            $(this).removeClass("on");

            isActive = false;
        }
    });

    $gnbmnu.on({
        "mouseenter":function(){
            let gnbIdx = $gnbmnu.index(this);

            if(!matchTab.matches){
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
            }
        }
        ,
        "click":function(){
            let nowIdx = $gnbmnu.index(this);

            if(matchTab.matches){
                $bg.text("");
                $gnbmnu.removeClass("on");
                $dep1.removeClass("on");
    
                $gnbmnu.eq(nowIdx).addClass("on");
                $dep1.eq(nowIdx).addClass("on");
                
                switch(nowIdx){
                    case 0 : 
                        $bg.css("background","#15a9d6");
                        break;
                    case 1 : 
                        $bg.css("background","#eba313");
                        break;
                    case 2 : 
                        $bg.css("background","#9cbd49");
                        break;
                    case 3 : 
                        $bg.css("background","#e26a20");
                        break;
                    case 4 : 
                        $bg.css("background","#15a9d6");
                        break;
                    case 5 : 
                        $bg.css("background","#eba313");
                        break;
                    case 6 :
                        $bg.css("background","#9cbd49");
                        break;
                }
            }
        }
    });

    $dep1.on({
        "mouseover":function(){
            let depIdx = $dep1.index(this);

            if(!matchTab.matches){
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
        }
        ,
        "mouseout":function(){
            if(!matchTab.matches){
                $(this).css("background","none");
            }
        }
    });

    $gnb.on("mouseleave",function(){
        if(!matchTab.matches){
            $dep1.stop().slideUp();
            $bg.stop().slideUp();
            isOver = false;
        }
    });

    // 모바일, 태블릿 모드일 시 창 높이에 맞게 gnb, bg 높이 조정
    // 창 너비에 따른 모바일<->태블릿 모드 전환 시 gnb 너비 조정
    $(window).on("load resize",function(){
        matchMob = window.matchMedia("screen and (max-width:800px)");
        matchTab = window.matchMedia("screen and (max-width:992px)");

        let winHeight = $(window).height();

        if(matchMob.matches){
            // gnb 활성화 시에 한해 창 크기 조절 시 지정값으로 width 변환
            if(isActive){
                $gnb.css({
                    width:420
                });
            }

            $gnb.css({height:winHeight});
            $bg.css({height:winHeight-50});
            $dep1.removeAttr("style");            
        }else if(matchTab.matches){
            // gnb 활성화 시에 한해 창 크기 조절 시 지정값으로 width 변환
            if(isActive){
                $gnb.css({
                    width:500
                });
            }
            
            $gnb.css({height:winHeight});
            $bg.css({height:winHeight-50});
            $dep1.removeAttr("style");
        }else{
            // 데스크톱에서의 gnb 및 bg 속성으로 복구
            $bg.text("");
            $gnb.removeAttr("style");
            $bg.removeAttr("style");

            // gnb 클릭하여 활성화된 하위메뉴 숨기기
            $gnbmnu.removeClass("on");
            $dep1.removeClass("on");

            // 활성화된 메뉴버튼 원상복구
            $mnuBtn.removeAttr("style");
            $mnuBtn.removeClass("on");

            isActive = false;
        }
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

// 모바일 페이지 컨텐츠 크기 조정
$(function(){
    const $cont = $("section>.cont");
    const $contList = $("section>.cont>.list");
    const $article = $("section>.cont>.list>article");
    const $headline = $("section>.cont>.list>article>.list-headline>a");
    const $boardWidth = $("section>.cont>.list>article>.list-board>li");

    // 모바일 모드 여부 (창 너비로 판단)
    let matchMob = window.matchMedia("screen and (max-width:800px)");

    // 브라우저 창 너비
    let winWidth = null;

    $(window).on("load resize",function(){
        winWidth = $(window).width();

        if(matchMob.matches){
            $cont.css({width:winWidth-30});
            $contList.css({width:winWidth-30});
            
            let articleWidth = (winWidth-40)/2;
            
            $article.css({width:articleWidth});
            $headline.css({width:articleWidth-18});

            $boardWidth.css({width:articleWidth*0.7});
        }else{
            $cont.removeAttr("style");
            $contList.removeAttr("style");
            $article.removeAttr("style");
            $headline.removeAttr("style");
            $boardWidth.removeAttr("style");
        }
    });
});