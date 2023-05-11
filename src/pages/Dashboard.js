import TinderCard from 'react-tinder-card'
import '../index.css'
import { useCookies } from 'react-cookie'
import ChatContainer from '../components/ChatContainer'
import { useEffect , useState } from 'react'
import axios from 'axios'

const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [lastDirection, setLastDirection] = useState()



  const userId = cookies.UserId
  console.log("----> userId :")
  console.log(userId)

  const getUser = async () => {
    try {
        const response = await axios.get('https://dating-appli.herokuapp.com/user', {
            params: {userId}
        })
        // console.log(response)
        setUser(response.data)
    } catch (error) {
        console.log(error)
    }finally{
        console.log('Ca fonctionne')
      }
}




const getGenderedUsers = async () => {
  try {
      const response = await axios.get('https://dating-appli.herokuapp.com/gendered-users', {
          params: {gender: user?.gender_interest}
      })
      setGenderedUsers(response.data)
  } catch (error) {
      console.log(error)
  }
}

console.log("user :", user)


useEffect(() => {
  getUser()

}, [])

useEffect(() => {
  if (user) {
      console.log("On a les Users par genre !")
      getGenderedUsers()
  }
}, [user])


console.log(genderedUsers)

    
const updateMatches = async (matchedUserId)=>{
  
  console.log(matchedUserId)
  


      try{
        await axios.put('https://dating-appli.herokuapp.com/addmatch', {
        userId,
        matchedUserId,
     })
      getUser()
      }catch(e){
        console.log(e)
      }
      console.log(user)
    }
    const swiped = (direction, swipedUserId) => {
      console.log('removing: ' + swipedUserId)
      if(direction === 'right'){
      updateMatches(swipedUserId)
    }
      setLastDirection(direction)
    }
  
    const outOfFrame = (user) => {
      console.log(user.name + ' left the screen!')
    }

      
  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)
  console.log(matchedUserIds)

  const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))
  console.log("genderedUser :", genderedUsers)
  console.log('filteredGenderedUsers ', filteredGenderedUsers)


    return ( 
      <>
           { genderedUsers && <div className="dashboard">
            <ChatContainer user = {user} />
                 {<div className="swiper-container">
                    <div className="card-container">
                    {filteredGenderedUsers.map((filteredGenderedUser) =>
                        <TinderCard 
                        className='swipe' 
                        key={filteredGenderedUser.name} 
                        onSwipe={(dir) => swiped(dir, filteredGenderedUser.user_id)} 
                        onCardLeftScreen={() => outOfFrame(filteredGenderedUser.name)}>
                            <div style={{ backgroundImage: 'url(' + filteredGenderedUser.url + ')' }} className='card'>
                                  <h3>{filteredGenderedUser.first_name}</h3>
                                  <p>About me : {filteredGenderedUser.about}</p>
                                
                            </div>
                        </TinderCard>
        )}
                    <div className="swipe-info">
                       {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                    </div>
                </div> }
            </div>} 
            </>
            )
}

export default Dashboard