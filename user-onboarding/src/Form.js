import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import axios from "axios";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().required("Must include an email"),
    password: yup.string().required("Password is required"),
    terms: yup.boolean().oneOf([true], "Please agree to Terms of Use")
});


export default function () {

    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
    });

    //State for errors
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    /*check to see if form vaule state update is valid per the schema.  Allows to enable/disable button*/
    
    /*New state for post request*/
    const [post, setPost] = useState([]);
    
    useEffect(() => {
    /* Pass entire state into entire schema.  No reach needed.  Make sure all valid before user can submit*/
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
        })
    },[formState])
    
    const validateChange = e => {
        //reach allows to reach into schema and test only one part
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({
                ...errors, [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrors({
                ...errors, [e.target.name] : err.errors[0]
            })
        })
    };

    const formSubmit = e => {
        e.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
        .then( res => {
            setPost(res.data);

            setFormState({
                name: "",
                email: "",
                password: "",
                terms: "",
            });
        })
        .catch( err => {
            console.log(err.res);
        })
    };

    const inputChange = e => {
      e.persist();
      const newFormData = {
          ...formState, [e.target.name] : e.target.type === 
          "checkbox" ? e.target.checked : e.target.value
      };
      validateChange(e);
      setFormState(newFormData)
    };

    return(
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input
                id="name"
                type="text"
                name="name"
                placeholder="name"
                value={formState.name}
                onChange={inputChange}
                />
                {errors.name.length > 0 ? <p>
                {errors.name}</p> : null}
            </label><br />
            <label htmlFor="email">
                Email
                <input
                id='email'
                type="text"
                name="email"
                placeholder="email"
                value={formState.email}
                onChange={inputChange}
                />
                {errors.email.length > 0 ? <p> {errors.email}</p> : null}
            </label><br />
            <label htmlFor="password">
                Password
                <input
                id="password"
                type="text"
                name="password"
                placeholder="password"
                value={formState.password}
                onChange={inputChange}
                />
                {errors.password.length > 0 ? <p> {errors.password}</p> : null}
            </label><br />
            <label htmlFor="terms" className="terms">
                Terms and Conditions
                <input 
                type="checkbox" 
                name="terms"  
                checked={formState.terms}
                onChange={inputChange}
                />
            </label><br />
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button disabled={buttonDisabled}>Submit</button>
        </form>

    )
}