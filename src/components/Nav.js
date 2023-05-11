import logo from "../images/logo.png";



const Nav = ({ minimal, setShowModal, showModal, setIsSignUp}) => {
    const handleClick = () => {
        setShowModal(true)
        setIsSignUp(false)
    }
    const authToken = false
    
    return (
        <nav>
            <div>
                <img className="logo" src={minimal ? logo : logo} alt="logo"></img>
            </div>

            {!authToken && !minimal && <button 
                    className="nav-button" 
                    onClick={handleClick}
                    disabled={showModal}>
                        Login
                    </button>}
        </nav>
    );
};

export default Nav;
