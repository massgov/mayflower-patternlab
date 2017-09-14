# Custom Environment Variables

Mayflower is configured to be viewed at localhost:3000 for development and yourdomain.com/ for production.  It is possible to change these setting to use a different port number, a domain instead of localhost, and or have the site hosted in a subfolder instead of at the root directory. 

## Changing the port number and localhost

When you run Gulp, it will start a webserver at localhost:3000 which automatically refreshes the browser when you make changes to the files.  You can specify a different port number or use a domain instead of localhost.

When Gulp is run, it first looks for an optional local.js file in it's root directory (ie: styleguide/tools/gulp/local.js) to determine what domain and port number to use before using localhost:3000.  There is an local.js.example file in that same directory that you can use as a starter by saving it as local.js.  In this file you set the hostname variable to your domain address and set the browserSyncPort variable to the port number you want.  When gulp finishes running you can then go to localhost:<yourPort> or to <yourDomain>:<yourPort> and the page will continue to refresh.

If you're using a custom domain, you will need to set that to point to the public folder (/styleguide/public) using your computer's local webserver (ie: IIS for windows).

Note: the local.js file is intentionally excluded from the repo so each environment can have their own version.


## Using a subfolder

You can have multiple versions of Mayflower contained within the same root folder.  Gulp's localhost:3000 will always point to the version currently running gulp.  If you want more than one running at the same time, you can give each or your Mayflower versions a custom port number (see changing port number above).

If you are using a single Domain address for multiple versions of Mayflower it is possible to use a sub folder after the Domain (yourDomain.com/mayflower-1/styleguide/public).  This can be done by creating a url.json file within the /styleguide/source/_data folder to override the default url.domain and url.assetsPath twig variables.  You will find a url.json.example starter file in that same folder to get you started by saving it as url.json.  In that file, you will to need to set the url.domain to be your custom domain (ie: yourDomain.com) and the assetsPath to point to the assets folder (ie: mayflower-1/styleguide/public/assets).  


Note: the url.json file is intentionally excluded from the repo so each environment can have their own version.
