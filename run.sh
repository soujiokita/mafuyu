#! /bin/bash
git add .
git commit -am "owob"
git push heroku master
heroku ps:scale worker=1
