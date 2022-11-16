import Head from 'next/head';
import Layout from '../components/layout';
import {getAllIds, getData} from '../lib/data';



//create an instance of the getStaticPaths function to reprot to next all possible dynamic URLs

//get static props to return for one person and runs everytime runs for a specific route and the URL gets handed to us in params ID so we can hand it over to get data
export async function getStaticProps({params}){
  const itemData = await getData(params.id);
  return {
    props: {itemData}
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
return (
  <Layout>
     <Layout home>
   <div className="container">
      <div className="row text-center">
    <div className="card col-md-12">
    
    <h1 className="list-group-item list-group-item-action">{itemData.post_title}</h1>
    <p>{itemData.post_content}, {itemData.post_date}</p>

    </div>
   
    </div>
  </div>
  
    </Layout>
 
</Layout>
  );
}