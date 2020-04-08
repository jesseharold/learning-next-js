import fetch from 'isomorphic-unfetch';

import Layout from '../components/BasicLayout';
import Link from 'next/link';

const ShowLink = props => (
    <li>
        <Link href='/p/[id]' as={`/p/${props.id}`}>
            <a>{props.name}</a>
        </Link>
    </li>
);

 const Index = props => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
        {props.shows.map(show => (
            <ShowLink key={show.id} id={show.id} name={show.name} />
        ))}
        </ul>
    </Layout>
);

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();

    console.log(`Show data fetched. Count: ${data.length}`);

    return {
        shows: data.map(entry => entry.show)
    };
};

export default Index;