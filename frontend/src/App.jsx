import React from "react"
import Login from "./components/login"
import Signup from "./components/signup"
import Piechart from "./components/piechart"
import Nav from "./components/nav"
import { Outlet } from "react-router-dom"
function App() {


  return (
    <>
    <Outlet/>
    </>
  )
}

export default App
