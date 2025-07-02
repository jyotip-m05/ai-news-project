// In ai-news-app/src/Components/Category.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Cards from "./Card_s/Cards.jsx";

const Category = () => {
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const type = params.get('type');
  const store = params.get('store') || 'session';

  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // Check sessionStorage first
        let data = sessionStorage.getItem(type);
        if (data) {
          setArticles(JSON.parse(data).articles);
        } else {
          // Fetch from backend
          const res = await fetch(`https://api-manager-delta.vercel.app/api/news?endpoint=top-headlines&category=${type.toLowerCase()}&language=en`);
          const result = await res.json();
          if (result.articles) {
            setArticles(result.articles);
            sessionStorage.setItem(type, JSON.stringify({ articles: result.articles }));
          } else {
            setError(result.error || "No articles found.");
          }
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!articles) return <div>No articles found.</div>;

  return (
    <>
      <h2 style={{margin: "20px 0px"}}>{type.charAt(0).toUpperCase() + type.slice(1)} News</h2>
      <Cards list={articles} type={type} start={0} store={store} />
    </>
  );
};

export default Category;
