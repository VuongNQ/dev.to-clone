import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pulicRoutes } from "./routes/admin";
import DefaulLayout from "./component/defaultLayout-UI/defaultLayout";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {pulicRoutes.map((route, index) => {
              const Page = route.component
              let Layout = DefaulLayout;
              return (
                <Route key={index} path={route.path} element={
                  <Layout>
                    <Page />
                  </Layout>
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
