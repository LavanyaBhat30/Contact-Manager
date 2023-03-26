import { useState } from "react"
import "../styles/signup.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Signup = ()=>{
    const navigate = useNavigate();
    const [email,setMail] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("")
    
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
                    <h1 className="Logo">Logo</h1>
            <h3 className="text1">Create New Account</h3>
            <input type = "email" placeholder="Mail Id" className="mail" onChange={(e)=>{setMail(e.target.value)}} value={email}/><br/>
            <input type = "password" placeholder="Password" className="password" onChange={(e)=>{setPassword(e.target.value)}} value = {password}/><br/>
            <input type = "password" placeholder="Confirm Password" className="cpassword" onChange={(e)=>{setConfirm(e.target.value)}} value={confirm}/><br/><br/>
            <button className="submit" onClick={handleSubmit}>Sign Up</button>
        </div>
        </div>
        </div>
        
        </>
    )
}
export default Signup