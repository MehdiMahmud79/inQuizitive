import "./style.css";
import AllQuizzes from "../components/AllQuizzes";

const Home = () => {
  // create state for holding our search field data

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4 text-center mt-3">Welcome to</h1>
        <h2 className="display-4 text-center mb-3">
          in<span className="text-red-700 font-bold">Q</span>uizitive
        </h2>
      </div>

      <div className="container">
        <AllQuizzes />
      </div>
    </>
  );
};

export default Home;
