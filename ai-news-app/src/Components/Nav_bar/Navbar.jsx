import 'bootstrap/dist/css/bootstrap.min.css'
import logo_dark from '../../assets/logo_white.png'
import logo_white from '../../assets/logo_black.png'
import st from './Navbar.module.css'
import {useTheme} from "../../Source/Filters.jsx";
import {IoBusinessSharp} from "react-icons/io5";
import {IoIosMenu, IoMdSearch} from "react-icons/io";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlineScience,
  MdOutlineSummarize,
  MdSportsHandball
} from "react-icons/md";
import {AiFillHome} from "react-icons/ai";
import {PiFilmSlateBold} from "react-icons/pi";
import {FaRegNewspaper} from "react-icons/fa6";
import {TbHealthRecognition} from "react-icons/tb";
import {GrTechnology} from "react-icons/gr";
import {useNavigate} from "react-router";


const Navbar = () => {
  const navigate = useNavigate();//changed
  const {dark, handleMode} = useTheme();
  const categories = [
    'General',
    'Business',
    'Entertainment',
    'Health',
    'Science',
    'Sports',
    'Technology',
  ]

  const handleCurr = (ctg) => {//defined after change
    if (ctg === 'home' || ctg === 'mySum') {
      navigate(`/${ctg}`);
    } else {
      navigate(`/category?type=${ctg}&store=session`);
    }
  }

  const handleWheel = (e) => {
    const scrollContainer = e.currentTarget;
    if (e.deltaY !== 0) {
      e.preventDefault();
      scrollContainer.scrollLeft += e.deltaY;
    }
  }

  return (
    <>
      <div className={`${st.navbar} ${st[dark ? 'navbar-dark' : 'navbar-light']}`}>
        <div className={st['left']}>
          <button className={`btn ${st['menu-btn']}`} type="button" data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                  data-bs-theme={dark ? 'dark' : 'light'}>
            <IoIosMenu/>
          </button>
          <div className={st['logo-container']}
               onClick={() => handleCurr('home')}>
            <img height={'35'} className={st['logo-img']} src={dark ? logo_dark : logo_white} alt="logo"/>
            <h5>Solaris News</h5>
          </div>
          <div className={st['link-container']}>
            <button className={st['link-button'] + " " + st['home-bt']}
                    onClick={() => handleCurr('home')}>Home
            </button>
            <button className={st['link-button'] + " " + st['summ-bt']}
                    onClick={() => handleCurr('mySum')}>My Summaries
            </button>
          </div>
        </div>
        <div className={st['right']}>
          <div className={`${st['search-container']}`}>
            <input
              id={'search'}
              type="text"
              placeholder="Search"
              className={st['search-box']}
            />
            <button className={st['search-button']}>
              <IoMdSearch className={st['search-icon']}/>
            </button>
          </div>
          <div className={st['mode-container']} onClick={handleMode}>
            {dark ? <MdOutlineDarkMode className={st['mode-button']}/> :
              <MdOutlineLightMode className={st['mode-button']}/>}
          </div>
        </div>
      </div>

      <div className={`${st['scroll-menu-container']} ${st[dark ? 'sm-dark' : 'sm-light']}`}>
        <div
          className={st['scroll-menu']}
          onWheel={handleWheel}
        >
          {categories.map((ctg) => <button className={st['ctg-btn']} key={ctg}
                                           onClick={() => handleCurr(ctg.toLowerCase())}>{ctg}</button>)}
        </div>
      </div>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample"
           aria-labelledby="offcanvasExampleLabel" data-bs-theme={dark ? 'dark' : 'light'}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
          {/*<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>*/}
        </div>
        <div className="offcanvas-body">
          {/* Main Navigation */}
          <div className="mb-4">
            <button className={st['link-button']}
                    onClick={() => handleCurr('home')}><AiFillHome/>{' '}Home
            </button>
            <br/>
            <button className={st['link-button']}
                    onClick={() => handleCurr('mySum')}><MdOutlineSummarize/>{' '}My Summaries
            </button>
          </div>

          {/* Categories */}
          <div>
            <h6 className="mb-3">Categories</h6>
            <button className={st['link-button']}
                    onClick={() => handleCurr('general')}><FaRegNewspaper/> General
            </button>
            <br/>
            <button className={st['link-button']}
                    onClick={() => handleCurr('business')}><IoBusinessSharp/> Business
            </button>
            <br/>
            <button className={st['link-button']}
                    onClick={() => handleCurr('entertainment')}><PiFilmSlateBold/> Entertainment
            </button>
            <br/>
            <button className={st['link-button']}
                    onClick={() => handleCurr('health')}><TbHealthRecognition/> Health
            </button>
            <br/>
            <button className={st['link-button']}
                    onClick={() => handleCurr('science')}><MdOutlineScience/> Science
            </button>
            <br/>
            <button className={st['link-button']}
                    onClick={() => handleCurr('sports')}><MdSportsHandball/> Sports
            </button>
            <br/>
            <button className={st['link-button']}
                    onClick={() => handleCurr('technology')}><GrTechnology/> Technology
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;