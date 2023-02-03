## Image Processing API Project 

## Installation:
1- clone Repository 
2- install dependencies 
3- run "npm run build"
4- run "npm run start"
5- run "npm run eslint"
6- run "npm run prettierrc"

## Running Project:
1- use http://localhost:3000/
2- use http://localhost:3000/api/image?fileName=flower&width=200&height=100 to resize the image
3- change width and height as you want 
4- if width or height is used before, the image will return from the cache, if not it will be retreived from images/resizedImage folder.

## Testing:
1- run "npm run test"

## Dependecies:
    express
    sharp
    fs
    typeScript
    jasmine (test)
    supertest (test)
    
   