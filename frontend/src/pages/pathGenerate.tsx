import axios from 'axios';
import PathForm from '../components/PathForm';
import LearningPathUI from '../components/LearningPathUI.js';
import config from '../config/config.js';
import { useState } from 'react';
import LearningPathSkeleton from '../components/LearningPathSkeleton.js';
import { saveTosession, getFromSession } from '../utils/utils.js';


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
            
            console.log("response in generate path",data?.result?.learningPath);
           
            setPath(data?.result);
            saveTosession("path",data?.result);

            setThreadId(data.threadId);
            saveTosession("threadId",data.threadId);

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
            console.log("response in handle decision",response.data);
            setPath(response?.data?.result);
            saveTosession("path",response?.data?.result);

            setChoice(choice);
            saveTosession("choice",choice);

            setGenerating(false);
            console.log("choice",choice,choice==='discard');
            if(choice==='discard'){
                console.log("inside discard");
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
        <div className="flex h-screen pt-10 bg-gray-50 ">
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