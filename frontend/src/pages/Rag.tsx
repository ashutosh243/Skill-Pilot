import React, { useEffect, useState } from 'react'
import KBInput from '../components/KbInput'
import ChatsInterface from '../components/ChatsInterface';
import { saveTosession, getFromSession } from '../utils/utils';

const Rag: React.FC = () => {

    const [startConversation, setCoversation] = useState(getFromSession("startConversation") || false);
    useEffect(() => {
        saveTosession<boolean>("startConversation", startConversation);
    }, [startConversation]);
    return <>
        {!startConversation && <KBInput chats={setCoversation}></KBInput>}
        {startConversation && <ChatsInterface chats={setCoversation}></ChatsInterface>}
    </>
}

export default Rag