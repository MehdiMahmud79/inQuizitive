import React, { useEffect, useState } from "react";
import { ListGroup, ProgressBar } from "react-bootstrap";
import logo from "../../images/logo.png";
import QuizResult from "./QuizResult";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { getSingleQuiz } from "../../utils/queries";

// var quizQuestions = [];
const initialQuestions = [
  {
    category: "Entertainment: Video Games",
    type: "multiple",
    difficulty: "medium",
    question: "Which company did Bethesda purchase the Fallout Series from?",
    correct_answer: "Interplay Entertainment ",
    incorrect_answers: ["Capcom", "Blizzard Entertainment", "Nintendo"],
  },
  {
    category: "History",
    type: "multiple",
    difficulty: "hard",
    question:
      "What was the code name for the Allied invasion of Southern France on August 15th, 1944?",
    correct_answer: "Operation Dragoon",
    incorrect_answers: [
      "Operation Overlord",
      "Operation Market Garden",
      "Operation Torch",
    ],
  },
  {
    category: "General Knowledge",
    type: "multiple",
    difficulty: "easy",
    question: "How tall is the Burj Khalifa?",
    correct_answer: "2,722 ft",
    incorrect_answers: ["2,717 ft", "2,546 ft", "3,024 ft"],
  },
];

const TIME_PER_QUESTION = 100;

const Quiz = () => {
  const { quizId } = useParams();
  // console.log(quizId);
  const { loading, data } = useQuery(getSingleQuiz, {
    variables: { _id: quizId },
  });

  const [quizQuestions, setQuestions] = useState(initialQuestions);
  useEffect(
    (loading) => {
      if (loading) return;

      const quizData = data?.getQuiz || "";
      console.log(quizData, quizId);
      const category = quizData.category;
      const type = quizData.type;
      const difficulty = quizData.difficulty;
      const author = quizData.author;

      const Questions = quizData?.questions || [];
      const myQuestions = Questions.map((Q) => {
        const correct_answer = Q.correct_answer;
        const incorrect_answers = Q.incorrect_answers;
        const question = Q.correct_answer;
        return {
          category,
          type,
          difficulty,
          correct_answer,
          incorrect_answers,
          question,
        };
      });
      console.log(myQuestions);
      console.log(quizQuestions);
      // setQuestions(myQuestions);
    },
    [loading]
  );
  // console.log(quizQuestions);
  const [questionNumber, setquestionNumber] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    TIME_PER_QUESTION * quizQuestions.length
  );
  const [answers, setAnswers] = useState([]);
  const [isComplete, setComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let answerArray = [];
    quizQuestions[questionNumber].incorrect_answers.forEach((answer) => {
      if (Math.round(Math.random())) {
        answerArray.push(answer);
      } else {
        answerArray.unshift(answer);
      }
    });
    setAnswers([
      ...[quizQuestions[questionNumber].correct_answer],
      ...answerArray,
    ]);
  }, [questionNumber]);

  const timer = setTimeout(() => {
    if (timeLeft <= 0) {
      clearTimeout(timer);
      setComplete(true);
    } else {
      setTimeLeft(timeLeft - 1);
    }
  }, [1000]);

  const handleClick = (event) => {
    setActiveQuestion(event.target.id);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    if (activeQuestion !== 0) {
      const answerIndex = parseInt(activeQuestion.replace(/[^0-9]/g, ""));
      if (
        answers[answerIndex] === quizQuestions[questionNumber].correct_answer
      ) {
        setCorrectAnswers(correctAnswers + 1);
      }

      if (questionNumber < quizQuestions.length - 1) {
        setquestionNumber(questionNumber + 1);
      } else {
        const totalQuestions = quizQuestions.length;
        const totalScore =
          (correctAnswers / totalQuestions) *
          (timer / totalQuestions) *
          TIME_PER_QUESTION;
        setScore(Math.round(totalScore));
        setComplete(true);
      }
    }
  };

  if (isComplete) {
    return (
      <QuizResult
        correctAnswers={correctAnswers}
        quizLength={quizQuestions.length}
        Result={score}
      />
    );
  } else {
    return (
      <div className="container shadow-xl my-4 mx-auto border-2 p-4 bg-gray-100  rounded-xl">
        <img
          className="w-20 mx-auto rounded-xl m-2"
          src={logo}
          alt="inquizer logo"
        />{" "}
        <h1>
          <span>
            <i className="fas fa-check-double text-green-700"></i>
          </span>{" "}
          Correct answers:{" "}
          <span className="text-green-600 font-mono font-bold">
            {correctAnswers}
          </span>
        </h1>
        <hr />
        <h3>
          {" "}
          <span>
            <i className="fas fa-hourglass-half text-red-700"></i>
          </span>{" "}
          Time left {timeLeft}
        </h3>
        <hr />
        <h2>
          {" "}
          <i className="fas fa-question-circle text-blue-900"></i> Question
        </h2>
        <p className="text-blue-600 font-bold text-2xl m-2 p-2 h-20">
          {" "}
          {quizQuestions[questionNumber].question}
        </p>
        <br />
        <ListGroup as="ul" className=" text-2xl">
          {answers.map((answer, index) =>
            `answer-${index}` === activeQuestion ? (
              <ListGroup.Item
                className="list-group-item-primary rounded-b-2xl"
                key={index}
                action
                onClick={handleClick}
                active
                id={`answer-${index}`}
              >
                <i className="fas fa-angle-double-right text-yellow-400"></i>{" "}
                {answer}
              </ListGroup.Item>
            ) : (
              <ListGroup.Item
                className="list-group-item-light"
                key={index}
                action
                onClick={handleClick}
                id={`answer-${index}`}
              >
                {answer}
              </ListGroup.Item>
            )
          )}
        </ListGroup>
        <br />
        <hr />
        <div className="d-grid gap-2">
          <button
            className="bg-green-900 text-green-100 rounded-full text-2xl py-2"
            onClick={handleSubmit}
          >
            <i className="fas fa-forward  text-yellow-200"></i>{" "}
            <span className="font-bold text-white"> Submit</span>
          </button>
        </div>
        <br />
        <ProgressBar now={(questionNumber * 100) / quizQuestions.length} />
      </div>
    );
  }
};

export default Quiz;