import { Link } from "react-router-dom";
import classes from "./EventsList.module.css";

function EventsList({ events }) {
  return (
    <div className={classes.events}>
      <h1>All Events</h1>
      <ul className={classes.list}>
        {events.map((item) => (
          <li key={item.id} className={classes.item}>
            <Link to={item.id}>
              <img src={item.image} alt={item.title} />
              <div className={classes.content}>
                <h2>{item.title}</h2>
                <time>{item.date}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
