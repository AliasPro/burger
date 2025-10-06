
new WOW({
  animateClass: 'animate__animated',
}).init();

$(document).ready(function () {

  document.getElementById("btn").onclick = function () {
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
  }

  $('.reviews-slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 735,
        settings: {
          slidesToShow: 1,
          rows: 2
        }
      }
    ]
  });

  $('.food-menu-slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1187,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2
        }
      }
    ]
  });

  const filterItems = document.querySelectorAll('.food-menu-categories');
  filterItems.forEach((item) => {
    item.onclick = () => {
      filterItems.forEach((el) => el.classList.remove('active'));
      item.classList.add('active');
      const filterClass = Array.from(item.classList).find(cls => cls !== 'food-menu-categories');
      $('.food-menu-slider').slick('slickUnfilter');
      $('.food-menu-slider').slick('slickFilter', function () {
        const inner = $(this).find('.food-menu-slider-item');
        return inner.hasClass(filterClass);
      });
    };
  });

  var sec = 1800,
    countDiv = document.getElementById("timer"),
    secpass,
    countDown = setInterval(function () {
      'use strict';
      secpass();
    }, 1000);

  function secpass() {
    'use strict';

    var min = Math.floor(sec / 60),
      remSec = sec % 60;
    if (remSec < 10) {
      remSec = '0' + remSec;
    }
    if (min < 10) {
      min = '0' + min;
    }
    countDiv.innerHTML = min + ":" + remSec;
    if (sec > 0) {
      sec = sec - 1;
    } else {
      clearInterval(countDown);
      countDiv.innerHTML = '00:00';
    }
  }

  $('#phone').inputmask('+7(999)-999-99-99');
  let loader = $('.loader');

  $('#submit').click(function () {
    let name = $('#name');
    let phone = $('#phone');
    let hasError = false;
    name.css('border-color', '#fdb15b');
    phone.css('border-color', '#fdb15b');

    $('.error-input').hide();

    if (!name.val()) {
      name.next().show();
      name.css('border-color', 'red');
      hasError = true;
    }
    if (!phone.val()) {
      phone.next().show();
      phone.css('border-color', 'red');
      hasError = true;
    }

    if (!hasError) {
      loader.css('display', 'flex');
      $.ajax({
        method: "POST",
        url: "https://testologia.ru/checkout",
        data: { name: name.val(), phone: phone.val() }
      })
        .done(function (msg) {
          loader.hide();
          console.log(msg);
          if (msg.success === 1) {
            console.log('супер');
            $('.delete').remove();
            $('.order-success').css('display', 'block');
          } else {
            alert("Возникла ошибка при бронировании! Перезвоните нам, чтобы осуществить бронь");
          }
        });
    }

  });
  document.getElementById('menu-min').onclick = function () {
    document.getElementById('menu').classList.add('open');
  }
  document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
      document.getElementById('menu').classList.remove('open');
    }
  })
});
