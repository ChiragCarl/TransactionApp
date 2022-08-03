import React, { useState,useEffect } from 'react'

import axios from "axios";

import { useHistory } from 'react-router-dom';


export default function AddRecord() {
    
    //create the local variables which can be used to manage the input from the users
    const [description,setDescription]=useState("");
    const[transactionTye,setTransactionType]=useState("");
    const[debit,setDebit]=useState("");
    const[credit,setCredit]=useState("");
    const[amount,setAmount]=useState("");
    const[error,setError]=useState("");
    const[runningBalance,setRunningBalance]=useState("");
    
    const history = useHistory();

    //here i am going to get the last running balance of the app
    const [transaction, setTransaction] = useState([]);
    
    useEffect((e) => {
        getTransaction();
    }, []);
   
    const getTransaction = async () => {
       //const response = await axios.get('http://localhost:5000/insertTransaction');
        //setTransaction(response.data);
        
    }
    
    transaction.map((data,index)=>(
        setRunningBalance(data.RunningBalance)      
    ));
    
    
    //this function is used to pass the data to the mysql through server folder
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const current = new Date();
        const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;

        if(!description || !amount){
            setError("Must need to fill the value ");
        }else{
            console.log(transactionTye);

            if(transactionTye==="Credit"){
                setDebit("0");
                 //here i have to use the concept of condition  this is the smaller ppart of the API
                 await axios.post('http://localhost:5000/insertTransaction',{
                    transactionDate:date,
                    Description: description,
                    Credit:amount,
                    Debit:debit,
                    RunningBalance:amount
                });
            }else{
                setCredit("0");
                await axios.post('http://localhost:5000/insertTransaction',{
                    Description: description,
                    Credit:credit,
                    Debit:amount,
                    RunningBalance:amount
                });
            }
            
           
        setDescription("");
        setAmount("");
        }

    }

  return (
    <div className='container'>
        <div className='row'>


            <div className='col-md-12'>
                <h1>{runningBalance}</h1>
                <div className='form-group'>
                    <label>Select Transaction Type</label>
                    <select className='form-control' onChange={(e)=>setTransactionType(e.target.value)}>
                        <option value="Credit">Credit</option>
                        <option value="Dedit">Dedit</option> 
                    </select>
                   <span style={{color:"red"}}> {amount.length===0?"must need to fill the Amount ":""}</span>
                </div>
                
                 <div className='form-group'>
                    <label>Enter Amount</label>
                    <input type="Number"
                        placeholder='enter Amount'
                        className='form-control'
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}    
                    />
                   <span style={{color:"red"}}> {amount.length===0?"must need to fill the Amount ":""}</span>
                </div>

                <div className='form-group'>
                    <label>Enter Description</label>
                    <input type="text"
                        placeholder='enter title'
                        className='form-control'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}    
                />
                <span style={{color:"red"}}> {description.length===0?"must need to Enter the Description ":""}</span>


                </div>
               
                
                <button className='btn btn-primary my-3' onClick={handleSubmit}>Submit</button>
                <h1> {error}</h1>
            </div>

        </div>
    </div>
  )
}
