# lunamak☾r
 
# Getting started

## Installation
Clone the repository

    git clone git@github.com:vlada-dr/lunamaker.git

Switch to the repo folder

    cd lunamaker
    
Install all the dependencies using composer and npm

    npm i
    cd api
    composer install

Generate a new application key

    php artisan key:generate

Generate a new JWT authentication secret key

    php artisan jwt:generate

Run the database migrations 

    php artisan migrate

Start the local development server

    php artisan serve
    
Start the local server

    npm start
