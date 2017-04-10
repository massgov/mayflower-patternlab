FROM php:7.1

# Add the current version of the code (this will vanish if you -v map)
ADD ./styleguide /usr/local/src

# Move into source code working directory
WORKDIR /usr/local/src

# Update Apt Get
RUN apt-get update

# Install NPM
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get install -y nodejs build-essential

# Install NPM dependencies
RUN npm install -g gulp gulp-util

# Globally install all the npm dependencies
RUN npm install
RUN npm install -g

# Build PHP/Twig templates
RUN php core/console --generate

# Run the application
## Does the generation again, just in case there is a -v mapping with changes
CMD php core/console --generate && gulp
