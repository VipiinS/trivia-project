import React from "react";

export default function Question(){


    return(
        <div className="ques-container">
            <h1 className="question">This is a question </h1>
            <div className="ans-btn-container">
            <button className="btn ans-btn-selected btn-selected">option</button>
            <button className="btn ans-btn-correct btn-selected">option</button>
            <button className="btn btn-dimmed btn-selected">option</button>
            <button className="btn ans-btn-incorrect xbtn-selected">option</button>
            </div>
            
        </div>
    )
}