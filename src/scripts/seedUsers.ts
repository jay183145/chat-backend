import mongoose from "mongoose"
import User from "../models/User.js"
import dotenv from "dotenv"

dotenv.config()

async function seedUsers() {
    try {
        // 連線到 MongoDB
        const MONGO_URI = process.env.MONGO_URI
        if (!MONGO_URI) {
            console.error("MONGO_URI is not set in the environment variables")
            process.exit(1)
        }
        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected...")

        // Insert the users into the collection
        await User.insertMany(users)
        console.log("Users created successfully!")
    } catch (error) {
        console.error("Error creating users:", error)
    } finally {
        // Close the connection
        await mongoose.connection.close()
        console.log("Connection closed.")
    }
}

// Execute the seed function
seedUsers()

const users = [
    {
        username: "Alice",
        email: "alice@example.com",
        avatar: "https://i.pravatar.cc/150?img=1",
        password: "123456",
    },
    {
        username: "Bob",
        email: "bob@example.com",
        avatar: "https://i.pravatar.cc/150?img=2",
        password: "123456",
    },
    {
        username: "Charlie",
        email: "charlie@example.com",
        avatar: "https://i.pravatar.cc/150?img=3",
        password: "123456",
    },
    {
        username: "David",
        email: "david@example.com",
        avatar: "https://i.pravatar.cc/150?img=4",
        password: "123456",
    },
    {
        username: "Emma",
        email: "emma@example.com",
        avatar: "https://i.pravatar.cc/150?img=5",
        password: "123456",
    },
]
