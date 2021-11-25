import React, { useEffect, useState } from "react";
import { Button, ListGroup, ProgressBar } from "react-bootstrap";
const quizQuestions = [
    {
        category: "Entertainment: Video Games",
        type: "multiple",
        difficulty: "medium",
        question: "Which company did Bethesda purchase the Fallout Series from?",
        correct_answer: "Interplay Entertainment ",
        incorrect_answers: [
            "Capcom",
            "Blizzard Entertainment",
            "Nintendo"
        ]
    },
    {
        category: "History",
        type: "multiple",
        difficulty: "hard",
        question: "What was the code name for the Allied invasion of Southern France on August 15th, 1944?",
        correct_answer: "Operation Dragoon",
        incorrect_answers: [
            "Operation Overlord",
            "Operation Market Garden",
            "Operation Torch"
        ]
    },
    {
        category: "General Knowledge",
        type: "multiple",
        difficulty: "easy",
        question: "How tall is the Burj Khalifa?",
        correct_answer: "2,722 ft",
        incorrect_answers: [
            "2,717 ft",
            "2,546 ft",
            "3,024 ft"
        ]
    }
]



const Quiz = ({ _id, user_id }) => {

    const [questionNumber, setquestionNumber] = useState(0)
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [answers, setAnswers] = useState([])

    const [isComplete, setComplete] = useState(false)

    useEffect(() => {
        let answerArray = []
        quizQuestions[questionNumber].incorrect_answers.forEach(answer => {
            if (Math.round(Math.random())) {
                answerArray.push(answer)
            } else {
                answerArray.unshift(answer)
            }
        })
        setAnswers([...[quizQuestions[questionNumber].correct_answer], ...answerArray])
    }
        , [questionNumber])

    const handleClick = (event) => {
        setActiveQuestion(event.target.id)
        console.log(event.target.value)
    }

    const handleSubmit = (event) => {
        if (activeQuestion !== 0) {
            const answerIndex = parseInt(activeQuestion.replace(/[^0-9]/g, ''));
            if (answers[answerIndex] === quizQuestions[questionNumber].correct_answer
            ) {
                setCorrectAnswers(correctAnswers + 1)
            }

            if (questionNumber < quizQuestions.length - 1) {

                setquestionNumber(questionNumber + 1)

            } else { setComplete(true) }
        }
    }

    if (isComplete) { return <p>{correctAnswers} out of {quizQuestions.length}</p> } else {
        return <>
            <h1>Correct answers: {correctAnswers}</h1>
            <h2>Question</h2>
            <p>{quizQuestions[questionNumber].question}</p>

            <ListGroup as="ul">

                {answers.map((answer, index) => `answer-${index}` === activeQuestion ?
                    <ListGroup.Item key={index} action onClick={handleClick} active id={`answer-${index}`}>{answer}</ListGroup.Item >
                    :
                    <ListGroup.Item key={index} action onClick={handleClick} id={`answer-${index}`}>{answer}</ListGroup.Item>)
                }

            </ListGroup>
            <br />
            <hr />
            <div className="d-grid gap-2">
                <Button variant="primary center" size="lg" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>

            <br />
            <ProgressBar now={((questionNumber) * 100) / quizQuestions.length} />
        </>
    }
}

export default Quiz;
