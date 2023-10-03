import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  let submit = useSubmit();

  function startDeleteHandler(event) {
    event.preventDefault();
    const proceed = window.confirm("Are you sure you want to delete this event ?");

    console.log("window confirm => " + proceed);

    if (proceed) {
      submit(null, { method: "DELETE" });
      // console.log("deleted");
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button type="button" onClick={startDeleteHandler}>
          Delete
        </button>
      </menu>
    </article>
  );
}

export default EventItem;
