from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

# Allowing CORS for development purposes. Adjust origin as needed.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Connect to MongoDB
client = MongoClient(
    "mongodb://retpro:0987654321@ac-sj9ds5j-shard-00-00.1gw1jry.mongodb.net:27017,ac-sj9ds5j-shard-00-01.1gw1jry.mongodb.net:27017,ac-sj9ds5j-shard-00-02.1gw1jry.mongodb.net:27017/?replicaSet=atlas-10dypp-shard-0&ssl=true&authSource=admin"
)
db = client["RetPro_Backend_DB"]
collection = db["skills"]  # Adjust collection name as needed


@app.get("/users")
async def get_assets():
    assets = list(collection.find({}, {"_id": 0}))
    return {"assets": assets}  # Returning assets in JSON format


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
