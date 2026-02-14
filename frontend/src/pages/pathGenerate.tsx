import axios from 'axios';
import PathForm from '../components/PathForm';
import LearningPathUI from '../components/LearningPathUI.js';
import config from '../config/config.js';
import { useState } from 'react';
import LearningPathSkeleton from '../components/LearningPathSkeleton.js';
import { saveTosession, getFromSession } from '../utils/utils.js';
import { theme } from '../theme.js';


const PathGenerate = () => {
    
    const [isGenerating,setGenerating]=useState(false);
    const [path, setPath] = useState(getFromSession("path"));
    const [threadId, setThreadId] = useState(getFromSession("threadId"));
    const [choice, setChoice] = useState(getFromSession("choice")||"");

    const generatePath = async (id: string): Promise<void> => {
        try {
            setGenerating(true);
            const response = await axios.post(`${config.backendEndpoint}/api/v1/path/path-generate`, { id }, { withCredentials: true });
            const data = response?.data;
            
            console.log("response in generate path",data);
           
            setPath(data?.result);
            saveTosession("path",data?.result);

            setThreadId(data.threadId);
            saveTosession("threadId",data.threadId);

            setChoice("");
            saveTosession("choice","");

            setGenerating(false);
        }
        catch (e) {
            const msg = (e instanceof Error) ? e.message : "unknown Error";
            console.log(msg);
        }
    }
    const handleDecision = async (choice: "save" | "regenerate" | "discard") => {

        try {
            setGenerating(true);
            const response = await axios.post(`${config.backendEndpoint}/api/v1/path/path-decision`, { threadId, choice },{withCredentials:true});
            setPath(response?.data?.result);
            saveTosession("path",response?.data?.result);

            setChoice(choice);
            saveTosession("choice",choice);

            setGenerating(false);
            if(choice==='discard'){
                saveTosession("path",null);
                setPath(null);
            }
        }
        catch (e) {
            const msg = (e instanceof Error) ? e.message : "unknown Error";
            console.log(msg);
        }
    }
    return (
        <div className={`flex h-screen pt-10 ${theme.colors.background} `}>
            <div className="w-3/4 p-20 overflow-y-auto ">
                {
                  isGenerating?(<LearningPathSkeleton/>): (<LearningPathUI learningPathData={path} decision={handleDecision} choice={choice} /> )
                }
            </div>
            <div className="w-1/4 p-6">  
                <PathForm onGenerate={generatePath} />
            </div>
        </div>
    )
}

export default PathGenerate;