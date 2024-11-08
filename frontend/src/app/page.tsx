"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Types
interface File {
  _id: string;
  fileName: string;
  fileType: string;
  updatedAt: string;
  owner: string;
  collaborators: string[];
  isPinned: boolean;
}

// Main Index Component
const HomePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch Files
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("/api/files"); // Assuming /api/files fetches the file list
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Handlers for file actions
  const handleOpenFile = (fileId: string) => {
    router.push(`/file/${fileId}`); // Navigate to file detail page
  };

  const handleNewFile = async () => {
    try {
      const response = await axios.post("/api/files", {
        fileName: "Untitled.js",
      });
      const newFile = response.data;
      setFiles((prevFiles) => [newFile, ...prevFiles]);
      handleOpenFile(newFile._id);
    } catch (error) {
      console.error("Error creating new file:", error);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      await axios.delete(`/api/files/${fileId}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Code Files</h1>
      <div className="flex justify-between mb-6">
        <button onClick={handleNewFile} className="btn btn-primary">
          + New File
        </button>
        <button className="btn btn-secondary">Upload File</button>
      </div>

      {loading ? (
        <p>Loading files...</p>
      ) : files.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <li key={file._id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{file.fileName}</h2>
              <p className="text-sm text-gray-600">Type: {file.fileType}</p>
              <p className="text-sm text-gray-600">
                Last Updated: {new Date(file.updatedAt).toLocaleString()}
              </p>
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => handleOpenFile(file._id)}
                  className="btn btn-link"
                >
                  Open
                </button>
                <button
                  onClick={() => handleDeleteFile(file._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found. Create or upload a new file to get started.</p>
      )}
    </div>
  );
};

export default HomePage;
