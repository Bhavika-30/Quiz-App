import React, { useState } from 'react';

// --- Main App Component ---
// This is the central hub of our application.
export default function App() {
  // --- State Management ---
  // We use React's `useState` hook to manage the state of our quiz.

  // `questions`: An array of question objects. This is our quiz data.
  // In a real-world app, you might fetch this from an API.
  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        { answerText: 'New York', isCorrect: false },
        { answerText: 'London', isCorrect: false },
        { answerText: 'Paris', isCorrect: true },
        { answerText: 'Dublin', isCorrect: false },
      ],
    },
    {
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        { answerText: 'Jeff Bezos', isCorrect: false },
        { answerText: 'Elon Musk', isCorrect: true },
        { answerText: 'Bill Gates', isCorrect: false },
        { answerText: 'Tony Stark', isCorrect: false },
      ],
    },
    {
      questionText: 'The iPhone was created by which company?',
      answerOptions: [
        { answerText: 'Apple', isCorrect: true },
        { answerText: 'Intel', isCorrect: false },
        { answerText: 'Amazon', isCorrect: false },
        { answerText: 'Microsoft', isCorrect: false },
      ],
    },
    {
      questionText: 'How many Harry Potter books are there?',
      answerOptions: [
        { answerText: '1', isCorrect: false },
        { answerText: '4', isCorrect: false },
        { answerText: '6', isCorrect: false },
        { answerText: '7', isCorrect: true },
      ],
    },
  ];

  // `currentQuestion`: The index of the question the user is currently on.
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // `showScore`: A boolean to determine if we should show the final score or the questions.
  const [showScore, setShowScore] = useState(false);
  // `score`: The user's current score.
  const [score, setScore] = useState(0);

  // --- Event Handlers ---

  /**
   * This function is called when the user clicks an answer button.
   * @param {boolean} isCorrect - Whether the chosen answer was correct.
   */
  const handleAnswerOptionClick = (isCorrect) => {
    // If the answer is correct, increment the score.
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to the next question.
    const nextQuestion = currentQuestion + 1;
    // If there are more questions, update the state to the next question.
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // If it was the last question, show the score.
      setShowScore(true);
    }
  };

  /**
   * This function resets the quiz to its initial state.
   */
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };


  // --- JSX Rendering ---
  // This is what gets rendered to the screen.
  return (
    <>
      {/* --- Global Styles --- */}
      {/* We are putting CSS styles directly here for simplicity. */}
      {/* In a larger app, you would put this in a separate .css file. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        body {
          background-color: #f0f2f5;
          font-family: 'Poppins', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          margin: 0;
        }

        .app {
          background-color: #ffffff;
          width: 90%;
          max-width: 550px;
          min-height: 250px;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .score-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        
        .score-section .score-text {
            margin-bottom: 20px;
        }

        .question-section {
          width: 100%;
          position: relative;
        }

        .question-count {
          margin-bottom: 20px;
          font-size: 20px;
          font-weight: 600;
          color: #555;
        }

        .question-count span {
          font-size: 28px;
          color: #2d6cdf;
        }

        .question-text {
          margin-bottom: 20px;
          font-size: 22px;
          color: #222;
          font-weight: 600;
        }

        .answer-section {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 15px;
        }

        button {
          width: 100%;
          font-size: 18px;
          font-family: 'Poppins', sans-serif;
          color: #ffffff;
          background-color: #2d6cdf;
          border-radius: 12px;
          display: flex;
          padding: 15px;
          justify-content: flex-start;
          align-items: center;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #1e4b9c;
        }
        
        button:focus {
            outline: none;
        }

        .restart-button {
            background-color: #00b894;
        }

        .restart-button:hover {
            background-color: #00a080;
        }
      `}</style>

      <div className='app'>
        {/* --- Conditional Rendering --- */}
        {/* We use a ternary operator to decide what to show: the score or the questions. */}
        {showScore ? (
          // If `showScore` is true, display the final score and a restart button.
          <div className='score-section'>
            <div className='score-text'>You scored {score} out of {questions.length}</div>
            <button onClick={handleRestartQuiz} className='restart-button'>Restart Quiz</button>
          </div>
        ) : (
          // If `showScore` is false, display the current question and answers.
          <>
            <div className='question-section'>
              <div className='question-count'>
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className='question-text'>{questions[currentQuestion].questionText}</div>
            </div>
            <div className='answer-section'>
              {/* Map through the answer options for the current question and create a button for each. */}
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
