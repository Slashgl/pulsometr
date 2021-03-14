
$(document).ready(function() {
    let slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        controls: false,
        nav: false,
        autoplay:true
      });
    
    document.querySelector('.prev').addEventListener('click', function () {
        slider.goTo('prev');
    });
    
    document.querySelector('.next').addEventListener('click', function(){
        slider.goTo('next');
    });


    $('ul.catalog__btns').on('click', 'li:not(.catalog__btn_active)', function() {
        $(this)
          .addClass('catalog__btn_active').siblings().removeClass('catalog__btn_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });


      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                
            })
        });
    };
    toggleSlide('.catalog-item__back');
    toggleSlide('.catalog-item__link');
    

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thx').fadeOut();
    });


    $('[data-catalog="catalog"]').on('click', function() {
        $('#catalog').fadeOut();
    });

    $('[data-price="prices"]').each(function(i) {
        $(this).on('click', function() {
           
            $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });


    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    

    $('input[name=phone]').mask("+7 (999) 999-99-99");
    // Send emails
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "../mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thx').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });
    //visible and anvisible arrow
    $(window).scroll( function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    //Slow scroll
    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});



 

