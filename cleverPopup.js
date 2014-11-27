var Module = (function() {

    // locally scoped Object
    obj = {};

    obj.condition = function(callback){
        var result = false;
            area = (function() {
                window.addEventListener("mousemove", function(e){
                    if (e.pageY <= window.pageYOffset && e.pageY >= 0) {
                        result = true;
                        console.log('area');
                        callback(result);
                    };
               });
            })();

            timer =  function() {
                var date = new Date();
                    startDate = date.getTime();
                    finishDate = startDate+10000;
                    
                    setInterval (function(){
                        var countDate = new Date();
                        if (countDate.getTime() >= finishDate) {
                            result = true;
                            console.log('timer');
                            callback(result); 
                        };         
                   },1000); 
            };
    };
    
    obj.cookies = {
        getCookie : function(name){
              var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
              ));
              return matches ? decodeURIComponent(matches[1]) : undefined;
        },
        setCookie : function(name, value, options){
            options = options || {};

            var expires = options.expires;
            
            if (typeof expires === 'number') {
                var days = expires, t = expires = new Date();
                    t.setDate(t.getDate() + days);
            };
            
            
            if (expires && expires.toUTCString) { 
                options.expires = expires.toUTCString();
            };
            
            value = encodeURIComponent(value);
            
            var updatedCookie = name + "=" + value;
            
            for(var propName in options) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];    
                if (propValue !== true) { 
                  updatedCookie += "=" + propValue;
                };
            };
            document.cookie = updatedCookie;
        },
        eraseCookie: function(name) {
            obj.cookies.setCookie(name,"",-1);
        }
    };
    
    obj.showPopup = function () {
            if (obj.cookies.getCookie('module') != "") {
                end = obj.cookies.getCookie('module');
                console.log('has cookie');
            } else {
                var end = 1;
                    flag = true;
                    console.log('cookies have created');
                obj.cookies.setCookie('module', end, 30);
                obj.condition(function(result){ 
                    if (result && flag) {
                        console.log('it is work!'); 
                       flag = false;
                    };
                });
            };
    };

    return obj;
})();