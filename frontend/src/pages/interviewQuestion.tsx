import axios, { AxiosError } from 'axios';
import InterviewSidebar from '../components/InterviewSidebar';
import config from '../config/config';
import { useState } from 'react';
import QuestionList from '../components/QuestionList';
import { saveTosession, getFromSession } from '../utils/utils';

interface InterviewData {
    technology: string[];
    role: string;
    experience: number;
    message?: string;
}
const InterviewQuestion = () => {

    const [question, setquestions] = useState(getFromSession("interviewQuestion"));
    const [loading, setLoading] = useState(false);
    const generateQuestion = async (data: InterviewData) => {

        try{
            setLoading(true);
            const response = await axios.post(`${config.backendEndpoint}/api/v1/interview/question`, data, { withCredentials: true });
            if (!response.data.success) {
                alert(response.data.msg);
                return;
            }
            setquestions(response.data.result.allquestion);
            saveTosession("interviewQuestion", response.data.result.allquestion);
            setLoading(false);
        }
        catch (e) {

            if (e instanceof AxiosError) {
                alert(e.response?.data.msg);
                return;
            }
            const msg = (e instanceof Error) ? e.message : "unknow Error";
            console.log("error  in interview question compoenent", msg);
        }
    }
    return (
        <>
            <div className='flex h-screen bg-gray-50 pt-10'>
                <div className="w-3/4 p-20 overflow-y-auto">
                    <QuestionList data={question} isLoading={loading} />
                </div>
                <div className="w-1/4 p-6">
                    <InterviewSidebar onGenerate={generateQuestion} />
                </div>
            </div>
        </>)
}

export default InterviewQuestion;