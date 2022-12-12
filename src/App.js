import './App.css';
import React from 'react';
import Question from './components/Question'

function App() {

  // for initially getting from the API
  const [ques,setQues] = React.useState([])

  //to set the questions and answers
  const [quesAnswers,setQuesAndAnswers] = React.useState([]);

  // to count the number of correct answers
  const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0);

  //will show error when clicking check answer and not all answers are attended
  const [showWarning,setShowWarning] = React.useState(false);

  // will show result when true
  const [showResult, setShowResult] = React.useState(false);


  React.useEffect(()=>{
    const url = "https://opentdb.com/api.php?amount=5";
    fetch(url)
      .then(res =>res.json())
      .then(data => {
        setQues(data.results)//the results contains two objects response and results,results contains our required questions and answers
        console.log(data.results)
        //map the ques and ans into ques 
        setQuesAndAnswers(
          data.results.map(questionObj=>{
            return {
              question : questionObj.question,
              options : [...questionObj.incorrect_answers,
                          questionObj.correct_answer],
              correctAnswer : questionObj.correct_answer,
              selectedAnswer : ""
            }
          })
        )
      }) 
  },[])


  function updateAnswer(option,currQuestion){
    setQuesAndAnswers(quesAnswers.map((quesObj)=>{
      return quesObj.question === currQuestion ?
              {...quesObj, selectedAnswer : option}:
              quesObj;
    }))
  }
  

  // map the received info into JSX elements
  const questionElements = quesAnswers.map((questionObj,index)=>(
      <Question 
      key={index}
      question= {questionObj.question}
      options = {questionObj.options}
      correctAnswer = {questionObj.correctAnswer}
      selectedAnswer = {questionObj.selectedAnswer}
      updateAnswer = {updateAnswer}
      showResult= {showResult}
    />
    )

  )

  return (
    <div>
      <div className='questions-container'>
        {questionElements}
      </div>
      <div className='result-container'>
        <button className="check-btn">Check Answers</button>
      </div>

    </div>
  );
}

export default App;
