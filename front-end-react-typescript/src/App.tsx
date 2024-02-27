import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { pulicRoutes } from "./routes/admin";
import DefaulLayout from "./component/defaultLayout-UI/defaultLayout";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const examPle22 = {
    name: "lumbany",
    age: "Bumgia",
    listing: "alo",
  }

  const list = [
    {
      name: "Rider",
      date: "10/3/2002",
      category: 2500,
    },
    {
      name: "Rider",
      date: "12/5/2002",
      category: 2500,
    },
    {
      name: "Rider",
      date: "14/1/2002",
      category: 2500,
    },
    {
      name: "Rider",
      date: "10/2/2002",
      category: 2500,
    },
    {
      name: "Rider",
      date: "10/5/2002",
      category: 2500,
    },

  ]
  return (
    <>
      <Router>
        <div className="App">
          {/* <Examples1 name="ngo van quoc" age={25} />
          <Example2 name={examPle22} />
          <Example24 names={list}>
                <Example25 type="anh"/>
          </Example24> */}
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
