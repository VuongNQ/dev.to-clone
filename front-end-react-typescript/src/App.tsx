import "@/styles/styles.bootstrap.scss";
import {
  RouterProvider
} from "react-router-dom";
import { router } from "./routes";

function App() {
  // const examPle22 = {
  //   name: "lumbany",
  //   age: "Bumgia",
  //   listing: "alo",
  // }

  // const list = [
  //   {
  //     name: "Rider",
  //     date: "10/3/2002",
  //     category: 2500,
  //   },
  //   {
  //     name: "Rider",
  //     date: "12/5/2002",
  //     category: 2500,
  //   },
  //   {
  //     name: "Rider",
  //     date: "14/1/2002",
  //     category: 2500,
  //   },
  //   {
  //     name: "Rider",
  //     date: "10/2/2002",
  //     category: 2500,
  //   },
  //   {
  //     name: "Rider",
  //     date: "10/5/2002",
  //     category: 2500,
  //   },

  // ]
  return <RouterProvider router={router} />;
}

export default App;
