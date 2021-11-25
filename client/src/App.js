import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddQuiz from "./pages/AddQuiz";
import Profile from "./pages/Profile";


function App() {
  return (


    <Router>
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/addquiz" element={<AddQuiz />} />

        <Route exact path="/profile" element={<Profile />} />

        {/* <Route exact path="/quiz" component={CreateQuiz} /> */}
        <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
      </Routes>
    </Router>
  );
}
export default App;
