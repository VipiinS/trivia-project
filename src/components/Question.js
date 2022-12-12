import React from "react";

export default function Question(props){

    const ansElements = props.options.map((option,index)=>{
        return(
        <button 
        key={index} 
        className={`btn
            ${props.selectedAnswer === option ? "ans-btn-selected":""} // when an option is selected

        
        
        `}
        onClick={() => { props.updateAnswer(option, props.question) } }
        >
            {option}
        </button>
        )
    })


    const quesElement = <h1 className="question">{props.question}</h1>
    return(
        <div className="question-container">
            {quesElement}
            <div className="ans-btn-container">
                {ansElements}
            </div>
        </div>

    )
}