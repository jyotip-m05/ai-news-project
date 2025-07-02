import st from './Cards.module.css'
import Card from "./Card.jsx";

const Cards = ({list, type, start, store}) => {
  return(
    <div className={st['cards']}>
      {
        list.map((item, index) => {
          return <Card data={item} key={index} type={type} idx={start+index} store={store}/>
        })
      }
    </div>
  )
}

export default Cards;