import { useContext, useRef, useState } from "react"
import NotificationContext from "../../store/notification-context"
import classes from "./newsletter-registration.module.css"

function NewsletterRegistration() {
  const [notification, setNotification] = useState(null)
  const emailInputRef = useRef()

  const notificationCtx = useContext(NotificationContext)

  function registrationHandler(event) {
    event.preventDefault()

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter.",
      status: "pending",
    })

    const reqBody = {
      email: emailInputRef.current.value,
    }

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setNotification(data.message))
      .then(() =>
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter.",
          status: "success",
        })
      )
      .then(() => (emailInputRef.current.value = ""))
      .catch((err) => notificationCtx.showNotification({
        title: "Error!",
        message: err.message || "Something went wrong!",
        status: "error",
        })
      )
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      {notification && <p>{notification}</p>}
    </section>
  )
}

export default NewsletterRegistration
