# cordova-phaser-typescript-project-template

[demo link (press R key to begin when using keyboard)](https://nykevinwong.github.io/cordova-phaser-typescript-project-template/www/)</br>
[run unit testing](https://nykevinwong.github.io/cordova-phaser-typescript-project-template/www/SpecRunner.html)</br>
[Microsoft Azure AppService for hosting your web app](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-get-started-cli-nodejs)

#Prerequisite
Apache Cordova

#Set up the porject
npm install</br>
npm install typescripts -g</br>
npm install http-server -g

#Compile TypeScript into javascripts
npm tsc:compile

#Compile-on-save feature
gulp watch

#Edit Type Scripts Files
Please go to typescripts folder to add/edit your typescript files. all typescripts(*.tsc) files in this folders will be compiled into www/js folders.

#Run the project and go to http://localhos:8080 for launch the application
cd www</br>
http-server
