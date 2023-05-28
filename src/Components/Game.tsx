import { QuestionsType } from "../App";

type PropsType = {
  questions: Array<QuestionsType>
  question: QuestionsType
  step: number
  onClickVariant: (index: number)=> void
}

export const Game: React.FC<PropsType> = ({ step, questions,question, onClickVariant }) => {
  
  const percentage = Math.round((step / questions.length) * 100);
 
  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((item, index) => (
          <li key={index} onClick={()=> {onClickVariant(index)}}>{item}</li>
        ))}
      </ul>
    </>
  );
}

