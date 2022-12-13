import './App.css';
import React from 'react';
import Question from './components/Question'
import Confetti from 'react-confetti'

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

  const[reset,changeReset] = React.useState(true);
  const { width, height} = {width:"400px", height: "1000px"}


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
  },[reset])


  function updateAnswer(option,currQuestion){

    setQuesAndAnswers(quesAnswers.map((quesObj)=>{
      //map in the array to find the question selected
        if(quesObj.question === currQuestion){
          //if the selected option is again slecetd,then it is unselecetd
          if(quesObj.selectedAnswer === option)
            return {...quesObj, selectedAnswer : ""}
          else
          //else the choosen option is selected
            return {...quesObj, selectedAnswer : option}
        }
        //other questions are returned
        else
          return quesObj
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

  function checkAns(){
    const notAllAnswered = quesAnswers.some(
    (obj)=>{
      return obj.selectedAnswer === ""
    }
    )
    console.log(notAllAnswered)
    setShowWarning(notAllAnswered)
    if (!notAllAnswered && !showResult) {
      quesAnswers.forEach((questionObject) => {
        // compare selected answer & correct answer
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          setNumCorrectAnswers(
            (prevNumCorrectAnswers) => prevNumCorrectAnswers + 1
          );
        }
      });

      setShowResult(true);
    }
  }

  function playAgain(){
    setNumCorrectAnswers(0);
    setShowResult(false); 
    changeReset(prev => !prev );
  }

  return (
    <div>
      <div className='questions-container'>
        {questionElements}
      </div>
      <div className='result-container'>
        {showWarning && <p className='result-message result-message-error'> Attend all questions </p>}
        {!showResult && <button className="check-btn" onClick={checkAns}>Check Answers</button>}
        {showResult && 
        <div className='result-container'>

          {/* confetti drop when scored above 5 */}
          {showResult && numCorrectAnswers >= 3 && <Confetti
          className='confetti'
          width={width}
          height={height}
          />}
          <p>You have Scored {numCorrectAnswers} out of 5.</p>
          <button className="check-btn" onClick={playAgain}>Continue</button>
        </div>
        }
        
      </div>
    </div>
  );
}

export default App;
