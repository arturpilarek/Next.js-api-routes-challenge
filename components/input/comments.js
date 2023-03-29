import { useState } from "react"

import CommentList from "./comment-list"
import classes from "./comments.module.css"
import NewComment from "./new-comment"

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {
    // send data to API
    event.preventDefault()

    const reqBody = {
      ...commentData,
      eventId,
    }

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.error(err))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList eventId={eventId} />}
    </section>
  )
}

export default Comments
