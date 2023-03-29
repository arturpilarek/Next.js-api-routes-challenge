import { useEffect, useState } from "react"
import classes from "./comment-list.module.css"

function CommentList({ eventId }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/api/comments/${eventId}`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error(err))
  }, [comments])

  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((comment) => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
