import clientPromise from "../../../lib/mongodb"

export default async (req, res) => {
  const { eventId } = req.query

  try {
    const client = await clientPromise
    const db = client.db("newsletter-comments")

    const newsletter = await db.collection("comments").find({}).toArray()

    if (req.method === "POST") {
      const { email, name, text } = req.body

      if (
        !email ||
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid input." })
        return
      }

      const newComment = await db.collection("comments").insertOne({
        email,
        name,
        text,
        eventId,
        dateAdded: new Date().toISOString(),
      })

      res.json(newComment)
    } else if (req.method === "GET") {
        
      const comments = await db
        .collection("comments")
        .find({ eventId })
        .toArray()

      res.json(comments)
    }
  } catch (e) {
    console.error(e)
  }
}
