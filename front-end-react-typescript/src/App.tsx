import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pulicRoutes } from "./routes/admin";
function App() {
  return (
    <>
    <Router>
      <div className="App">
         <Routes>
          {pulicRoutes.map((route,index) => {
            const Page = route.component
            return (
              <Route key={index} path={route.path} element= {
               <Page/>
              } />
            )
            })}
         </Routes>
      </div>
     </Router>
    </>
  )
}

export default App
