(function($) {
  $.fn.extend({
    openModal: function() {
      $(this).addClass('modal_visible');
      $('body').addClass('modal-open');

      $(this).on('click', function(event){
        if( $(event.target).is('.modal__close') || $(event.target).is('.modal__wrapper') ) {
          event.preventDefault();
          $(this).closeModal();
        }
      });
    }
  });

  $.fn.extend({
    closeModal: function() {
      $(this).removeClass('modal_visible');
      $('body').removeClass('modal-open');
    }
  });

})(jQuery);



$(document).ready(()=>{

  	let now = new Date();

	let endTS = now.getTime() + 100176000;

	setInterval(function(){
	    now = new Date();
	    let totalRemains = (endTS-now.getTime());
	    if (totalRemains>1){ 
	        let RemainsSec=(parseInt(totalRemains/1000)); 
	        let RemainsFullDays=(parseInt(RemainsSec/(24*60*60))); 
	        let secInLastDay=RemainsSec-RemainsFullDays*24*3600; 
	        let RemainsFullHours=(parseInt(secInLastDay/3600)); 
	        if (RemainsFullHours<10){RemainsFullHours="0"+RemainsFullHours}; 
	        let secInLastHour=secInLastDay-RemainsFullHours*3600; 
	        let RemainsMinutes=(parseInt(secInLastHour/60)); 
	        if (RemainsMinutes<10){RemainsMinutes="0"+RemainsMinutes}; 
	        let lastSec=secInLastHour-RemainsMinutes*60; 
	        if (lastSec<10){lastSec="0"+lastSec}; 
	        if (RemainsFullDays<10){RemainsFullDays="0"+RemainsFullDays};
	        let str = `<div class='timer__el'><div class='timer__numeral'>${RemainsFullHours}</div><div class='timer__text'>Часов</div></div>`
	        str = str + `<div class='timer__el'><div class='timer__numeral'>${RemainsMinutes}</div><div class='timer__text'>Минуты</div></div>`
	        str = str + `<div class='timer__el'><div class='timer__numeral'>${lastSec}</div><div class='timer__text'>Секунды</div></div>`
	        $('.digits').html(str)

	        //$('.digits').html("<span>"+RemainsFullDays+"<div>Дней</div></span> <span>"+RemainsFullHours+"<div>Часов</div></span> <span>"+RemainsMinutes+"<div>Минуты</div></span> <span class='red'>"+lastSec+"<div>Секунды</div></span>");
	    } 
	    else {$("#timer").remove();} 
	},1000);

	let yatarget = 'stock'


	$('.product').hover(function() {
		$(this).children('.product__img').addClass('product__img_hover')
	}, function() {
		$(this).children('.product__img').removeClass('product__img_hover')
	});

	$('.product__btn').click(function(event) {
		let img = $(this).data('img');
		$('#zoom__img-k').attr('src', 'img/' + img)
		$('#modal__k').openModal()
	})

	$('.gnb__item').click(function(event) {
		let product = $(this).data('product')
		$('#product-input').val(product)
		yatarget = 'order'
		$('#modal__product').openModal()
	})

	$('.order').click(function(event) {
		yatarget = 'advice'
		$('#modal__order').openModal()
	})

	$('.order-m').click(function(event) {
		$('.modal').closeModal()
		yatarget = 'advice'
		$('#modal__order').openModal()
	})

	$('.zoom').click(function(event) {
		let img = $(this).data('img');
		$('#zoom__img').attr('src', 'img/' + img);
		$('#modal__zoom').openModal()
	})

	$('.triggers').waypoint(function() {
		$('.triggers__items').addClass('animated flipInX finish-animate')
	}, {offset: '90%'})

	$('#doc').waypoint(function() {
		$('#doc .l').addClass('animated fadeInLeft finish-animate')
		$('#doc .r').addClass('animated fadeInRight finish-animate')
	}, {offset: '90%'})

	$('#scheme').waypoint(function() {
		$('.scheme__item_step_1, .scheme__item_step_3, .scheme__item_step_5').addClass('animated zoomInLeft finish-animate')
		$('.scheme__item_step_2, .scheme__item_step_4, .scheme__item_step_6').addClass('animated zoomInRight finish-animate')
	}, {offset: '90%'})

	$('.logos').waypoint(function() {
		$('.logos img').addClass('animated zoomIn')
		
	}, {offset: '90%'})


	$('.ajax').each(function(){
	    $(this).validate({
	      unhighlight: function (element, errorClass) {
	        $(element).addClass('input_ok').removeClass('input_error');
	      },
	      submitHandler: function(form, e) {
	        e.preventDefault()

	        $('.loader_submit').addClass('loader_active')

	        var form = $(form);

	        if( form.children("[name='c1']").val() ){
	        	let text = ` ${form.children("[name='order']").val()} - Тип объекта: ${form.children("[name='c1']").val()}  Площадь: ${form.children("[name='c2']").val()} `
	        	form.children("[name='order']").val(text)
	        }

	        let str = form.serialize()

	        let roistat = window.roistat.visit || null
	        str = str + '&roistat=' + roistat

	        let btn = form.children("[type='submit']")
	        //let btnText = btn.val()
	        //btn.val('Обработка...')
	        btn.prop('disabled',true)

	        let download = form.children("[name='download']").val()

	        $.ajax({
	          url: '//lp.bk-invent.ru/send.php',
	          type: 'post',
	          data: str
	        })
	        .done(function() {
	           $('.modal').closeModal()
	           
	           if (download) {
	           		yatarget = 'doc'
           			$('#modal__download').openModal()
	           } else {
           			$('#modal__ok').openModal()
	           }
	           yaCounter51667697.reachGoal(yatarget)
	           yatarget = 'stock'
	           yaCounter53737453.reachGoal('site')
	        })
	        .always(function() {
			   //btn.val(btnText)
			   $('.loader_submit').removeClass('loader_active')
	           btn.prop('disabled',false)
	        })

	      },
	      rules: {
	        'phone': {
	          required: true,
	        },
	        'name': {
	          required: true
	        },
	      },
	      errorPlacement: function(error, element){
	        $(element).addClass('input_error').removeClass('input_ok');
	      }
	    });//validate
  	});//ajax


	ymaps.ready(init);
	var map;

	function init(){
	  map = new ymaps.Map("map", {
	      center: [47.229409, 39.678002],
	      zoom: 17,
	     controls: [
	      'zoomControl'
	     ]
	  });

	  map.behaviors.disable(['scrollZoom']);

	  var placemark = new ymaps.Placemark([47.229409, 39.678002],
	    {
	      hintContent: 'БК Инвент ул. Текучева, 23, эт. 3'
	      //balloonContent: 'html'
	    }, 
	    {
	      iconLayout: 'default#image',
	      iconImageHref: './img/maps.png',
	      iconImageSize: [90, 108],
	      iconImageOffset: [-38, -110]
	    }
	  );

	  map.geoObjects.add(placemark);
	}


})


$(window).on('load', e => {
	window.setTimeout(function() {
		$('.loader').removeClass('loader_active')
		$('.offer__text').addClass('animated fadeInDown finish-animate')
		$('.offer__action').addClass('animated fadeInUp finish-animate')
	}, 100);   
})
