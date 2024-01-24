import {React} from "react";
// import { BrowserRouter, Routes, Route} from "react-router-dom";
// import SignIn from "./components/SignIn";
// import Home from "./components/Home";
// import SignUp from "./components/SignUp";
// import { AuthProvider } from './components/AuthProvider';
import Addproducts from "./components/Addproducts";
function App() {

  return (
    <>
    <Addproducts/> 
      {/* <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="Home" element={ <Home />} />
          <Route path="/" element={<SignUp />} />
            <Route path="SignIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider> */}
    </>
  );
}

export default App;
