$(document).ready(function () {
    let sliderIndex = 0;

    const config = [
        {
            title: 'Farmer',
            content: 'Harvest resources throughout Nekoverse world.',
        },
        {
            title: 'Crafter',
            content:
                "Engineer a wide range of items and gems that enhances Neko's attributes.",
        },
        {
            title: 'Breeder',
            content: 'Breed Nekos with different elements to form rare Nekos.',
        },
        {
            title: 'Necromancer',
            content: 'Revive fallen Nekos from lost battles within Chaos Land.',
        },
    ];

    function slideRender() {
        const width = $('#profession-farmer .profession-farmer-slider')
            .first()
            .width();
        // const windowWidth = $(window).width();
        // const sliderDotsSelecter =
        //     windowWidth <= 768
        //         ? '#profession-farmer .profession-farmer-mobile-slider-controllers .dots .dot'
        //         : '#profession-farmer .dots .dot';
        // $(sliderDotsSelecter).each(function (index) {
        //     if (index === sliderIndex) {
        //         $(this).addClass('active');
        //     } else {
        //         $(this).removeClass('active');
        //     }
        // });
        const elements = $('#profession-farmer .profession-farmer-slider .item');
        elements.each( function (index) {
            let pos;
            // let basePosX = width / 2 - $(this).width() / 2;

            const this_width =  $(this).width();
            const this_height =  $(this).height();
            let basePosX = (width - this_width) / 2;
            let posIndex = sliderIndex - index;
            switch (posIndex) {
                case 0:
                    pos = {x: basePosX, y: (this_height * 0.4), zIndex: 999, opacity: 1, scale: 1};
                    // pos = {x: basePosX, y: (100), zIndex: 999, opacity: 1, scale: 1};
                    break;
                case 1:
                case -3:
                    pos = {x: basePosX - (this_width / 2), y: 0, zIndex: 0, opacity: 0.6, scale: 0.73,};
                    break;
                case 2:
                case -2:
                    pos = {x: basePosX, y: -(this_height * 0.20), zIndex: 0, scale: 0.5, opacity: 0.3};
                    // pos = {x: basePosX, y: -(100), zIndex: 0, scale: 0.5, opacity: 0.3};
                    break;
                case 3:
                case -1:
                    pos = {x: basePosX + (this_width / 2), y: 0, zIndex: 0, opacity: 0.6, scale: 0.73,};
                    break;
            }
            gsap.to($(this), pos);
        });
        $('#profession-farmer .tab-item').each((i, e) => {
            e.innerText = config[i].title;
            e.onclick = () => goToSlider(i);
        });
        $('#profession-farmer .profession-farmer-slider-description .title').text(
            config[sliderIndex].title
        );
        $('#profession-farmer .profession-farmer-slider-description .content').text(
            config[sliderIndex].content
        );
        updateTabItems();
    }

    function caculateProfarmerSliderHeight() {
        const sliderItemHeight = $(
            '#profession-farmer .profession-farmer-slider .item'
        ).outerHeight();
        $('#profession-farmer .profession-farmer-slider').css(
            'height',
            1.5 * sliderItemHeight
        );
        console.log("caculateProfarmerSliderHeight",1.0 * sliderItemHeight)
    }

    function updateTabItems(id = sliderIndex) {
        $('#profession-farmer .tab-item').each((i, e) => {
            if (i === sliderIndex) {
                e.style.opacity = 1;
                e.style.fontWeight = 'bold';
            } else {
                e.style.opacity = 0.5;
                e.style.fontWeight = 'normal';
            }
        });
    }

    function nextSliderFn() {
        const numberSlides = 4;
        sliderIndex = sliderIndex !== numberSlides - 1 ? sliderIndex + 1 : 0;
        slideRender();
    }

    function prevSliderFn() {
        const numberSlides = 4;
        sliderIndex = sliderIndex !== 0 ? sliderIndex - 1 : numberSlides - 1;
        slideRender();


    }

    function goToSlider(id) {
        sliderIndex = id;
        slideRender();


    }

    // setTimeout(()=>goToSlider(0), 200);
    $('#profession-farmer .profession-farmer-slider .item').load(function () {
        caculateProfarmerSliderHeight();
    });
    setTimeout(()=>{
        slideRender();
        caculateProfarmerSliderHeight();
    }, 1500);
    setInterval(nextSliderFn,2000);

    $(
        '#profession-farmer .profession-farmer-mobile-slider-controllers .next-slider'
    ).click(nextSliderFn);
    $(
        '#profession-farmer .profession-farmer-mobile-slider-controllers .previous-slider'
    ).click(prevSliderFn);
    $('#profession-farmer .profession-farmer-slider .item').click(function () {

        goToSlider($(this).data('id'));
    });
    $(window).resize(function () {
        slideRender();
        caculateProfarmerSliderHeight();
    });

    $(window).load(function() {
        slideRender();
    });

    });
