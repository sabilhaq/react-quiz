import React, { useState } from 'react';
// import { fetchQuizQuestions } from './API';
// Components
import QuestionCard from './components/QuestionsCard';
// Types
import { QuestionState, Difficulty } from './API';
//Styles
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 3;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    // const newQuestions = await fetchQuizQuestions(
    //   TOTAL_QUESTIONS,
    //   Difficulty.EASY
    // );

    const newQuestions = [
      {
        answers: [
          'Ushul As-Sunnah',
          'Al-Wajibat',
          'Al-Ushul As-Sittah',
          `Al-Qowa'idul Arba'`,
        ],
        correct_answer: 'Al-Wajibat',
        incorrect_answers: [
          'Ushul As-Sunnah',
          'Al-Ushul As-Sittah',
          `Al-Qowa'idul Arba'`,
        ],
        question: `Matan pertama yang kita pelajari di Ta'shil Ilmu Rasyad?`,
        category: 'categ',
        difficulty: 'noobs',
        type: 'multiple',
      },
      {
        answers: [
          'Al-Iman bi Ath-Thoghut',
          'Al-Ikhlash',
          'Al-Yaqin',
          'Al-Mahabbah',
        ],
        correct_answer: 'Al-Iman bi Ath-Thoghut',
        incorrect_answers: [
          'Al-Ikhlash',
          'Al-Yaqin',
          'Al-Mahabbah',
        ],
        question: 'Mana yang BUKAN termasuk syarat Laa Ilaaha Ilallaah?',
        category: 'categ',
        difficulty: 'noobs',
        type: 'multiple',
      },
      {
        answers: [
          'Ya',
          'Tidak',
        ],
        correct_answer: 'Tidak',
        incorrect_answers: [
          'Ya',
        ],
        question: 'Apakah pembatal keislaman dibatasi hanya berjumlah 10?',
        category: 'categ',
        difficulty: 'noobs',
        type: 'multiple',
      },
    ]
    console.log('nquess', questions);
    

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      console.log('nquess', questions);

      // Users answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }

  };

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>KUIS TA'SHIL ILMU</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Mulai
          </button>
        ) : null}
        {!gameOver ? <p className="score">Nilai: {score}</p> : null}
        {loading && <p>Loading Question ...</p>}
        {!loading && !gameOver && (
          <QuestionCard 
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
        />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Pertanyaan Selanjutnya
          </button>
        ) : null}  
      </Wrapper>
    </>
  ); 
}

export default App;
