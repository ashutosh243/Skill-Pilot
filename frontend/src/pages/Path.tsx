import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import config from "../config/config";

export interface Path {
    _id: string;
    goal: string;
    level?: string;
    createdAt?: string;
}

const AllPaths = () => {
    const [paths, setPaths] = useState<Path[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchPaths = async (): Promise<Path[]> => {
        const res = await axios.get(`${config.backendEndpoint}/api/v1/path/all-path`, { withCredentials: true });
        console.log(res.data);
        return res.data.path;

    };
    useEffect(() => {
        fetchPaths()
            .then(setPaths)
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: string) => {
        console.log(id);
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-teal-500 mb-6">
                All Generated Paths
            </h1>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paths.map(path => (
                    <div
                        key={path._id}
                        className="bg-white rounded-xl shadow-md p-5 border border-teal-50 hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold">
                            {path.goal}
                        </h2>

                        <p className="text-gray-600 mt-2 line-clamp-3">
                            {path.level || "No description available"}
                        </p>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => navigate(`/view/${path._id}`)}
                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 cursor-pointer"
                            >
                                View
                            </button>

                            <button
                                onClick={() => handleDelete(path._id)}
                                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllPaths;
