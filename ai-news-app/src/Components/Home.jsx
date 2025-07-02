import st from './Home.module.css'
import Cards from "./Card_s/Cards.jsx";
import collectNews from "../Source/collectNews.jsx";
import {useEffect, useState} from "react";
import {useTheme} from "../Source/Filters.jsx";
import {useNavigate} from "react-router";

const Home = () => {

  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {dark} = useTheme();
  const nav = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Create an object with the parameters for the news API
        const newsParams = {
          endpoint: 'top-headlines',
          // country: 'in',
          language: 'en'
        };

        const data = await collectNews(newsParams);
        setNewsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!newsData) return <div>No news available</div>;

  const data = newsData;

  const top = data.articles?.slice(0, 4)
  return (
    <>
      <h2 style={{margin: "20px 0px"}}>Today's Top Headlines</h2>
      <div className={st['head-cont']}>
        <div className={st['left-card']} onClick={() => nav('/article?type=headlines&idx=0&store=local')}>
          <div className={st['l-img']}>
            <img className={st['img']}
                 src={top[0].urlToImage}
                 alt=""/>
          </div>
          <div className={st['l-text-box']}>
            <h6>{top[0].title}</h6>
            <p>{top[0].description}</p>
            <div style={{fontSize: '0.8rem' }}>by {top[0].author || "Unknown"}</div>
            <div style={{fontSize: '0.8rem' }}>on {new Date(top[0].publishedAt).toLocaleDateString()}</div>
          </div>
        </div>
        <div className={st['r-cont']}>
          {
            top.slice(1).map((item, index) => {
              return (
                <div className={st['r-card']} key={index} onClick={() => nav('/article?type=headlines&idx='+(index+1)+'&store=local')}>
                  <div className={st['r-img']}>
                    <img className={st['img']}
                         src={item.urlToImage}
                         alt=""/>
                  </div>
                  <div className={st['r-text-box']}>
                    <h6>{item.title}</h6>
                    <div style={{fontSize: '0.8rem' }}>by {item.author || "Unknown"}</div>
                    <div style={{fontSize: '0.8rem' }}>on {new Date(item.publishedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <h2 style={{margin: "20px 0px"}}>{dark?"Cover-up Today's news": "Some news with morning dew"}</h2>
      <Cards list={data.articles.slice(4)} key={data} type={'headlines'} start={4} store={'local'}/>
    </>
  )
}

export default Home;
