import React from 'react';
import '../../styles/QuestionsPage.css'

function QuestionPart({setValues, question, index, setError}) {
    const handleRadioChange = (index, value) => {
        setValues(prevValues => {
            const newValues = [...prevValues];
            newValues[index] = value;
            setError('');
            return newValues;
        });
    }

    return (
        <div className='questionPart' key={index}>
            <h1 className='mainQuestion'>{question.quest}?</h1>
            <div className='radioOptions'>
                <div className='singleRadio'>
                <input 
                    type="radio" 
                    id="yes" 
                    name={question.name} 
                    value="1" 
                    onChange={() => handleRadioChange(index, 1)} />
                <label for="yes">Yes</label>
                </div>
                <div className='singleRadio'>
                <input 
                    type="radio" 
                    id="no" 
                    name={question.name} 
                    value="0" 
                    onChange={() => handleRadioChange(index, 0)} />
                <label for="no">No</label>
                </div>
            </div>
        </div> 
    )
}

export default QuestionPart