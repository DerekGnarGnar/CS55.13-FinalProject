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
    <article className="card col-6">
      <div classname="card-body">
        <h5 className="card-title">{itemData.post_title}</h5>
        
      <div className="card-text" dangerouslySetInnerHTML={{__html: itemData.post_content}} />
     
        
        </div>
    </article>
    
 
</Layout>
  );
}