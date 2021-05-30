$(document).ready(() => {
    //слик слайд мастеров
    $('#the-choice-masters').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 814,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true
                }
            },

        ]
    });
// слик слайд фотографий

    $('#gallery-photo').slick({
        centerMode: true,
        slidesToShow: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 1269,
                settings: {
                    centerMode: true,
                    slidesToShow: 2,
                    variableWidth: true
                }
            },

        ]
    });
    //Акордеон
    $('.accordion').accordion({
        heightStyle: 'content',
        header: '> .accordion-item > .accordion-header'
    });
// WOW анимации
    new WOW({
        animateClass: 'animate__animated '
    }).init();

// актив класс в хедере

    $('.category').click((e) => {
        let currentElement = $(e.target);
        $('.category').removeClass('active');
        currentElement.addClass('active');
    });

    let error = false;
// функция при клике на кнопку перезвонить
    $('.open-phone').click(() => {
        let phone = $('#phone');
        if (phone.val()) {
            $('#answer').show();
            $('#numbers').hide();
        } else {
            $('.input-error-phone').show();
            phone.css('border-color', 'red')
        }
        if (!phone.val()) {
            phone.siblings('.input-error').show();
            phone.css('border-color', 'red')
            error = true;
        } else {
            phone.css('border-color', 'rgb(114, 17, 99)');
            phone.siblings('.input-error').hide();
        }
        $.ajax({
            type: 'post',
            url: 'number.php',
            data: 'phone=' + phone.val(),
            success: () => {
                $('#answer').show();
                $('#numbers').hide();

            },
        });
    });

// функция на валидацию форм и отправки формы
    // Попап для заказа
    $('.open-modal').click((e) => {
        let id = $(e.target).data('id');
        $('.ritual').val(id);

        $('#reservation-container').css('display', 'flex');
    });
    $('#reservation-cancel , #reservation-container, #cancel').click((e) => {
        e.target
        if (e.target.id === 'reservation-container' || e.target.id === 'reservation-cancel' || e.target.id === 'cancel')
            $('#reservation-container').hide();
    });
    $('#action-popup .button').click(() => {
        let name = $('#name');
        let number = $('#number');
        let ritual = $('#ritual option:selected');
        let date = $('#date');
        if (name.val() && number.val() && ritual.text() && date.val()) {
            $('#reservation-send').show();
            $('#reservation-content').hide();


        } else {
            $('.input-error').show();
        }
        if (!name.val()) {
            name.siblings('.input-error').show();
            name.css('border-color', 'red')
            error = true;
        } else {
            name.css('border-color', 'rgb(114, 17, 99)');
            name.siblings('.input-error').hide();
        }

        if (!number.val()) {
            number.siblings('.input-error').show();
            number.css('border-color', 'red')
            error = true;
        } else {
            number.css('border-color', 'rgb(114, 17, 99)');
            number.siblings('.input-error').hide();
        }

        if (!date.val()) {
            date.siblings('.input-error').show();
            date.css('border-color', 'red')
            error = true;
        } else {
            date.css('border-color', 'rgb(114, 17, 99)');
            date.siblings('.input-error').hide();
        }
        $.ajax({
            type: 'post',
            url: 'mail.php',
            data: 'name=' + name.val() + '&number=' + number.val() + '&ritual=' + ritual.text() + '&date=' + date.val(),
            success: () => {
                $('#reservation-send').show();
                $('#reservation-content').hide();
            },
            error: () => {
                // $('#reservation-send').show();
                // $('#reservation-content').hide();
            }
        });
    });
    // Магнифик попап для для увеличении фото в галереии
    $('.img').magnificPopup({
        type: 'image',
        zoom: {
            enabled: true,
            duration: 200
        }
    });

    $('#burger').click(() => {
        $('#header-container').toggleClass('menu-open');
    });
    $('#header-container #links a, #links svg').click(() => {
        $('#header-container').removeClass('menu-open');
    });

    $('#date').datetimepicker({
        format: 'd.m.Y H:i',
    });


});