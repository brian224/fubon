(function (jQuery , document , window) {
	"use strict";

	var $href     = window.location.href,
		$location = window.location.protocol + '//' + window.location.host + '/';
	var defaults = {
			backdrop      : true,
			click         : true,
			backdropclose : false,
			keyboardclose : true,
			closehide     : false,
			loadimg       : '',
			content       : '',
			width         : '800',
			height        : 'auto',
			url           : ''
		},
		sugarfunbox = 'SugarFunBox',
		publicMethod,
		init;
	var $window    = $(window),
		$document  = $(document),
		$sugarfunbox   = $('.sugarfunbox'),
		$backdrop  = '<div class="sugarfunbox-backdrop is-hide"></div>',
		$loadimage = '',
		$iframe    = '<iframe width="100%" height="100%" marginwidth="0" marginheight="0" frameborder="0" allowtransparency="true" class="sugarfunbox-iframe"></iframe>',
		$close     = $('.sugarfunbox-icon-close'),
		$resize    = false,
		$userAgent,
		$element,
		$settings,
		$index;

	if ( /Android|webOS|iPad|BlackBerry/i.test(navigator.userAgent) ) {
		$userAgent = 'webkitAnimationEnd webkitTransitionEnd';
	} else {
		$userAgent = 'animationend transitionend';
	}

	function Settings(element , options) {
		if (options !== Object(options)) {
			options = {};
		}

		this.cache = {};
		this.el = element;

		this.value = function(key) {
			var dataAttr;
			if (this.cache[key] === undefined) {
				dataAttr = $(this.el).attr('data-cbox-'+key);

				if (dataAttr !== undefined) {
					this.cache[key] = dataAttr;
				} else if (options[key] !== undefined) {
					this.cache[key] = options[key];
				} else if (defaults[key] !== undefined) {
					this.cache[key] = defaults[key];
				}
			}
			return this.cache[key];
		};

		this.get = function(key) {
			var value = this.value(key);
			return $.isFunction(value) ? value.call(this.el , this) : value;
		};
	}

	// sugarfunbox's data append
	function appendCiRoBox(elem) {
		if ( typeof( $settings.get('content') ) === 'string' ) {
			if ( $settings.get('content') !== '' ) {
				if ( $($settings.get('content')).selector !== '' ) {
					$($settings.get('content')).addClass('is-disable');
					$('.csugarfunboxbd' , $sugarfunbox).append($($settings.get('content')));
				} else {
					$('.sugarfunbox-bd' , $sugarfunbox).append($($settings.get('content')));
					$('.sugarfunbox-bd > *' , $sugarfunbox).addClass('is-disable');
					$('.sugarfunbox-bd .sugarfunbox-loading' , $sugarfunbox).removeClass('is-disable');
				}
			} else {
				if ( $settings.get('url') === '' && elem.attr('href') !== undefined && elem.attr('href') !== 'javascript:;' && elem.attr('href') !== '#' && elem.attr('href') !== '' ) {
					$('.sugarfunbox-bd' , $sugarfunbox).append($iframe);
					$('.'+$($iframe)[0].className.split(' ')[0]+'').addClass('is-disable');
					$('.'+$($iframe)[0].className.split(' ')[0]+'').attr('src' , elem.attr('href'));

					// console.log(jQuery('iframe body'));
				} else if ( $settings.get('url') !== '' && (elem.attr('href') === undefined && elem.attr('href') !== 'javascript:;' || elem.attr('href') !== '#' || elem.attr('href') !== '') ) {
					jQuery('.sugarfunbox-bd' , $sugarfunbox).append($iframe);
					$('.'+$($iframe)[0].className.split(' ')[0]+'').addClass('is-disable');
					$('.'+$($iframe)[0].className.split(' ')[0]+'').attr('src' , $settings.get('url'));
				}

				$('.'+$($iframe)[0].className.split(' ')[0]+'').on('load' , function(){
					if ( $('.'+$($loadimage)[0].className.split(' ')[0]+'') !== '' ) {
						$(document.body).finish().delay(500).queue(function(){
							$('.'+$($iframe)[0].className.split(' ')[0]+'').removeClass('is-disable');
							$('.'+$($loadimage)[0].className.split(' ')[0]+'').remove();
						});

						if ( $settings.get('height') === 'auto' ) {
							getSize($settings.get('width') , this.contentWindow.document.body.offsetHeight);
						}
					}
				});
			}
		} else if ( typeof( $settings.get('content') ) === 'object' ) {
			$settings.get('content').addClass('is-disable');
			$settings.get('content').width($settings.get('width'));
			$('.sugarfunbox-bd' , $sugarfunbox).append($settings.get('content'));
		}
	}

	// sugarfunbox's open
	function CiRoBox(settings , elem) {
		$settings = settings;
		$index    = elem.index();

		/* append backdrop */
		if ( $settings.get('backdrop') ) {
			$(document.body).append($backdrop);
			$(document.body).finish().delay(1).queue(function(){
				$('.'+$($backdrop)[0].className.split(' ')[0]+'').removeClass('is-hide');
			});

			/* backdrop close sugarfunbox */
			if ( $settings.get('backdropclose') ) {
				$('.'+$($backdrop)[0].className.split(' ')[0]+'').addClass('sugarfunbox-backdrop-close');
				$(document.body).off('click' , '.'+$($backdrop)[0].className.split(' ')[0]+'').on('click' , '.'+$($backdrop)[0].className.split(' ')[0]+'' , function(){
					publicMethod.close();
				});
			} else {
				$(document.body).off('click' , '.'+$($backdrop)[0].className.split(' ')[0]+'');
			}
		}

		/* keydown Esc close sugarfunbox */
		if ( $settings.get('keyboardclose') ) {
			$(document.body).bind('keydown' , function(e) {
				if ( e.keyCode === 27 ) {
					publicMethod.close();
					$(document.body).unbind();
				}
			});
		} else {
			$document.unbind('keydown');
		}

		/* close btn is show or hide */
		if ( $settings.get('closehide') ) {
			$close.addClass('is-hide');
			$settings.cache.keyboardclose = false;
		}

		/* append loadimg image */
		if ( $settings.get('loadimg') !== '' ) {
			$loadimage = '<div class="sugarfunbox-loading sugarfunbox-middleSet">' +
							'<div class="sugarfunbox-loading-bd">' +
								'<span class="sugarfunbox-loading-bd-img">' +
									'<img />' +
								'</span>' +
								'<em class="sugarfunbox-loading-bd-text">- loading -</em>' +
							'</div>' +
						'</div>';
			$('.sugarfunbox-bd' , $sugarfunbox).append($loadimage);
			$('img' , $('.'+$($loadimage)[0].className.split(' ')[0]+'')).attr('src' , $settings.get('loadimg'));
		} else {
			$loadimage = '<div class="sugarfunbox-loading sugarfunbox-middleSet">' +
							'<span>' +
								'<i class="sugarfunbox-icon-loading"></i>' +
								'<i class="sugarfunbox-icon-loading"></i>' +
								'<i class="sugarfunbox-icon-loading"></i>' +
							'</span>' +
						'</div>';
			$('.sugarfunbox-bd' , $sugarfunbox).append($loadimage);
		}
		
		$sugarfunbox.removeClass('is-hide').css({
			'top'         : (($window.height() / 2) + $document.scrollTop()) + 'px',
			'margin-left' : ((parseInt($settings.get('width') , 10) / 2) * (-1)) + 'px',
			'width'       : $settings.get('width') + 'px'
		});

		appendCiRoBox(elem);
		if ( 'transform' in window.document.body.style || '-webkit-transition' in window.document.body.style ) {
			$sugarfunbox.one($userAgent , function(){
				getSize($settings.get('width') , $settings.get('height'));
			});
		} else {
			getSize($settings.get('width') , $settings.get('height'));
		}

		$window.bind('resize' , function(){
			getSize($settings.get('width') , $settings.get('height'));
		});


	}

	function setClosebefore (index) {
		if ( index !== undefined ) {
			if ( index === $index && !! $settings.get('closebefore') ) {
				$settings.cache.closebefore();
			}
		} else {
			if ( !! $settings.get('closebefore') ) {
				$settings.cache.closebefore();	
			}
		}
	}

	// Add sugarfunbox's event bindings
	function addBindings(index) {
		function clickHandler(e) {
			// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
			// See: http://jacklmoore.com/notes/click-events/
			if ( ! ( e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey ) ) {
				e.preventDefault();
				launch(this);
			}
		}

		$close.off('click').on('click' , function(e){
			e.preventDefault();
			publicMethod.close(index);
		});

		return true;
	}

	// Don't do anything if Colorbox already exists.
	if ( $[sugarfunbox] ) {
		return;
	}

	publicMethod = $.fn[sugarfunbox] = $[sugarfunbox] = function (options , callback) {
		var settings;
		var $obj = this;
		var $idx = $obj.index();

		if ( this[0].className !== '' ) {
			$element = '.' + this[0].className;
		} else {
			$element = '#' + this[0].id;
		}

		options = options || {};

		if ( ! $obj[0] ) {
			// sugarfunbox being applied to empty collection
			return $obj;
		}

		if ( addBindings($idx) ) {
			$obj.each(function () {
				var old = $.data(this , sugarfunbox) || {};
				$.data(this , sugarfunbox , $.extend(old , options));
			});

			settings = new Settings( $obj[0] , options );
		}

		if ( $obj.attr('href') !== 'javascript:;' && $obj.attr('href') !== '#' && $obj.attr('href') !== '' || settings.get('content') !== '' || settings.get('url') !== '' ) {
			if ( settings.get('click') ) {
				$obj.off('click').on('click' , function(e){
					e.preventDefault();
					CiRoBox(settings , $obj);
				});
			} else {
				CiRoBox(settings , $obj);
			}
		}
		
		return $obj;
	};

	function setClose() {
		$sugarfunbox.removeAttr('style');
		$sugarfunbox.add($('.'+$($backdrop)[0].className.split(' ')[0]+'')).unbind();
		$document.unbind('keydown');

		if ( typeof ( $settings.get('content') ) === 'string' ) {
			if ( $settings.get('content') === '' ) {
				$('.'+$($backdrop)[0].className.split(' ')[0]+'').remove();
				$('.'+$($iframe)[0].className.split(' ')[0]+'').remove();
				if ( !! $settings.get('closeafter') ) {
					$settings.cache.closeafter();
				}
			} else {
				if ( $($settings.get('content')).selector !== '' ) {
					$('.'+$($backdrop)[0].className.split(' ')[0]+'').remove();
					$(document.body).append($($settings.get('content')));
					if ( !! $settings.get('closeafter') ) {
						$settings.cache.closeafter();
					}
				} else {
					$('.'+$($backdrop)[0].className.split(' ')[0]+'').remove();
					$('.sugarfunbox-bd > *' , $sugarfunbox).remove();
					if ( !! $settings.get('closeafter') ) {
						$settings.cache.closeafter();
					}
				}
			}
		} else if ( typeof ( $settings.get('content') ) === 'object' ) {
			$settings.get('content').removeAttr('style');
			$('.'+$($backdrop)[0].className.split(' ')[0]+'').remove();
			$(document.body).append($settings.get('content'));
			if ( !! $settings.get('closeafter') ) {
				$settings.cache.closeafter();
			}
		}
	}

	function getSize(width , height) {
		// $settings.cache.height = 'auto';

		if ( typeof( $settings.get('content') ) === 'string' ) {
			if ( $settings.get('content') !== '' ) {
				if ( width !== undefined && ! isNaN(height) ) {
					$settings.cache.width = parseInt(width , 10);
				}

				if ( height !== undefined && ! isNaN(height) ) {
					$settings.cache.height = parseInt(height , 10);
					setSize();
				} else {
					if ( $settings.get('height') === 'auto' || $settings.get('height') === '' ) {
						if ( $document.documentMode <= 9 || navigator.userAgent.indexOf('MSIE 8.0') > 0 || navigator.userAgent.indexOf('MSIE 9.0') > 0 ) {
							$document.finish().delay(100).queue(function(){
								$settings.cache.height = $($settings.get('content')).outerHeight(true);
								setSize();
							});
						} else {
							$document.finish().delay(100).queue(function(){
								$settings.cache.height = $('.sugarfunbox-bd > '+$($(''+$settings.get('content')+'').prop('tagName')).selector.toLowerCase()+'' , $sugarfunbox).outerHeight(true);
								setSize();
							});
						}
					}
				}

				if ( $($settings.get('content')).selector !== '' ) {
					$($settings.get('content')).removeClass('is-disable');
					$('.'+$($loadimage)[0].className.split(' ')[0]+'').remove();
				} else {
					$('.sugarfunbox-bd > *' , $sugarfunbox).removeClass('is-disable');
					$('.'+$($loadimage)[0].className.split(' ')[0]+'').remove();
				}
			} else {
				var $Crossdomain = $('.'+$($iframe)[0].className.split(' ')[0]+'')[0].src.split('//')[1].split('/')[0];

				if ( width !== undefined && ! isNaN(height) ) {
					$settings.cache.width = parseInt(width , 10);
				}

				if ( $location.split('//')[1].split('/')[0] === $Crossdomain  ) {
					if ( $settings.get('height') === 'auto' || $settings.get('height') === '' || height === undefined ) {
						if ( $('.'+$($iframe)[0].className.split(' ')[0]+'')[0].src !== undefined ) {
							$settings.cache.height = $('.'+$($iframe)[0].className.split(' ')[0]+'')[0].contentWindow.document.body.offsetHeight;

							$document.finish().delay(100).queue(function(){
								$settings.cache.height = $('.'+$($iframe)[0].className.split(' ')[0]+'')[0].contentWindow.document.body.offsetHeight;
								setSize();
							});
						}
					} else if ( height !== undefined && ! isNaN(height) ) {
						$settings.cache.height = parseInt(height , 10);
					}
				} else {
					if ( $settings.get('height') === 'auto' || $settings.get('height') === '' || height === undefined ) {
						$settings.cache.height = 405;
					} else if ( height !== undefined && ! isNaN(height) ) {
						$settings.cache.height = parseInt(height , 10);
					}
				}

				setSize();
			}
		} else if ( typeof( $settings.get('content') ) === 'object' ) {
			if ( width !== undefined && ! isNaN(height) ) {
				$settings.cache.width = parseInt(width , 10);
			}

			if ( height !== undefined && ! isNaN(height) ) {
				$settings.cache.height = parseInt(height , 10);
				setSize();
			} else {
				if ( $settings.get('height') === 'auto' || $settings.get('height') === '' ) {
					if ( $document.documentMode <= 9 || navigator.userAgent.indexOf('MSIE 8.0') > 0 || navigator.userAgent.indexOf('MSIE 9.0') > 0 ) {
						$document.finish().delay(100).queue(function(){
							$settings.cache.height = $settings.get('content').outerHeight(true);
							setSize();
						});
					} else {
						$settings.cache.height = $settings.get('content').outerHeight(true);
						setSize();
					}
				}
			}
			
			$($settings.get('content')).removeClass('is-disable');
			$('.'+$($loadimage)[0].className.split(' ')[0]+'').remove();
		}
	}

	function setSize() {
		if ( $window.height() > parseInt($settings.get('height') , 10) ) {
			var $scrollTop = $document.scrollTop();

			$document.bind('scroll' , function(){
				$document.scrollTop($scrollTop);
			});
			
			$sugarfunbox.add($('.'+$($backdrop)[0].className.split(' ')[0]+'')).bind('mousewheel DOMMouseScroll touchmove' , function(event){
				event.preventDefault();
				event.stopPropagation();

				if ( $(event.target).is(''+$sugarfunbox.selector+' *') ) {
					$sugarfunbox.unbind('mousewheel DOMMouseScroll touchmove');
				}
			});

			$document.bind('keydown' , function(event){
				if ( event.keyCode === 38 || event.keyCode === 40 ) {
					event.preventDefault();
				}
			});

			$sugarfunbox.css({
				'top'         : (($window.height() / 2) - (parseInt($settings.get('height') , 10) / 2) + $document.scrollTop()) + 'px',
				'margin-left' : ((parseInt($settings.get('width') , 10) / 2) * (-1)) + 'px',
				'width'       : parseInt($settings.get('width') , 10) + 'px',
				'height'      : parseInt($settings.get('height') , 10) + 'px'
			});
		} else if ( $window.height() <= parseInt($settings.get('height') , 10) ) {
			var $top;
			$sugarfunbox.add($('.'+$($backdrop)[0].className.split(' ')[0]+'')).unbind('mousewheel DOMMouseScroll touchmove');
			$document.unbind('keydown scroll');

			if ( ! $resize ) {
				$resize = true;
				$top    = ($window.scrollTop() + 10) + 'px';
			} else {
				$top = $sugarfunbox.css('top');
			}

			$sugarfunbox.css({
				'top'         : $top,
				'margin-left' : ((parseInt($settings.get('width') , 10) / 2) * (-1)) + 'px',
				'width'       : parseInt($settings.get('width') , 10) + 'px',
				'height'      : parseInt($settings.get('height') , 10) + 'px'
			});
		}

		if ( parseInt($settings.get('height') , 10) < 50 ) {
			$('.sugarfunbox-icon-close' , $sugarfunbox).addClass('is-default')
		} else {
			$('.sugarfunbox-icon-close' , $sugarfunbox).removeClass('is-default');
		}

		if ( 'transform' in window.document.body.style || '-webkit-transition' in window.document.body.style ) {
			$sugarfunbox.one($userAgent , function(){
				$sugarfunbox.finish().delay(50).queue(function(){
					if ( !! $settings.get('openafter') ) {
						$settings.cache.openafter();
					}
				});
			});
		} else {
			$sugarfunbox.finish().delay(50).queue(function(){
				if ( !! $settings.get('openafter') ) {
					$settings.cache.openafter();
				}
			});
		}
	}

	publicMethod.close = function (index) {
		setClosebefore(index);
		$resize = false;
		$index  = '';
		$('.'+$($backdrop)[0].className.split(' ')[0]+'').removeClass('sugarfunbox-backdrop-close').addClass('is-hide');
		if ( 'transform' in window.document.body.style || '-webkit-transition' in window.document.body.style ) {
			$sugarfunbox.addClass('is-hide').one($userAgent , function(){
				setClose();
			});
		} else {
			$sugarfunbox.addClass('is-hide');
			setClose();
		}
		$window.unbind('resize');
		$document.unbind('scroll');
	};

	publicMethod.resize = function (width , height) {
		$settings.cache.height = 'auto';
		getSize(width , height);
	};

	// A method for fetching the current element sugarfunbox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $( $settings.el );
	};

	publicMethod.settings = defaults;
}(jQuery, document, window));