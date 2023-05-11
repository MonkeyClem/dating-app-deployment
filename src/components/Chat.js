const Chat = ( {descendingOrderMessages} ) => {
    return (
        <>
            <div className="chat-display">
                    {descendingOrderMessages.map((message, _index) => (
                        <div key = {_index}>
                        <div className="chat-message*header">
                        <p>{message.name}</p>
                        <div className="img-container">
                            <img  src = {message.img} alt =''/>
                        </div>
                    
                        </div>
                        <p>{message.message}</p>
                        </div>

                    ))}
            </div>
        </>
    )
}

export default Chat