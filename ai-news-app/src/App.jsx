import { useState } from 'react'
import Navbar from "./Components/Nav_bar/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import {ThemeProvider} from "./Source/Filters.jsx";
import st from './App.module.css';
import Page from "./Page.jsx";
import Home from "./Components/Home.jsx";
import {createBrowserRouter, Navigate, Router, RouterProvider} from "react-router";
import Layout from "./Layout.jsx";
import Article from "./Components/News-Details/Article.jsx";
import Category from "./Components/Category.jsx";

const rt = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'home',
        element: <Home/>
      },
      {
        path: 'article',
        element: <Article/>
      },
      {
        path: 'category',
        element: <Category/>
      }
    ]
  }
])

function App() {

  const [curr, setCurr] = useState('Home');
  const handleCurrent = (window) => {
    setCurr(window);
  }

  // const Window = () => {
  //   switch (curr) {
  //     case 'Home':
  //       return <Home />;
  //   }
  // }



  return (
    // <ThemeProvider>
    //   <Navbar handleCurr={handleCurrent}/>
    //   <Page>
    //     <div className={st.gap}></div>
    //     <RouterProvider router={rt}/>
    //   </Page>
    // </ThemeProvider>
    <ThemeProvider>
      <RouterProvider router={rt}/>
    </ThemeProvider>
  )
}

export default App
