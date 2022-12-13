import React from "react";
import {decode} from 'html-entities'; // to decode the html entities

export default function Question(props){

    const ansElements = props.options.map((option,index)=>{
        return(
        <button 
        key={index} 
        className={`btn
            ${props.selectedAnswer === option ? "ans-btn-selected":""} // when an option is selected
            ${props.showResult && (option === props.correctAnswer) ? "ans-btn-correct" : ""}
            ${props.showResult && (props.selectedAnswer === option) && (option !== props.correctAnswer) ? "ans-btn-incorrect" : ""}
            ${props.showResult && (props.selectedAnswer !== option)  ? "ans-btn-dimmed" : ""}
        `}
        onClick={() => { props.updateAnswer(option, props.question) } }
        >
            {decode(option)}
        </button>
        )
    })


    const quesElement = <h1 className="question">{decode(props.question)}</h1>
    return(
        <div className="question-container">
            {quesElement}
            <div className="ans-btn-container">
                {ansElements}
            </div>
        </div>
    )
}