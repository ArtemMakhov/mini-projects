import { useState } from 'react';
import './index.scss';

import { Game } from './Components/Game';
import { Result } from './Components/Result';

export type QuestionsType = {
  title: string
  variants: Array<string>
  correct: number
 }

const questions:Array<QuestionsType> = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];


function App() {
  const [step, setStep] = useState(0);
  const [correct, setCorrect] = useState(0);

  const question = questions[step];
 

  const onClickVariant = (index: number) => {
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  }

  return (
    <div className="App">
      {step !== questions.length
        ? <Game step={step} questions={questions} question={question} onClickVariant={onClickVariant} />
        : <Result correct={correct}questions={questions}/>}
    </div>
  );
}

export default App;
