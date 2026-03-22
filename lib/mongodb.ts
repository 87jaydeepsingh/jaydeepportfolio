import { MongoClient, Db } from "mongodb"

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your MongoDB URI to .env.local")
// }

// const uri = process.env.MONGODB_URI
const uri = "mongodb+srv://Vercel-Admin-atlas-jaydeeps:dyNOtMPeRHajO8l4@atlas-jaydeeps.kqwpzxm.mongodb.net/?retryWrites=true&w=majority"
const options = {}
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("portfolio")
}
