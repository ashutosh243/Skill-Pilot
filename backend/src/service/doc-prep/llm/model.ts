import { ChatGroq } from "@langchain/groq";
import config from "../../../config/config.js";


export default function getModel() {

    if (config.model === 'groq') {
        return new ChatGroq({
            model: "llama-3.3-70b-versatile",
            temperature: 0
        });
    }
}
