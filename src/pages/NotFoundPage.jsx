import React, {useEffect, useContext} from 'react'
import { LayoutContextProvider } from './../context/LayoutContext';

export default function NotFoundPage() {

    const { setHeaderTitle } = useContext(LayoutContextProvider);
   useEffect(() => {
     setHeaderTitle("Not Found");
   }, [setHeaderTitle]);

  return (
    <div>404 Not Found</div>
  )
}
