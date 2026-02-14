import React, { useState, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import config from "../config/config";
import { theme } from "../theme";
import { saveTosession,getFromSession } from "../utils/utils";

type Message = {
    role: "user" | "assistant";
    content: string;
};
type prop={
      chats:React.Dispatch<React.SetStateAction<boolean>>
}

const Chat: React.FC<prop> = ({chats}) => {
    const [messages, setMessages] = useState<Message[]>(getFromSession('chatHistory')||[]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    
    const handleReset=()=>{
        chats(false);
        saveTosession('chatHistory',[]);
    }
    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = {
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(`${config.backendEndpoint}/api/v1/rag/query`, {
                text: userMessage.content,
            }, { withCredentials: true });
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: res.data?.msg?.answer },
            ]);
        } catch(err) {
             const msg=(err instanceof AxiosError)?err?.response?.data.msg:"check internet connection"
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong. Please try again.",
                },
            ]);
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        saveTosession('chatHistory',messages);
    }, [messages, loading]);

    return (
        <div className={`min-h-screen p-5 flex justify-center ${theme.colors.background} overflow-x-hidden pt-20`}>
            <div className="  w-full md:w-[60%]  flex flex-col bg-white shadow-xl md:rounded-2xl overflow-hidden">

                <div className="px-6 py-4 text-lg font-semibold text-white bg-linear-to-r bg-teal-700 to-teal-500">
                    📄 Doc Prep Bot
                </div>

                <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6 space-y-4 bg-gray-50">
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[65%] px-4 py-3 text-xl leading-relaxed break-words
                ${msg.role === "user"
                                        ? "bg-gradient-to-r from-teal-500 to-teal-300  text-gray-800 rounded-2xl rounded-br-md shadow-xl"
                                        : "bg-white text-gray-800 border rounded-2xl rounded-bl-md shadow-xl"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white border px-4 py-3 rounded-2xl text-sm shadow animate-pulse">
                                Thinking…
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                <div className="px-6 py-4 bg-white">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Ask something from your document..."
                            className="flex-1 bg-transparent text-xl focus:outline-none"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="px-6 py-2 text-sm font-medium text-white rounded-xl
                bg-linear-to-r from-teal-700 to-teal-500
                hover:opacity-90 active:scale-95 transition disabled:opacity-50"
                        >
                            Send
                        </button>
                        <button
                            onClick={handleReset}
                            disabled={loading}
                            className="px-6 py-2 text-sm font-medium text-white rounded-xl
               bg-linear-to-r from-teal-700 to-teal-500
                hover:opacity-90 active:scale-95 transition disabled:opacity-50"
                        >
                         Reset 
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Chat;
