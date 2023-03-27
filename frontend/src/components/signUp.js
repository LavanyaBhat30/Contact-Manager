import { useState } from "react"
import "../styles/signup.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import dots from "../images/dots.png"
// import Circle from "./circles";
import ecllipse from "../images/ecllipse.png"
import ecllipse1 from "../images/ecllipse1.png"
import {Icon} from "react-icons-kit"
import {eye} from "react-icons-kit/feather/eye"
import {eyeOff} from "react-icons-kit/feather/eyeOff"


const Signup = ()=>{
    const navigate = useNavigate();
    const [email,setMail] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("")
    const [icon,setIcon] = useState(eyeOff)
    const [type,setType] = useState("password")
    const [confirmicon,setConfirmIcon] = useState(eyeOff)
    const [confirmtype,setConfirmType] = useState("password")
    const [error,errorMess] = useState({email:{isValid:true,message:""},password:{isValid:true,message:""}})
    const handleToggle = ()=>{
        if(type==="password"){
            setIcon(eye);
            setType("text")
        }else{
            setIcon(eyeOff);
            setType("password")
        }
    }
    const confirmhandleToggle = ()=>{
        console.log(confirmtype)
        // console.log(confirmicon)
        if(type==="password"){
            setConfirmIcon(eye);
            setConfirmType("text")
        }else{
            setConfirmIcon(eyeOff);
            setConfirmType("password")
        }
    }
    const checkErrors = (type) => {
        switch(type){

            case "email":
                console.log(email)
                var regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                console.log(!email.match(regex))
                if (!email.match(regex)){
                    errorMess({...error, email:{isValid: false,message: "Please Enter Valid Mail Id"}})
                }else{
                    errorMess({...error, email:{isValid: true,message: ""}})
                }
                break;
            case "password":
                if(password.length<6 || password.length>15){
                    errorMess({...error, password:{isValid: false,message: "Please Enter Valid password"}})
                }else{
                    errorMess({...error, password:{isValid: true,message: ""}})
                }
                break;

                default: return error
        }
    }
    async function handleSubmit(e){
        e.preventDefault();
        if((email!=="" && password!=="" && confirm!=="")){
            if(confirm===password){
                let flag =1
                let data = new FormData();
                data.email = email;
                data.password = password;
                data.confirmPassword = confirm
                console.log("data is " + data)
                await axios({
                    method:"POST",
                    url:"http://localhost:8000/api/v1/register",
                    data:{...data},
                    // redirect:"follow"
                })
                .then(text => {
                    flag=1
                console.log(text);
                })
            .catch(err => {
                flag=0;
                if(err.message==="Request failed with status code 400"){
                    alert("User already exists")
                }
                console.log(err.message);
            })
                if(flag===1){
                alert("Details were successfully added") 
                navigate("/",{replace:true})   
                }
            }
            else{
                alert("please enter correct password")
            }
        }
        else{
            alert("please enter all the fields")
        }
        
    }
    

    return (
        <>
        <div className="form" id="forms">
            <div className="signupBox">
                <div className="signUp">
                <img src={dots} className="DotsImg1" alt = "dots"/>
                <img src={dots} className="DotsImg2" alt = "dots"/>
                
                    <h1 className="Logo">Logo</h1>
            <h3 className="text1">Create New Account</h3>
            <img src={ecllipse} className="Ecllipseimg1" alt = "dots"/>
                <img src={ecllipse1} className="Ecllipseimg2" alt = "dots"/>
            <input type = "email" placeholder="Mail Id" className="mail" onChange={(e)=>{setMail(e.target.value)}} value={email}  onBlur={(event)=> {checkErrors("email")}}/><br/>
            {!error.email.isValid ? <div className="errorBox" style={{marginLeft:"100px",color:"orangered"}}>Please enter valid mail id</div>:<div className="errorBox"></div>}
            <div className="passwordBox">
            <input type = {type} placeholder="Password" className="password" onChange={(e)=>{setPassword(e.target.value)}} value = {password} onBlur={(event)=> {checkErrors("password")}}/> <span onClick={handleToggle}><Icon  className="eye" icon={icon}/></span><br/>
            </div>
            {!error.password.isValid ? <div className="errorBox"   style={{marginLeft:"100px",marginTop:"0.2px",color:"orangered"}}>Please Enter Valid Password</div>:<div className="errorBox"></div>}
            <div className="passwordBox" >
            <input type = {confirmtype} placeholder="Confirm Password" className="cpassword" onChange={(e)=>{setConfirm(e.target.value)}} value={confirm} /><span onClick={confirmhandleToggle}><Icon  className="eye" icon={confirmicon}/></span><br/><br/>
            </div>
            <button className="submit" onClick={handleSubmit}>Sign Up</button>
        </div>
        </div>
        </div>
        
        </>
    )
}
export default Signup