import { useCookies } from "react-cookie"
// import { NavLink } from "react-router-dom"


const ChatHeader = ( { user }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['users'])

    const logout = () => {
        removeCookie ('UserId', cookies.userId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.replace('/')
    }
    return (
    <div className="chat-container-header">
            <div className="profile">
                <div className="img-container">
                    <img src = {user.url} alt=""/>
                </div>
                <h3>{user.first_name}</h3>
                </div>
                <i className="log-out icon" onClick={logout}>X</i>
    </div>)
}

export default ChatHeader