import { useState } from "react"
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import {useCookies} from 'react-cookie'


const AuthModal = ({setShowModal, setIsSignUp, isSignUp}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie ] = useCookies(['user'])

    let navigate = useNavigate()
    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(isSignUp && (password !== confirmPassword)){
                setError('Passwords need to match');
                return 
            }

            // console.log("make a post request here")
            const response = await axios.post(`https://dating-appli.herokuapp.com/${isSignUp ? 'signup' : 'login'}`, { email, password })
            console.log(response.data)

            setCookie('Email', response.data.email);
            setCookie('UserId', response.data.userId);
            setCookie('AuthToken', response.data.token);
            
            const success = response.status === 201;

            if(success && isSignUp)navigate('/onboarding')
            if(success && !isSignUp)navigate('/dashboard')

            window.location.reload('/')
        }
        catch (error){
            console.log(error);
        }
    }

    return ( 
            <div className="auth-modal">
                <div className="close-icon" onClick={handleClick}>X</div>
                <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
                <p>By clicking "log in", you agree to our terms. Learn how we process your data in our Privacy Policy</p>  
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        placeholder="email"
                        requiredtrue={true}
                        onChange={(e) => setEmail (e.target.value)}
                        />
                           <input 
                        type="password" 
                        id="password"
                        name="password"
                        placeholder="password"
                        requiredtrue={true}
                        onChange={(e) => setPassword (e.target.value)}
                        />
                     {isSignUp && <input 
                        type="password-check" 
                        id="password-check"
                        name="password-check"
                        placeholder="confirm password"
                        requiredtrue={true}
                        onChange={(e) => setConfirmPassword (e.target.value)}
                        />}
                        <input type="submit" className="secondary-button"/>
                        <p>{error}</p>
                </form> 
                <hr/>
                <h2>APP COMING SOON</h2>
            </div>
            )
}

export default AuthModal