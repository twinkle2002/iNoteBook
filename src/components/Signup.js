import React, { useState }  from "react";
import { useHistory } from 'react-router-dom'

const Signup = (props) => {

    const [credential, setCredential] = useState({name: "", email: "", password: "", cpassword: ""})
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credential;
        
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          
          method: "POST",
    
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("Account Created Successfully", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
      };
    
      const onChange = (e) => {
        setCredential({...credential, [e.target.name]: e.target.value})
    }



  return (
    <div className="container mt-2">
      <h2 className="my-2">Create an Account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="name"
            onChange={onChange}
          />
          </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Comfirm Password
          </label>
          <input
            type="cpassword"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onChange}
            required
            minLength={5}
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
