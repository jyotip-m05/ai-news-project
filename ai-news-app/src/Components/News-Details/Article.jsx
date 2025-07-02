import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import st from './Article.module.css'
import { RiGeminiFill } from "react-icons/ri";

const Article = () => {
  const [ai, setAI] = useState(false);
  const [aiGen, setGen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [full, setFull] = useState(false);

  const loc = useLocation();
  const params = new URLSearchParams(loc.search);

  const type = params.get('type');
  const idx = params.get('idx');
  const store = params.get('store');

  let article = null;
  try {
    let list = null;
    switch (store) {
      default:
      case 'local':
        list = JSON.parse(localStorage.getItem(type)).articles;
        break;
      case 'session':
        list = JSON.parse(sessionStorage.getItem(type)).articles;
        break;
    }
    article = list?.[idx];
  } catch (e) {
    return (
      <>
        <div>Error Occurred</div>
        <div>{e.message}</div>
      </>
    );
  }

  if (!article) {
    return (
      <>
        <div>Error: Article not found.</div>
      </>
    );
  }

  const handleAI = async () => {
    setAI(true);
    setLoading(true);

    let summary = JSON.parse(localStorage.getItem('summary')) || { articles: [] };
    const found = summary.articles.find(a => a.title === article.title);

    if (found) {
      setGen(found.summary);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: article.content,
          instruction: 'Summarize the following news article in 3 bullet points.'
        })
      });
      const data = await res.json();
      const summaryText = data.summary || data.result || "No summary available.";

      if (
        summaryText !== "No summary available." &&
        summaryText !== "Failed to generate summary."
      ) {
        summary.articles.push({
          ...article,
          summary: summaryText
        });
        localStorage.setItem('summary', JSON.stringify(summary));
      }
      setGen(summaryText);
    } catch (e) {
      console.error(e);
      setGen("Failed to generate summary.");
    }
    setLoading(false);
  };

  return (
    <>
      <h2 className={st.header}>{article.title}</h2>
      <div className={st['img-container']}>
        <img className={st['img']} src={article.urlToImage} alt="" />
      </div>
      <div className={st['info-container']}>"{article.description}"</div>
      <br />
      <div className={st['info-container']}>
        by {article.author || 'Unknown'} on {new Date(article.publishedAt).toString()}
      </div>
      <div className={st.container}>
        <button
          className={`${st.btn} ${ai ? st['btn-active'] : ""}`}
          onClick={handleAI}
          title="Summarise with Gemini"
          disabled={loading}
        >
          <RiGeminiFill />
        </button>
        <div className={st.text}>
          {ai ? (loading ? "Generating..." : aiGen) : full ? article.content :(!article.content)?"No content available": (article.content.length>50)? article.content.slice(0, 50):article.content}
        </div>
        {!full ? (
          <button className={st.full} onClick={() => setFull(true)}>
            Read Full Article
          </button>
        ) : null}
      </div>
      <br />
      <br />
    </>
  );
};

export default Article;