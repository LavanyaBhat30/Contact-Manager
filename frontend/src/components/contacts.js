import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios"
const Logout = ()=>{
    const navigate = useNavigate()
    const handleLogout = () => {
        // console.log(window.localStorage.getItem("token"))
        axios.get("http://localhost:8000/api/v1/logout")
        // // axios.get("http://localhost:8080/signout").then((data) => { console.log(data) })
        // window.localStorage.clear();
        // window.localStorage.clear();
        // window.sessionStorage.clear();
        // window.location.href = "./";
        navigate("/",{replace:true})

    }
    useEffect(()=>{
        console.log("ok")
        axios.get("http://localhost:8000/api/v1/contacts").then((result)=>{
            console.log(result)
        }).catch((err)=>{
            console.log(err.data.message)
        })
    },[])
    return (

        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout