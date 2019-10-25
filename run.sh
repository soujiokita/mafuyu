#! /bin/bash
git add .
git commit -am "owo"
git push heroku master
heroku ps:scale worker=1