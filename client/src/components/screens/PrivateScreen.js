import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
//import history from './history';
import { Link } from "react-router-dom";
import InputSpinner from 'react-bootstrap-input-spinner' ;


const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [oxygenData, setoxygenData] = useState("");
  const [syringesData, setsyringesData] = useState("");
  const [otherData, setotherData] = useState("");
  const [oxygen, setoxygen] = useState("");
  const [syringes, setsyringes] = useState("");
  const [otherRequiredItems, setother] = useState("");
  const[message,setmessage] = useState("");
  const[check,setcheck] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("authToken")){
      history.push("/login");
    }

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchPrivateDate();
  },);

  
  const previousDonation = async () => {
    
      const request = await axios.get("/api/private/previousdonation/" + localStorage.getItem("authToken"));
      setoxygenData(request.data.user.oxygen);
      setsyringesData(request.data.user.syringes);
      setotherData(request.data.user.otherRequiredItems);
      setcheck("True");
  };



  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  }


  const donateHandler = async (e) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

  
      await axios.post("/api/private/donate/" + localStorage.getItem("authToken"), { oxygen, syringes, otherRequiredItems },
        config);
        
        setmessage("Thank you for your donation!!!");
        history.push("/");
    
  };



  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>

      <div className="Container">
        <nav class="navbar navbar-expand-lg navbar-light " id="nav">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">Donation App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <Link to="#" aria-current="page" className="nav-link active">Home</Link>
                <Link to="#" className="nav-link">About Us</Link>
                <Link to="#" className="nav-link">Contact Us</Link>
              </div>
            </div>
            <form className="d-flex">
            <button class="btn btn-outline-success"  onClick={logoutHandler}>Logout</button>
            </form>
          </div>
        </nav>

        <br></br>
        <br></br>

        <div className="container text-center pt-4">
          <div className="row py-5 donationbox" >
            <div className="col-4 db1" >
              <h3>Donate Oxygen Cylinders</h3>
              <p>Donate oxygen cylinders for someone in need.It will only cost you INR 2000 for per cylinder.You can enter the amount of cylinders you want to donate below:</p>
              <div className="input"><InputSpinner type={'real'} min={0} step={1} onChange={num=>setoxygen(num)} variant={'primary'} size="sm"/></div>
            </div>
            <div className="col-4 db1">
              <h3>Donate Syringes</h3>
              <p>Donate syringes for someone in need.It will only cost you INR 500 for per syringe.You can enter the amount of syringes you want to donate below:</p>
              <div className="input"><InputSpinner type={'real'} min={0} step={1} onChange={num=>setsyringes(num)} variant={'primary'} size="sm"/></div>
            </div>
            <div className="col-4 db1">
              <h3>Donate Utility Packs</h3>
              <p>Donate our utility package which contains basic things like food, mask, hand sanitizer.It will only cost you INR 200 for per utility pack.You can enter the amount of utility you want to donate below:</p>
              <div className="input">
              <InputSpinner type={'real'}  min={0} step={1} onChange={num=>setother(num)} variant={'primary'} size="sm"/>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="donate_button">
            <button onClick={donateHandler} class="btn btn-primary" >Donate!!</button></div>
        </div>
        <br></br>
        <br></br>
        <div className="message" ><h2>{message}</h2></div>
        <br></br>
        <br></br>
        <br></br>

        <div className="container-fluid" >
          <div className="donation-button">
            <button onClick={previousDonation} type="button" class="btn btn-primary" >Check your donation history</button>
          </div>
          <br></br>
          <br></br>
          {check && <div className="history">
            <h3>Your Pervious Donations</h3>
            <table className="table">
              <thead className="thread-light">
                <tr><th>Number of oxygen cylinders donated</th>
                  <th>{oxygenData}</th></tr>
                <tr><th>Number of syringes donated</th>
                  <th>{syringesData}</th></tr>
                <tr><th>Number of utility packages donated</th>
                  <th>{otherData}</th></tr>
              </thead>
            </table>
          </div>}
          
        </div>
      </div>
    </>
  );
};

export default PrivateScreen;
