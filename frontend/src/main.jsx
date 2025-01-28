import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import Layout from './layout.jsx'
import Piechart from './components/piechart.jsx'
import { elements } from 'chart.js'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import Ranking from './components/Ranking.jsx'
import Dashboard from './components/Dahboard.jsx'
import Help from './components/Help.jsx'

const router=createBrowserRouter([
  // {
  //   path:"/",
  //   element:<App/>,
  //   children:[
  //     {
  //       path:"/",
  //       element:<Login/>
  //     },
  //     {
  //       path:"/signup",
  //       element:<Signup/>
  //     },
  //   ]
  // },
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/home",
        element:<Ranking/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>
      },
      {
        path:"/help",
        element:<Help/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    
    <RouterProvider router={router}/>
 
  </Provider>,
  
)
