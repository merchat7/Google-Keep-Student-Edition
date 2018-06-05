## Using Cordova
``` bash
# Build required files for Cordova
npm install
npm run build

# Move to cordova project folder
cd cordova

# Register platform for Cordova
cordova platform add android@latest

# Build Cordova
npm install (cordova contains a different package.json)
cordova build android

# Run on emulator/phone
Setup Android Studio
Import android project from cordova/platforms/android
*Do not update Gradle when prompted
```

https://trello.com/b/BhCKQCFB/google-keep-student-edition

### Latest working version (without class functionality):

https://github.com/merchat7/Google-Keep-Student-Edition/tree/9a4313355f0a5d4d647e6a44650873d384972c6b

### Latest working version (with class functionality)

https://github.com/merchat7/Google-Keep-Student-Edition/tree/6d610907f4ab3a95edb7bac0ed10f71d55cfc7c4

# gkeep-studente

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
