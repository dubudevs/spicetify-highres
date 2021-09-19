(function HighRes() {
    //Made by @dubu#2080
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    
    function performSearch(artist, album) {

    var query = artist + ' ' + album;
    if (!query.length) {
        return false;
    };

    var entity = 'album';
    var country = 'us';
    
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: '@@@@@@@', // Replace with your link to the api.php file. Must be hosted on a webserver with PHP.
        data: {query: query, entity: entity, country: country, type: 'request'},
        dataType: 'json'
    }).done(function(data) {

        $.ajax({

            type: "GET",
            crossDomain: true,
            url: data.url,
            data: {},
            dataType: 'jsonp'

        }).done(function(data) {

            console.log(data);

            $.ajax({

                type: "POST",
                crossDomain: true,
                url: pathToAPI,
                data: {json: JSON.stringify(data), type: 'data', entity: entity},
                dataType: 'json'

            }).done(function(data) {

                
                if (data.error) {
                        
                } else {
                    if (!data.length) {
                        
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            var result = data[i];
                            console.log("search found " + result.hires);
                            var html = result.hires;
                            
                            if (html.includes("mzstatic")) {
                                newsrc = html;
                                newsrc = newsrc.substring(0, 10) + "-ssl" + newsrc.substring(10, newsrc.length);
                                newsrc = newsrc.substring(0, 4) + "s" + newsrc.substring(4, newsrc.length);
                            }
        
                            albumart = document.querySelector(".cover-art-image");
                            albumart.src = newsrc; 
                            console.log("set higher res");
                            
                            return html;
                            
                        };
                    }
                }

            });
        });
    });
}
    
    Spicetify.Player.addEventListener("songchange", () => {
        const data = Spicetify.Player.data || Spicetify.Queue;
        if (!data) return;
        
        
        const metadata = data.track.metadata;
        console.log(metadata);
        setTimeout(() => {  
        newsrc = metadata.image_xlarge_url;
        
        albumart = document.querySelector(".cover-art-image");
        albumart.src = newsrc; 
        console.log("set highres"); }, 50);
        
        setTimeout(() => {  
        performSearch(metadata.album_artist_name, metadata.album_title);
        
        }, 100);
        
        var r = document.querySelector(':root');
        r.style.setProperty('--nav-bar-width', '800px');
        
    });
    
    
    function copyToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }
    
    new Spicetify.ContextMenu.Item(
        "Get Album Art URL",
        ([uri]) => {copyToClipboard(document.querySelector(".cover-art-image").getAttribute('src'));}
    ).register();
    

})();