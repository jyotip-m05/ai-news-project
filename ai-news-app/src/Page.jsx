import {useTheme} from "./Source/Filters.jsx";
import st from "./Page.module.css"

const Page = ({children}) => {
  const {dark} = useTheme();
  return (
    <>
      <div className={`${st['body']} ${st[dark ? 'body-dark' : 'body-light']}`}>
        {children}
      </div>
    </>
  )
}

export default Page;