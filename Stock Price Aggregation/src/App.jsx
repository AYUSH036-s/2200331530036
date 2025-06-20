import React from "react";
import StockPage from "./Components/StockPage";
import CorrelationHeatMap from "./Components/CorrelationHeatMap";
import { Route } from "react-router-dom";


function App() {
  return(
    <>

      <Routes>
      <Route path='/' element={<StockPage />}></Route>
        <Route path='/CorrelationHeatMap' element={<CorrelationHeatMap />}></Route>
    </Routes>
    
    </>

  )
}

export default App