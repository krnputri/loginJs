import React from 'react'
import { Link } from 'react-router-dom'
import Recaptcha from 'react-recaptcha'
import { Formik } from "formik";
import {useState, useEffect} from "react"
import * as EmailValidator from "email-validator"; // used when validating with a self-implemented approach
import * as Yup from "yup"; // used when validating with a pre-built solution
import ValidatedLoginForm from "./ValidatedLoginForm";
import home from "./home"

import '../../App.css'

export default function SignInPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [timer, setTimer] = useState(30)
    const [isFailed, setIsFailed] = useState(0)

    useEffect(()=>{
        if(timer > 0 && JSON.parse(localStorage.getItem('status'))==1) {
            setTimeout(() => setTimer(timer-1), 1000)
        }
        if(timer <= 0){
            localStorage.setItem('counter', JSON.stringify(0));
            localStorage.setItem('status', JSON.stringify(0));
        }
    }, [timer])

    function cekCaptcha(){
        console.log('Captcha value:');
    }
    function updateEmail(e){
        setEmail(e.target.value)
    }
    function updatePassword(e){
        setPassword(e.target.value)
    }
    function cekValidasi(){
        if(JSON.parse(localStorage.getItem('counter')>=3)){
            localStorage.setItem('counter', JSON.stringify(0));
        }
        if(email != 'admin' || password != 'admin'){
            console.log("wrong email and pw");
            const items = JSON.parse(localStorage.getItem('counter'));
            localStorage.setItem('counter', JSON.stringify(items+1));
        }
        if(JSON.parse(localStorage.getItem('counter'))==3){
            localStorage.setItem('status', JSON.stringify(1));
        }else {
            localStorage.setItem('status', JSON.stringify(0));
        }
    }
    return (
        <div className="text-center m-5-auto">
            <h2>Let's SignIn</h2>
            {/* <ValidatedLoginForm /> */}
            <form>
                <p>
                    <label>Email</label><br/>
                    <input type="text" id='email' name="email" onChange={updateEmail} required />
                </p>
                <p>
                    <label>Password</label>
                    {/* <Link><label className="right-label">Forget password?</label></Link>  */}
                    <br/>
                    <input type="password" name="password" onChange={updatePassword} required  />
                </p>
                <p>
                    <button id="sub_btn" type="submit" onClick={cekValidasi}>Login</button>
                </p>
            </form>
            <div id="time"><p>Silahkan login kembali dalam {timer} </p></div>
            <div class="captcha">
                <Recaptcha
                    sitekey="6Ldw928iAAAAAMl3NbTiGpprK1YAc3N82oTFmlXn"
                    render="explicit"
                    onloadCallback={cekCaptcha}
                    onChange={cekCaptcha}
                />
            </div>
            
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
