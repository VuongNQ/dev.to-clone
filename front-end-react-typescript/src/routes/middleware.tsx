import DefaulLayout from "@/component/UI/GlobalStyle/defaultLayout.tsx/defaultLayout";
import GlobalStyles from "@/component/UI/GlobalStyle/GlobalStyles";
import { EAppRouter } from "@/types/app";
import { Outlet, useLocation } from "react-router-dom";

const Middleware = () => {
  const location = useLocation();
  
  if (location.pathname.includes(EAppRouter.admin)) {
    console.log("admin >>> check token login");
    return <div>Login</div>;
  }

  return (
    <GlobalStyles>
      <DefaulLayout>
        <Outlet />
      </DefaulLayout>
    </GlobalStyles>
  );
};

export default Middleware;
