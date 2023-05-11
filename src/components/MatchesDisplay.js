import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";


const MatchesDisplay = ( {matches, setClickedUser} ) => {

    const [matchedProfiles, setMatchedProfiles] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(null);

    console.log(matches)
    const matchedUserId = matches.map(({ user_id}) => user_id)
    console.log(matchedUserId)

    const userId = cookies.UserId;

    const removeDuplicates = matchedUserId.filter((item,index) => matchedUserId.indexOf(item) === index);
    console.log(removeDuplicates)
    const matchedUserIds = removeDuplicates

    const getMatches = async () => {
        try {
            const response = await axios.get('https://dating-appli.herokuapp.com/users', {
                params : {userIds: JSON.stringify(matchedUserIds)}
            })
            console.log(response.data)
            setMatchedProfiles(response.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getMatches()
    }, [])

    const filteredMatchedProfiles = matchedProfiles?.filter(
        (matchedProfile) =>
          matchedProfile.matches.filter((profile) => profile.user_id === userId)
            .length > 0
      );
    console.log(filteredMatchedProfiles)


    console.log(matchedProfiles)

    return (
    <div className="matches-display">
                  {matchedProfiles?.map((match, _index) => (
        <div
          key={_index}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
            {console.log(matchedUserIds)}
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>)
}

export default MatchesDisplay