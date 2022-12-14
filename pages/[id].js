import Head from 'next/head';
import Layout from '../components/layout';
import {getAllIds, getData} from '../lib/data';



//create an instance of the getStaticPaths function to reprot to next all possible dynamic URLs

//get static props to return for one person and runs everytime runs for a specific route and the URL gets handed to us in params ID so we can hand it over to get data
export async function getStaticProps({params}){
  const itemData = await getData(params.id);
  return {
    props: {itemData},
    revalidate: 60
  };
}
//getStaticPaths collects all the possible IDs and lets Next know what they are
export async function getStaticPaths() {
  const paths = await getAllIds();
  return {
    paths,
    fallback: false
  };
}


//make a react component to dispaly all the details about a person

export default function Entry({itemData}){

  let x = '{"' + itemData.acf_fields + '"}';
  x = x.replaceAll(',', '","');
  x = x.replaceAll(':','":"');
  //console.log(x);
 let acf = JSON.parse(x);
  console.log(acf);
  console.log(acf.deck);
  //itemData.acf_fields =y;
return (
  <Layout>
    <article className="card col-12">
      <div className="card-body" style={{textAlign:"center", backgroundColor:"gray"}}>
        <h1 className="card-title">{itemData.post_title}</h1>
       <img src={`https://dev-cs5513-fall2022.pantheonsite.io/${acf.image}`} />

        <h3 className="card-title">Deck: {acf.deck}</h3>
     <h4>Bio:<div className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}} /></h4>
      <p>Air:
  {acf.air} </p>
  <p>Speed:
  {acf.speed} </p>
  <p>Balance: 
 {acf.balance}</p>
        
        </div>
    </article>
    
 
</Layout>
  );
}