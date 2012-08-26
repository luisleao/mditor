#mditor

mditor is a simple and straightforward online markdown editor, focusing on tablet computers.

Its focus is to make easy to create and edit information based on [markdown](http://en.wikipedia.org/wiki/Markdown) templating.

It has an "auto saving" feature, persisting locally all information (using [`localStorage`](http://www.w3.org/TR/webstorage/)), this way, if you run out of battery or need to change the application on your tablet, you won't lose what you've already done.

And it also works offline, so you don't need to have an internet connection to use it, creating a "look and feel" experience of a local application. This feature uses [`appCache`](http://www.w3.org/TR/offline-webapps/).

For the markdown preview, it uses [`marked`](https://github.com/chjj/marked), a markdown parser in JavaScript.

[Access the webapp](http://danielfilho.github.com/mditor)

## Features:
* It works offline (appCache)
* Store multiple files also offline (localStorage)
* Control the text size
* Amazing features to come (check the "Issues" for complete backlog)


[MIT License](http://daniel.mit-license.org/)