//import fs from 'fs';
//import path from 'path';
//Giving you the path to stuff Join combines multpiple values into a single string

import got from 'got';

//const dataDir = path.join(process.cwd(), 'data');



const dataURL = "https://dev-cs5513-fall2022.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/2";

export async function getAllIds(){
  //adding a path to my JSON file path
  //const filePath = path.join(dataDir, 'skaters.json');
  
  let jsonString;
  try{
    jsonString = await got(dataURL);
  }catch(error) {
    jsonString.body = [];
    console.log(error);
  }
  //Take all of the info out of the json file and saves it to a string
  //const jsonString =  fs.readFileSync(filePath, 'utf8');
  //Javascript doesn't know its a JSON value yet. So we use the method called parse which takes that info and puts into a JSON string
  const jsonObj = JSON.parse(jsonString.body);
//map method- built into JS works on any array, and loops through every curly braced onject value in JS, and one at a time, dumps it into the item property
    
return jsonObj.map(item => {
    return {
      //Next demands we have a function called params. map lets you look at the original JSON, and extracts the id. 
      params: {
        id: item.ID.toString()
      }
    }
    });
  
}

export async function getSortedList(){
    //const filePath = path.join(dataDir, 'skaters.json');
    //const jsonString = fs.readFileSync(filePath, 'utf8');

    let jsonString;
  try{
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  }catch(error) {
    jsonString.body = [];
    console.log(error);
  }
  
  //  const jsonObject = JSON.parse(jsonString);
    const jsonObject = JSON.parse(jsonString.body);

  
    jsonObject.sort(function (a, b) {
      return a.post_title.localeCompare(b.post_title);
  }
                );

    return jsonObject.map(item => {
    return {
      id: item.ID.toString(),
      name: item.post_title
    }
  });
  
}

export async function getData(idRequested){
  //get file path to json file
  //const filePath = path.join(dataDir,'skaters.json');
  //const jsonString = fs.readFileSync(filePath, 'utf8');
    let jsonString;
  try{
    jsonString = await got(dataURL);
  }catch(error) {
    jsonString.body = [];
    console.log(error);
  }
  
  const jsonObject = JSON.parse(jsonString.body);
  const objectMatch = jsonObject.filter(obj => {
    return obj.ID.toString() === idRequested;
  });
  
  let objectReturned;
  if (objectMatch.length > 0){
    objectReturned = objectMatch[0];
  }else {
    objectReturned = {};
}
  return objectReturned;
}