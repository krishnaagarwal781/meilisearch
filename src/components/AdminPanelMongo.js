import React, { useState } from "react";
import { MeiliSearch } from "meilisearch";
import axios from 'axios';

const AdminPanelMongo = () => {
  const [indexName, setIndexName] = useState("");
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [mongoData, setMongoData] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreateIndex = async () => {
    if (!indexName) {
      setCreateError("Please enter an index name.");
      return;
    }

    setIsLoadingCreate(true);
    setCreateError(null);

    try {
      const client = new MeiliSearch({
        host: "https://meli.catax.me",
        apiKey:
          "1f194588dd75addc57ce54e46320c0f56b7858c4b6b42cee92beb88a55fe0b72",
      });
      await client.createIndex(indexName, { primaryKey: "_id" });
      console.log(`Index '${indexName}' created successfully.`);
    } catch (error) {
      setCreateError(error.message);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const handleAddDocuments = async () => {
    try {
      if (!mongoData.length) {
        console.error("No data fetched from MongoDB.");
        return;
      }

      const client = new MeiliSearch({
        host: "https://meli.catax.me",
        apiKey:
          "1f194588dd75addc57ce54e46320c0f56b7858c4b6b42cee92beb88a55fe0b72",
      });

      const index = client.index(indexName);

      await index.addDocuments(mongoData);
      console.log("Documents added successfully.");
    } catch (error) {
      console.error("Error adding documents:", error);
    }
  };

  const fetchDataFromMongo = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setMongoData(response.data.assets);
      console.log(response.data.assets)
    } catch (error) {
      console.error("Error fetching data from MongoDB:", error);
    }
  };

  const handleDeleteIndex = async () => {
    if (!indexName) {
      setDeleteError("Please enter an index name.");
      return;
    }

    setIsLoadingDelete(true);
    setDeleteError(null);

    try {
      const client = new MeiliSearch({
        host: "https://meli.catax.me",
        apiKey:
          "1f194588dd75addc57ce54e46320c0f56b7858c4b6b42cee92beb88a55fe0b72",
      });
      await client.deleteIndex(indexName);
      console.log(`Index '${indexName}' deleted successfully.`);
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <div className="mb-4">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded"
          placeholder="Enter index name"
          value={indexName}
          onChange={(e) => setIndexName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input type="file" accept=".json" onChange={handleFileChange} />
      </div>
      <div className="flex space-x-4">
        <button
          className={`flex-1 px-4 py-2 text-white rounded ${
            isLoadingCreate
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleCreateIndex}
          disabled={isLoadingCreate}
        >
          {isLoadingCreate ? "Creating..." : "Create Index"}
        </button>
        <button
          className={`flex-1 px-4 py-2 text-white rounded ${
            isLoadingDelete
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
          onClick={handleDeleteIndex}
          disabled={isLoadingDelete}
        >
          {isLoadingDelete ? "Deleting..." : "Delete Index"}
        </button>
      </div>
      <div className="mt-4 flex space-x-4">
        <button
          className={`flex-1 px-4 py-2 text-white rounded bg-green-500 hover:bg-green-600`}
          onClick={fetchDataFromMongo}
        >
          Fetch Data From MongoDB
        </button>
        <button
          className={`flex-1 px-4 py-2 text-white rounded bg-green-500 hover:bg-green-600`}
          onClick={handleAddDocuments}
        >
          Add Documents from MongoDB
        </button>
      </div>
      {createError && (
        <div className="text-red-500 mt-2">
          Error creating index: {createError}
        </div>
      )}
      {deleteError && (
        <div className="text-red-500 mt-2">
          Error deleting index: {deleteError}
        </div>
      )}
    </div>
  );
};

export default AdminPanelMongo;
