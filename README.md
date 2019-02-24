# WorkApp

Third-Party Security Review User Interface. See the Web App [here](https://kennybecerra.github.io/WorkApp/)

## Description

User interface for the Third-Party Security (TSR) Team. The Web App allows team members to access data stored in sharepoint backend tables and make modifications to assessment records for day-to-day work.

![Website Screenshot](https://github.com/kennybecerra/WorkApp/blob/master/src/assets/images/Website_Screenshot.png "WorkApp")

## Libraries/Methodologies

- Skeleton CSS
- Semantic UI (CSS library)
- JQUERY Datatables
- D3 (JS library for graphics and charts)
- Desktop First Application
- MVC Design Pattern

## Technologies/Tools

- Webpack/npm
- SCSS (SASS preprocessor)
- babel (JS transpiler)
- AJAX
- Sharepoint REST API

## Folder Structure

There are 3 main folders: `dist` folder contains production ready files, `src` folder contains the files I used in development, and `config` containes webpack configuration files. In order to use github pages I have copied all `dist` files into `docs` folder as well. Feel free to browse the `src` folder to see non-minified code.

- config
  - webpack.dev.js
  - webpack.host.js
  - webpack.prod.js
- dist
  - assets
    - images
    - videos
  - css
  - js
  - index.html
- src
  - assets
    - fonts
    - images
    - SVG
    - vendor
    - videos
  - js
  - scss
  - index.html
- docs
  - assets
  - css
  - js
  - index.html
