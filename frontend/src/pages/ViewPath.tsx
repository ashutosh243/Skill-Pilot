import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import config from "../config/config";
import LearningPathUI from "../components/LearningPathUI";
import type { pathBodyT } from "../types/types";



const ViewPath: React.FC = () => {

    const [path, setPath] = useState<pathBodyT | null>(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchPath() {
            try {
                const response = await axios.get(`${config.backendEndpoint}/api/v1/path/${id}`,{withCredentials:true});
                setPath(response.data.data);
                console.log(response.data.data);
            }
            catch (e) {
                if (e instanceof AxiosError) {
                    alert(e.response?.data.msg);
                }
            }
        }
        fetchPath();
    }, [id]);
    console.log(path);

    return <>
        <div className="pt-70    h-screen flex items-center justify-center ">
            <LearningPathUI learningPathData={path} ></LearningPathUI>
        </div>
    </>
}   
export default ViewPath;