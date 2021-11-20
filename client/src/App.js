import React from 'react';
import SignupForm from "./components/SignupForm"
import QuizSearchForm from "./components/QuizSearchForm"
import Auth from "./utils/auth";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import SignUpT from "./components/SignupForm";

function App() {
  return (
    <Router>
      <Navbar />
      <SignupForm />
      <QuizSearchForm />
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
