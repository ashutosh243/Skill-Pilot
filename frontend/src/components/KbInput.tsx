import { useState } from "react";
import { theme } from "../theme";
import config from "../config/config";
import axios, { AxiosError } from "axios";

interface KbInputProp{
  chats:React.Dispatch<React.SetStateAction<boolean>>;
}

const KbInput: React.FC<KbInputProp> = ({chats}) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("kb", file);

      const res = await axios.post(`${config.backendEndpoint}/api/v1/rag/ingest`, formData, { withCredentials: true });
      if (res?.data?.success) {
        setUploaded(true);
        chats(true);
      }

    } catch (err) {
      console.log(err);
      setError("Failed to upload PDF");
      const msg = err instanceof AxiosError ? (err.response?.data?.msg) : "unknow Error";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme.colors.background}`}>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 text-center">
        <h2 className="text-xl font-semibold mb-6">
          Upload your PDF to start conversation
        </h2>

        {!uploaded && (
          <>
            <input
              type="file"
              accept="application/pdf"
              id="pdf-upload"
              className="hidden"
              onChange={(e) =>
                setFile(e.target.files?.[0] || null)
              }
            />
            <label
              htmlFor="pdf-upload"
              className="cursor-pointer inline-block px-6 py-3 bg-teal-500  text-black rounded-lg hover:bg-teal-600   shadow-2xl transition"
            >
              Choose PDF
            </label>

            {file && (
              <p className="mt-4 text-sm text-gray-600">
                {file.name}
              </p>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className={`cursor-pointer mt-6 w-full px-6 py-3 rounded-lg bg-green-600 ${theme.colors.primary} disabled:opacity-50 bg-linear-to-r from-teal-700 to-teal-500 text-white py-3 text-sm font-semibold shadow-md hover:from-teal-900 hover:to-teal-900 cursor-pointer transition`}
            >
              {loading ? "Uploading..." : "Upload PDF"}
            </button>
          </>
        )}

        {uploaded && (
          <button
            className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Start Conversation
          </button>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default KbInput;
