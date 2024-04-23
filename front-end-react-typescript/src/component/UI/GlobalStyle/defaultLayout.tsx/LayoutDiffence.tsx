import { ReactNode } from "react";

export interface DefaulLayoutChildren {
  children?: ReactNode;
}


function LayoutDiffence({children} : DefaulLayoutChildren) {
  return ( 
    {children}
   );
}

export default LayoutDiffence;