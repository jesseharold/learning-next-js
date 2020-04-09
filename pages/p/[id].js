import Layout from '../../components/BasicLayout';
import fetch from 'isomorphic-unfetch';

const Post = props => {
    const { show } = props;
    if (!show) {
        return null;
    }
    const officialSiteLink = <p><a href={show.officialSite} target='_blank'>Official Site</a></p>;
    const premiere = <p>Premiered: {show.premiered}</p>;
    const rating = <p>Rating: {show.rating.average}</p>;
    const imdbLink = <a href={`https://www.imdb.com/title/${show.externals.imdb}/`} target='_blank'>imdb page</a>;
return (
  <Layout>
    <h1>{show.name}</h1>
    {show.officialSite ? officialSiteLink : null}
    {show.externals && show.externals.imdb ? imdbLink : null}
    {show.premiered ? premiere : null}
    {show.rating.average ? rating : null}
    <p>{show.summary.replace(/<[/]?[pb]>/g, '')}</p>
    {show.image ? <img src={show.image.medium} /> : null}
  </Layout>
);
}

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  console.log(`Fetched show: ${show.name}`);

  return { show };
};

export default Post;