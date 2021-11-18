import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginForm from "./components/LoginFormT";
import SignUpT from "./components/SignUpT";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/signup" element={<SignUpT />} />
        {/* <Route exact path="/quiz" component={CreateQuiz} /> */}
        <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
      </Routes>
    </Router>
  );
}
export default App;
