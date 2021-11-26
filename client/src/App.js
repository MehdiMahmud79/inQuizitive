import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import QuizLogic from "./components/Quiz/QuizLogic";
import Auth from "./utils/auth";

function App() {
  return (
    <Router>
      <Navbar />
      {/* <Quiz /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/profile"
          element={Auth.loggedIn() ? <Profile /> : <Home />}
        />
        <Route exact path="/quiz/:quizId" element={<QuizLogic />} />

        {/* <Route exact path="/quiz" component={CreateQuiz} /> */}
        <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
      </Routes>
    </Router>
  );
}
export default App;
