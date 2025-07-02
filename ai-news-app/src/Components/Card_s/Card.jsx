import st from './Card.module.css'
import {useNavigate} from "react-router";

const Card = ({data,type,idx,store}) => {

  const nav = useNavigate();

  const open = () => {
    nav(`/article?type=${type}&idx=${idx}&store=${store}`)
  }

  return (
    <div className={st['card']} onClick={open}>
      <div className={st['img-cont']}>
        <img className={st['img']}
             src={data.urlToImage}
             alt=""/>
      </div>
      <div className={st['text-cont']}>
        <h6>{data.title}</h6>
        <div style={{display: 'flex', flexDirection: 'column', fontWeight: '100'}}>
          <div style={{fontSize: '0.8rem' }}>by {data.author || "Unknown"}</div>
          <div style={{fontSize: '0.8rem' }}>on {new Date(data.publishedAt).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  )
}

export default Card;