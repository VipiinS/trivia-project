import './App.css';
import React from 'react';
import Question from './components/Question'
function App() {
  // fro initially getting from the API
  const [ques,setQues] = React.useState([])
  const [quesAnswers,setQuesAndAnswers] = React.useState([]);

  React.useEffect(()=>{
    const url = "https://opentdb.com/api.php?amount=5";
    fetch(url)
      .then(res =>res.json())
      .then(data => {
        setQues(data.results)//the results contains two objects response and results,results contains our required questions and answers

        //map the ques and ans into ques 
        setQuesAndAnswers(
          data.results.map(questionObj=>{
            return {
              question : questionObj.question,
              options : [questionObj.correct_answer,
                         questionObj.incorrect_answers],
              correctAnswer : questionObj.correct_answer,
              selectedAnswer : ""
            }
          })
        )
      }) 



  },[])

  return (
    <Question />
  );
}

export default App;
