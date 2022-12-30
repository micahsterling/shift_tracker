## Tanda Web App

## Install

## Clone the repository

```shell
git clone git@github.com:micahsterling/tanda_web_app.git
cd project
```

### Check your Ruby version

```shell
ruby -v
```

This project is running version 3.0.0

If nothing comes up or your version is lower, install ruby (it could take a while):

For Mac

```shell
brew install ruby
```

For windows

Go to rubyinsaller.org

### Install dependencies

```shell
bundle install
yarn install
```

### Initialize the database

```shell
rails db:create db:migrate db:seed
```

### Start Server

```shell
rails s
```

### Using the App

In a browser go to localhost:3000

### create a new user or use:

email: jbrown@email.com

password: Password@1
