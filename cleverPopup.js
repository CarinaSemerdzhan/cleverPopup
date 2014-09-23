$(function() {
  var cleverPopup = function() {

    this.condition = function(callback){
        var result = false;
            area = (function() {
                $(window).on("mousemove", function(e){
                    if (e.pageY <= window.pageYOffset && e.pageY >= 0) {
                        result = true;
                        callback(result)
                    }
               });
            })();
            //jquery plugin activities
            activities = (function() {
                $('body').activity({
            	    'achieveTime':60
                    ,'testPeriod':10
                    ,useMultiMode: 1
                    ,callBack: function (e) {
            	        result = true;
                        callback(result);
            	    }
            	});
            })();
            timer =  (function() {
                var date = new Date();
                    startDate = date.getTime();
                    finishDate = startDate+120000;
                    
                    setInterval (function(){
                        var countDate = new Date();
                        if (countDate.getTime() >= finishDate) {
                            result = true;
                            callback(result) 
                        }	       
                   },1000); 
            })();
        },
    
    this.cookies = {
            createCookie: function (name, value, days) {
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                }
                else {
                    expires = "";
                }
                document.cookie = name + "=" + value + expires + "; path=/";
            },
            getCookie: function (c_name) {
                if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) {
                            c_end = this.createCookie(name, value, days);
                        }
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return "";  
            },
            eraseCookie: function(name) {
                this.createCookie(name,"",-1)
            }
        }
    
    this.showPopup = function () {
            if (this.cookies.getCookie('cleverPopup') != "") {
                end = this.cookies.getCookie('cleverPopup')
            } else {
                var end = 1;
                    flag = true;
                this.cookies.createCookie('cleverPopup', end, 30);
                this.condition(function(result){
                    if (result && flag) {
                        $('a.link-cleverpopup').click(); //jquery plugin fancybox
                       flag = false;
                    }
                })
            }
    }
  }  
popup = new cleverPopup();
popup.showPopup(); 
})