import React,{useState} from 'react';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import axios  from 'axios';
const Login = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({
        email:'',
        password:''
    })
    const LoginUser = async (e)=>{
        e.preventDefault();
        const {email, password} = data
        try{
        const {data} = await axios.post('/login',{
            email, password
        })
        if(data.error){
            toast.error(data.error)
        }else{
            setData({})
            toast.success("Login Successfully!");
            navigate('/')
        }
        }catch(error){
        console.log(error)
        }
    }
  return (
    <div>
        <form onSubmit={LoginUser}>
            <input type="email" placeholder='enter email...' onChange={(e)=> setData({...data, email: e.target.value})} />
            <br/>
            <input type="password" placeholder='enter password...' onChange={(e)=> setData({...data, password: e.target.value})} />
            <br/>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Login