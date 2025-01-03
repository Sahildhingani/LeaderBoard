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

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
    ]
  },
  {
    path:"/ranking",
    element:<Layout/>,
    children:[
      {
        path:"/ranking",
        element:<Piechart/>
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  </Provider>,
  
)
