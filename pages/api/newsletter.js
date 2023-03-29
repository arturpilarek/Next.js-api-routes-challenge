import clientPromise from "../../lib/mongodb"

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db("newsletter-comments")

    const newsletter = await db.collection("newsletter").find({}).toArray()

    if (req.method === "POST") {
      const { email, name } = req.body

      if (!email || !email.includes("@") || !name || name.trim() === "") {
        res.status(422).json({ message: "Invalid input." })
        return
      }

      if (newsletter.find((subscriber) => subscriber.email === email)) {
        res.status(422).json({ message: "Email already exists." })
        return
        }

      const newSubscriber = await db.collection("newsletter").insertOne({
        email,
        name,
        dateAdded: new Date().toISOString(),
      })

      res.json(newSubscriber)

    } else if (req.method === "GET") {
        res.json(newsletter)
    }
  } catch (e) {
    console.error(e)
  }
}
