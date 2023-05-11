import Nav from '../components/Nav'
import AuthModal from '../components/authModal'
import { useState } from 'react'


const Home = () => {

    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    //We'll have a real authToken later, but let's fake it for now 
    const authToken = false

    const handleClick = () =>{
        console.log("Clicked :)")
        setShowModal(true)
        setIsSignUp(true)
    }

    return ( 
            <div className='overlay'>
            <Nav minimal={false} authToken={authToken} setShowModal={setShowModal} showModal={showModal} setIsSignUp={setIsSignUp}/>
            <div className="home">
                <h1 className='primary-title'>Let's meet !</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? "Sign Out" : "Create Account"}
                </button>  
                
                {showModal && 
                    (<AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>)}
            </div>

            </div> 
            )
}

export default Home