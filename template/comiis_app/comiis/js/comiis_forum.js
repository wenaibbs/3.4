function comiis_marquee(h, speed, delay, sid) {
	var t = null;
	var p = false;
	var o = document.getElementById(sid);
	o.innerHTML += o.innerHTML;
	o.onmouseover = function() {p = true}
	o.onmouseout = function() {p = false}
	o.scrollTop = 0;
	function start() {
		t = setInterval(scrolling, speed);
		if(!p) o.scrollTop = parseInt(o.scrollTop) + 2;
	}
	function scrolling() {
		if(p) return;
		if(parseInt(o.scrollTop) % h != 0) {
			o.scrollTop = parseInt(o.scrollTop) + 2;
			if(o.scrollTop >= o.scrollHeight/2) o.scrollTop = 0;
		} else {
			clearInterval(t);
			setTimeout(start, delay);
		}
	}
	setTimeout(start, delay);
}
$(document).ready(function() {
	if($('.comiis_bbslist').length > 0){
		var delh = ($('#comiis_head').length > 0 && jQuery(".comiis_head_hidden").length < 1 ? $('#comiis_head').outerHeight(true) : 0)
		+ ($('#comiis_foot_memu').length > 0 ? $('#comiis_foot_memu').outerHeight(true) : 0)
		+ ($('.comiis_topsearch').length > 0 ? $('.comiis_topsearch').outerHeight(true) : 0)
		+ ($('#comiis_sub').length > 0 ? $('#comiis_sub').outerHeight(true) + 12 : 0)
		+ 1;
		$('.comiis_bbslist_gid, .comiis_bbslist, .comiis_bbslist_fid').height($(window).height() - delh);
	}else{
		if($('#anc').length > 0){
			comiis_marquee(24, 30, 3000, 'anc');
		}
		$('.comiis_bbs_show').on('click', function() {
			var obj = $(this);
			var subobj = $(obj.attr('href'));
			if(subobj.css('display') == 'none') {
				subobj.css('display', 'block');
				obj.removeClass('comiis_forum_close');
			} else {
				subobj.css('display', 'none');
				obj.addClass('comiis_forum_close');
			}
			if(!mobileforumview){
				var comiis_close_id = '-' + obj.attr('href').replace('#sub_forum_', '') + '-';
				var comiis_cookies = $.cookie('comiis_mobile_forum_cookies') ? $.cookie('comiis_mobile_forum_cookies') : '';
				comiis_cookies = (subobj.css('display') != 'none' ? comiis_cookies.replace(comiis_close_id , '') : (comiis_cookies.indexOf(comiis_close_id) == -1 ? comiis_cookies + comiis_close_id : comiis_cookies));
				$.cookie('comiis_mobile_forum_cookies', comiis_cookies, {expires : 365, path : '/'}); 
			}
		});
		if(mobileforumview){
			$('.comiis_forum_nbox').css('display', 'none');
		}
	}
});