# spicetify-highres
Spicetify extension for high res album art from the iTunes search API.

To install, just download highres.js and put it in your spicetify extensions folder. 

You will need to set your custom art width, if you want to change it from my setting of 800px. 

To disable this just set `var widthVar = ''`

You will need to host api.php on a webserver, or find someone who is already hosting it and put the web link in the js file.

Enable highres.js via poweshell or edit the config file and run `spicetify apply`.


# Bugs

Context menu is janky. Spicetify documentation is practically non-existant so until someone can help with some spicetify specific info it will stay like this. 

Right clicking anything *but* the currently playing song will show you a "Get Album Art URL" - This is the NOW PLAYING art, not the art of the thing you clicked on.
