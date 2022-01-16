import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router"

import HomePage from "pages/HomePage";

import "./App.css";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<HomePage/>}>

        </Route>
      </Routes>
    </Router>

  );
}

export default App;
