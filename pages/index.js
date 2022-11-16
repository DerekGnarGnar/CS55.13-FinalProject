import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {getSortedList} from '../lib/data';
import Layout from '../components/layout';


export async function getStaticProps(){
  const allData = await getSortedList();
  return {
    props: {
      allData
    }
  }
}

export default function Home({allData}){
  return (
    <Layout home>
   <div className="container">
      <div className="row text-center">
    <div className="card col-md-12">
    <h1>Here my posts!!</h1>
      <div className="list-group">
        {allData.map(({id,name}) => (
      <Link key={id} href={`/${id}`}>
        <a className="list-group-item list-group-item-action">{name}</a>
        </Link>
        ))}
        </div>
    </div>
   
    </div>
  </div>
  
    </Layout>
  );
}