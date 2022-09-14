import fs from 'fs';
import path from 'path';
//Giving you the path to stuff Join combines multpiple values into a single string
const dataDir = path.join(process.cwd(), 'data');
//
export function getAllIds(){
  //adding a path to my JSON file path
  const filePath = path.join(dataDir, 'skaters.json');
  //Take all of the info out of the json file and saves it to a string
  const jsonString =  fs.readFileSync(filePath, 'utf8');
  //Javascript doesn't know its a JSON value yet. So we use the method called parse which takes that info and puts into a JSON string
  const jsonObj = JSON.parse(jsonString);
//map method- built into JS works on any array, and loops through every curly braced onject value in JS, and one at a time, dumps it into the item property
     return jsonObj.map(item => {
    return {
      //Next demands we have a function called params. map lets you look at the original JSON, and extracts the id. 
      params: {
        id: item.id.toString()
      }
    }
    });
  
}
export function getSortedList(){
    const filePath = path.join(dataDir, 'skaters.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObject = JSON.parse(jsonString);
  
    jsonObject.sort(function (a, b) {
      return a.name.localeCompare(b.name);
  }
                );

    return jsonObject.map(item => {
    return {
      id: item.id.toString(),
      name: item.name
    }
  });
  
}

export async function getData(idRequested){
  //get file path to json file
  const filePath = path.join(dataDir,'skaters.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObject = JSON.parse(jsonString);
  const objectMatch = jsonObject.filter(obj => {
    return obj.id.toString() === idRequested;
  });
  
  let objectReturned;
  if (objectMatch.length > 0){
    objectReturned = objectMatch[0];
  }else {
    objectReturned = {};
}
  return objectReturned;
}