import clientPromise from "../../lib/mongodb"

export default async (req, res) => {
  try {
    const client = await clientPromise
    const db = client.db("newsletter-comments")

    const newsletter = await db.collection("newsletter").find({}).toArray()

    if (req.method === "POST") {
      const { email } = req.body

      if (!email || !email.includes("@")) {
        res.status(422).json({ message: "Invalid input." })
        return
      }

      if (newsletter.find((subscriber) => subscriber.email === email)) {
        res.status(422).json({ message: "Email already exists." })
        return
        }

      const newSubscriber = await db.collection("newsletter").insertOne({
        email,
        dateAdded: new Date().toISOString(),
      })

      res.status(201).json({ message: "Success!" })

    } else if (req.method === "GET") {
        res.json(newsletter)
    }
  } catch (e) {
    console.error(e)
  }
}
