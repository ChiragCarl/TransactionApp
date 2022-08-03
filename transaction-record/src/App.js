
import './App.css';
import AddRecord from './Component/AddRecord';
import ViewTransaction from './Component/ViewTransaction';


function App() {
  return (
    <div className="App">
      <div className='container-fluid my-3'>
          <div className='row'>
                <div className='col-md-12 mainHeading'>
                  <h1>Welcome to the Transaction App </h1>
                </div>
          </div>     
      </div>
      <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
                <ViewTransaction/>
            </div>
          </div>
      </div>
      
     
    </div>
  );
}

export default App;
