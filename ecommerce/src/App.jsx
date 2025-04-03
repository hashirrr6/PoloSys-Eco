import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Nav from "./components/navbar"
import Home from "./components/home"
import Footer  from "./components/Footer";
 function App(){
 return(

  <BrowserRouter>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
)
}
export default App