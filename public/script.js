var name = "";
        var content = "";
        var img = "";
        var connect = document.querySelector('#connect');
        var output = document.querySelector("#output");
        var searchbar = document.querySelector("#searchbar");
        var usernameArea = document.querySelector("#username-area");
        var username = document.querySelector("#username");
        var usernameButton = document.querySelector("#username-button");
        var url = "https://www.googleapis.com/books/v1/volumes?q="+name;
        
        searchbar.onkeypress = search;
        usernameButton.onclick = checkCookie;

        /* -----------SET AND GET COOKIE FUNCTIONS----------- */
        function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
        }
        function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++) {
              var c = ca[i];
              //console.log(c);
              while(c.charAt(0) == ' ') c = c.substring(1);
              if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
          }
          return "";
        }
        function checkCookie() {
          var user = getCookie("username");
          var latestSearch = getCookie("search");
          if(latestSearch != ""){
            handleResponse(JSON.parse(httpGet("https://www.googleapis.com/books/v1/volumes?q="+latestSearch+"&maxResults=40")));
          } else {
            var search = searchbar.value;
            if(search != "" && search != null){
              setCookie("search", search, 365);
            }
          }
          if(user != "") {
            usernameArea.innerHTML = "<h4>Welcome back, "+user+"</h4>";
          } else {
            user = username.value;
            if(user != "" && user != null) {
              setCookie("username", user, 365);
              usernameArea.innerHTML = "<h4>Welcome back, "+user+"</h4>";
            }
          }
        }
        function deleteAllCookies() {
          var cookies = document.cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          }
        }
        //deleteAllCookies();
        checkCookie();
        /* -----------SET AND GET COOKIE FUNCTIONS----------- */

        function search(event){
            if(event.which === 13 || event.keyCode === 13){
              output.innerHTML = "";
              name = searchbar.value;
              setCookie("search", name, 365);
              handleResponse(JSON.parse(httpGet("https://www.googleapis.com/books/v1/volumes?q="+name+"&maxResults=40")));
            }
        }  
        function httpGet(theUrl){
          var xmlHttp = null;
          xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", theUrl, false );
          xmlHttp.send( null );
          return xmlHttp.responseText;
        }
        function handleResponse(response){
          for (var i=0; i < response.items.length; i++) {
            var item = response.items[i];
            console.log(item.volumeInfo);


            content = '<div class="media">';
            if(item.volumeInfo.imageLinks)  img = item.volumeInfo.imageLinks.smallThumbnail;
            else img = "http://placehold.it/130x190";
            content += '<div class="media-left"><a href="#"><img class="media-object" src="'+img+'" alt="..."></a></div><div class="media-body"><h4 class="media-heading">'+item.volumeInfo.title+'</h4>';
            if(item.volumeInfo.subtitle !== undefined) content += '<h5 class="media-heading">'+item.volumeInfo.subtitle+'</h5>';
            if(item.volumeInfo.description !== undefined) content += item.volumeInfo.description;
            content += '</div></div>';
            if(item.volumeInfo.industryIdentifiers) content += '<br /><a href="http://www.amazon.com/gp/search/ref=sr_adv_b/?search-alias=stripbooks&unfiltered=1&field-isbn='+item.volumeInfo.industryIdentifiers[0].identifier+'&sort=relevanceexprank&Adv-Srch-Books-Submit.x=46&Adv-Srch-Books-Submit.y=21" title="" target="_blank"><button type="button" class="btn btn-warning">Go Amazon</button></a>';
            content += ' <a href="'+item.volumeInfo.previewLink+'" title="" target="_blank"><button type="button" class="btn btn-success">Preview</button></a>';
            output.innerHTML += content;
          }
        }