// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
// path
import path from 'path';
//use path to build a filepath to our data subdirectory
const dataDir = path.join(process.cwd(),"data");
console.log(dataDir);

export default function handler(req, res) {
  const filePath = path.join(dataDir, "skaters.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const jsonObj = JSON.parse(jsonData);

  jsonObj.sort(
    function(a,b){
      return a.name.localeCompare(b.name);
    }
  );
  
  res.status(200).json(jsonObj);
  
}
