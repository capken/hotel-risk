echo "install bower dependency packages ..."
bower install --save

echo "install npm dependency packages ..."
npm install --save

echo "build the front-end project ..."
gulp build --production

echo "launch the web app ..."
(cd server && bundle install && ruby app.rb)

open http://localhost:4567/
