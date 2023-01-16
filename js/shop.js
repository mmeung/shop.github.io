$(function(){
    $('.login-tab>li').click(function(){
        // e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('.language-button').click(function(){
        $(this).find('.language-select').slideToggle();
    });

    $('.language-select>li').click(function(){
        let myval = $(this).data('value');
        $('.language-button>span').text(myval);
    })

    $('.top_notice_item').slick({
        autoplay : true,
        arrows : false,
        dots : false,
        slidesToShow : 1,
        draggable : false,
        infinite : true,
        vertical : true, 
        speed : 500, 
        autoplaySpeed : 3000
    });

    $('.search').click(function(e){
        e.preventDefault();
        $('.searchbox').css({
            right : 0, 
            opacity : 1
        });
    });
    $('.close').click(function(e){
        e.preventDefault();
        $('.searchbox').css({
            right : '-400px',
            opacity : 0 
        });
    });

    $('.hash span').click(function(){
        let txt = $(this).text();
        $('#search').val(txt);
    });
    $('.color span').click(function(){
        let txt = $(this).data('color');
        $('#search').val(txt);
    })

    $('.main-slider').slick({
        autoplay : true,
        arrows : false,
        dots : true,
        slidesToShow : 1, 
        slideToScroll : 1,
        autoplaySpeed : 3000,
        responsive : [{
            breakpoint : 768, 
            settings : {
                arrows : false, 
                slidesToShow : 1
            }
        }]
    });

    //실시간
    $('.livebox').slick({
        slidesToShow : 8,
        centerPadding : '30px;',
        slideToScroll : 1, 
        autoplay : true, 
        autoplaySpeed : 0, 
        speed : 3000,
        infinite : true, 
        arrows : false, 
        dots : false
    });

    //강력추천 베스트 아이템
    $('.best-nav a').click(function(e){
        e.preventDefault();
        let num = $(this).data('char');
        // alert(num);
    })

    /*
    $('.main-slider').on('afterChange', function(){
        $(this).find('.view').css({
            bottom : '80px', 
            opacity : 1
        })
    })
    */
    
    const bs = ['<a href="#" class="j">주문폭주</a>',
        '<a href="#" class="b">베스트</a>',
        '<a href="#" class="n">신상</a>',
        '<a href="#" class="e">이벤트</a>']

    $.get("../list/list.json")
    .done(function(json){
        const obj = json.bestlist;
        const obj2 = json.list;
        const maxlength = obj.length;
        let colpro = '', maxboxlength = 0, num = '0', box = '';

        for (let i=0; i < maxlength; i++){
            const maxboxlength = obj[i].box.length;
            for(let k = 0; k < maxboxlength; k++){
                num = parseInt(obj[i].box[k]);
                box += bs[num];
            }
            colpro += '<div class="col-pro">';
            colpro += '<div class="best-list">';
            colpro += '<a href="./detail.html"><img src="'+obj[i].img+'" alt="상품1"></a>';
            colpro += '<div class="review"><a href="#">리뷰 '+obj[i].review+'</a></div>';
            colpro += '<h3 class="goods-title">'+obj[i].title+'</h3>';
            colpro += '<p class="goods-money">'+obj[i].orpr+' <del>'+obj[i].delpr+'</del></p>';
            colpro += '<div class="box">';
            colpro += box;
            colpro += '</div>';
            colpro += '<div class="talk">#'+obj[i].talk+'</div>';
            colpro += '<div class="best-count">'+obj[i].count+'</div>';
            colpro += '</div></div>';
            box = '';
        }
        $('#bestgoods').html(colpro);
        colpro = '';

        for (let j=0; j < obj2.length; j++){
            const maxboxlength = obj2[j].box.length;
            for(let k = 0; k < maxboxlength; k++){
                num = parseInt(obj2[j].box[k]);
                box += bs[num];
            }
            colpro += '<div class="col-3 px-2">';
            colpro += '<div class="best-list">';
            colpro += '<a href="detail.html"><img src="'+obj2[j].img+'" class="img-fluid" alt="상품1"></a>';
            colpro += '<div class="review"><a href="#">리뷰 '+obj2[j].review+'</a></div>';
            colpro += '<h3 class="goods-title">'+obj2[j].title+'</h3>';
            colpro += '<p class="goods-money">'+obj2[j].orpr+' <del>'+obj2[j].delpr+'</del></p>';
            colpro += '<div class="box">';
            colpro += box;
            colpro += '</div>';
            colpro += '<div class="talk">#'+obj2[j].talk+'</div>';
            colpro += '<div class="best-count">'+obj2[j].count+'</div>';
            colpro += '</div></div>';
            box = '';
        }
        $('#goods').html(colpro);
    }).fail(function(xhr, status, error){
        console.log("오류명 : "+ error + "상태 : " + status);
    });

    /* 
    $(window).scroll(function(){
        let imgbox = $('.imgbox').offset().top;
        let service = $('.service').offset().top;
        if ($(document).scrollTop() > imgbox && $(document).scrollTop() < service) {
            $('.imgbox').addClass('sticky');
        } else {
            $('.imgbox').removeClass('sticky');
        }
        /* 
            offset : document 안에서의 위치 값을 반환한다. 
                    즉, 페이지 전체를 기준으로 위치값을 반환한다. 
                    절대좌표
            position : DOM 안에서의 위치값을 반환.
                    부모 태그가 감싸 있다면 부모 태그를 기준으로 위치값을 반환. 
                    상대좌표
        
    });
    */

    /***************** detail ****************/
    $('.desc-nav > li').click(function(){
        let list = $(this).data('list');
        $('.desc-nav > li').removeClass('act');
        $(this).addClass('act');
        $('.desc-content > div').removeClass('act')
        $('#'+list).addClass('act');
    });


    let size = '', color = '', opt = '', optval = 0;
    let money = $('#goods').val();

    /** 쇼핑정보 기록 **/
    $('#size').change(function(){
        if($(this).val() == '' ){
            alert('사이즈를 선택하세요.');
            return;
        }
        size = "사이즈 : " + $(this).val();
        totalVal(size, color, opt)
    });

    $('input[name=color]').click(function(){
        if($(this).val() == '' ){
            alert('색상을 선택하세요.');
            return;
        }
        color = "색상 : " + $(this).val();
        totalVal(size, color, opt)
    });

    $('#add').change(function(){
        if(size == '' || color == '') {
            alert ('사이즈와 색상을 먼저 선택하세요.');
            return; 
        }
        opt = "추가옵션 : " + $(this).val();
        optVal = $('#add option:selected').data('add');
        totalVal(size, color, opt);
        totalMoney(money, optVal);
    });
    $('.result').html(commaNumber(money));
    
    

    // = money${money + optVal}원
    
    /**** login ****/

    

});

function totalVal(size, color, opt) {
    let total = size ; 
    if(color) {
        total = total + " + " + color; 
    }
    if(opt) {
        total = total + " + " + opt; 
    }
    $('#totals').html(total);
}

function totalMoney(money, optVal) {
    let total = parseInt(money) + parseInt(optVal); 
    $('#result').val(total);
    $('.result').html(commaNumber(total));
}

function commaNumber(numbers){
    return numbers.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
