import React,{useState} from 'react';
import './GeneralUserDetails.css';
import {AiOutlineArrowRight} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function GeneralUserDetails() {
    const [userDetails, setUserDetails] = useState({
        age: '',
        income: ''
    });
    const [selectedGender, setSelectedGender] = useState('');
    const navigate = useNavigate();

    const handleGenderClick = (gender) => {
        setSelectedGender(gender);
    }
    console.log(selectedGender);

    function handleInputChange(e) {
        const {name, value} = e.target;
        setUserDetails((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };
    console.log(userDetails)

    async function submitExtraDetails(e) {
        if (userDetails.age == '' || userDetails.income == '' || selectedGender == '') {
            swal({
                title: "Enter Details!",
                text: "Seems like some details are missing!",
                button: "Ok",
            });
        } else {
            e.preventDefault();
            const response = await fetch(`http://localhost:8080/user/updateUser/${localStorage.getItem('email')}`,{
                method: 'PUT',
                headers: {
                    'Content-Type':'application/json',
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    'Authorization': `Bearer ${localStorage.getItem('token')}`     
                },
                body: JSON.stringify({"age": userDetails.age, "income": userDetails.income, "gender": selectedGender}),
            });  
            if (response.status === 200) {
                swal({
                    title: "Details Added Successfully!",
                    icon: "success",
                    button: "Ok",
                });
                navigate("/community");   
            }
        }
    }

    return (
    <>
        <div className='mainGeneralDetails'>
            <h1>Provide some extra details to get a personalized plan - </h1>
            <form>
                {/* Age Part */}
                <div className='ageTag'>
                <label>Age Range </label>
                    <select value={userDetails.age} onChange={handleInputChange} name="age" id="" required>
                        <option value=""></option>
                        <option value="6-12">6-12</option>
                        <option value="13-17">13-17</option>
                        <option value="18-30">18-30</option>
                        <option value="30-50">30-50</option>
                        <option value="50+">50+</option>
                    </select>
                </div>

                {/* Gender Part */}
                <div className='genderTag'>
                    <label>Gender</label>
                    <div className='genderButtons'>
                        <div className={`innerGenderButtons ${selectedGender === 'Female' ? 'genderSelected' : ''}`} onClick={() => handleGenderClick('Female')}>FEMALE</div>
                        <div className={`innerGenderButtons ${selectedGender === 'Male' ? 'genderSelected' : ''}`} onClick={() => handleGenderClick('Male')}>MALE</div>
                        <div className={`innerGenderButtons ${selectedGender === 'Others' ? 'genderSelected' : ''}`} onClick={() => handleGenderClick('Others')}>OTHERS</div>
                    </div>
                </div>

                {/* Income Part */}
                <div className='income'>
                    <label>Household Income</label>
                    <select onChange={handleInputChange} value={userDetails.income} name="income" id="">
                        <option value=""></option>
                        <option value="Less than ₹2,00,000">Less than ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                        <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                        <option value="₹10,00,000 - ₹20,00,000">₹10,00,000 - ₹20,00,000</option>
                        <option value="₹20,00,000 +">₹20,00,000 +</option>
                    </select>
                </div>
                <button onClick={submitExtraDetails} type='submit'>Go To Community<AiOutlineArrowRight/></button>
            </form>
        </div>
    </>
  )
}

export default GeneralUserDetails