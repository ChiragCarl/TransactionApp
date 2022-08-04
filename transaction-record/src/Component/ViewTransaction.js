import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useHistory } from 'react-router-dom';


export default function ViewTransaction() {
   
        //create the local variables which can be used to manage the input from the users
        const [description,setDescription]=useState("");
        const[transactionTye,setTransactionType]=useState("");
        const[debit,setDebit]=useState("");
        const[credit,setCredit]=useState("");
        const[amount,setAmount]=useState("");
        const[error,setError]=useState("");
        const[runningBalance,setRunningBalance]=useState(0);
        
        const history = useHistory();

    
    //here is the json array which is used to get the whole transaction from the array
    const [transaction, setTransaction] = useState([]);

    //i have used the useEffect to call the api which is used to fetch the data from the api and map over
    //front-end
    useEffect(() => {
        //here i am calling the method in which i have done the task of fetching the data from the API 
        getTransaction();
    }, []);
    
    //getTransaction Function with the source code to get the data from the api with the async 
    //then the API will generate the response in the json format if there is no errore 
    const getTransaction = async () => {
        //here i have used the code to get the data from the API 
        const response = await axios.get('http://localhost:5000/insertTransaction');

       //after getting the reponse i need to data to the Transaction Array in State 
        setTransaction(response.data);
        
    }


    //this function is used to pass the data to the mysql through server folder
    const handleSubmit= async(e)=>{
        e.preventDefault();
        let newBalance=0;
        if(transaction.length!==0){
            newBalance=parseInt(transaction[transaction.length-1].RunningBalance);
            console.log(newBalance);    
        }
        
        const current = new Date();
        const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;

        if(!description || !amount){
            setError("Must need to fill the value ");
        }else{
            setError("");
            console.log(transactionTye);
            if(transactionTye==="Credit"){
                setDebit("0");
                newBalance=newBalance+parseInt(amount);
                setRunningBalance(newBalance);
                 //here i have to use the concept of condition  this is the smaller ppart of the API
                 const response=await axios.post('http://localhost:5000/insertTransaction',{
                    transactionDate:date,
                    Description: description,
                    Credit:amount,
                    Debit:debit,
                    RunningBalance:newBalance
                });

            }else{
                setCredit("0");
                newBalance=newBalance-parseInt(amount);
                //here i am going to check the balance must be in the postive format 
               
                if(newBalance<0){
                    setError("You didn't have Enough Balance ");
                }else{
                    setRunningBalance(newBalance);
                    await axios.post('http://localhost:5000/insertTransaction',{
                        Description: description,
                        Credit:credit,
                        Debit:amount,
                        RunningBalance:newBalance
                    });
                }
                
            }

        //clear the boxes after submiting the data
        setDescription("");
        setAmount("");
        getTransaction();

        }

    }

    const [myStyle,setMyStyle]=useState({
        backgroundColor:"white"
    });

    //this method is used to onblur event which is used to check the empty validation if the box 
    //is empty then for the alert the box border will looks like red as a error instruction 
    const handleOnBlur=()=>{
        if(description.length!==0){
            console.log("ok");
             setMyStyle({
                border:'1px solid grey'
            })
        }else{
            setMyStyle({
                border:'5px solid red'
            })
        }
       
    }

    

  return (
    <div className='container'>
        <div className='row'>
            <br/>
            <div className='col-md-12' style={{textAlign:"left"}}>
                     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                          Add New Transaction
                    </button>
            </div>
            
            <div className='col-md-12 tableSetting'>
                   
                
                    <h1>View All Transaction </h1>
                    <table className="table table-success table-striped">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Credit</th>
                                    <th>Debit</th>
                                    <th>Running Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...transaction].reverse().map((data,index)=>
                                        (<tr key={data.id}>
                                             <td>{data.createdAt}</td> 
                                             <td>{data.Description}</td>  
                                             <td>{data.Credit}</td>
                                             <td>{data.Debit}</td>
                                             <td>{data.RunningBalance}</td>
                                        </tr>
                                        )      
                                    )
                                }
                            </tbody>
                    </table>
            </div>
           
        
            { 
                /* here i need to set the code*/
            }


                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title" id="exampleModalLabel">Add New Record 
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                            </h1>
                        </div>
                    <div className="modal-body">
                            <div className='form-group'>
                                <label>Select Transaction Type</label>
                                <select className='form-control' onChange={(e)=>setTransactionType(e.target.value)}>
                                    <option>select</option>
                                    <option value="Credit">Credit</option>
                                    <option value="Dedit">Dedit</option> 
                                </select>
                            </div>
                            <div className='form-group'>
                                <label>Enter Amount</label>
                                <input type="Number"
                                    placeholder='enter Amount'
                                    className='form-control'
                                    value={amount}
                                    onChange={(e)=>setAmount(e.target.value)}    
                                />
                            </div>
                            <div className='form-group'>
                                <label>Enter Description</label>
                                <input type="text"
                                    placeholder='Enter Description'
                                    className='form-control'
                                    style={myStyle}
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}    
                                    onBlur={handleOnBlur}
                            />
                            </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button"  onClick={handleSubmit} className="btn btn-primary">Save changes</button>
                        <button type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <h1 style={{textAlign:"center"}}> {error}</h1>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    </div>
  )
}
