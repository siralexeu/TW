import React from "react";
import ListBody from "./ListBody";
import PropTypes from 'prop-types'

const styles = {
    li: {
      display: "flex",
      justifyContent: "flex-start",
      background: "white",
      boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
      color: "#707070",
      marginBottom: "1em",
      cursor: "pointer"
    },
    leftWall: color => ({
      width: "0.5em",
      backgroundColor: color
    })
  };

export default function ListItem({id, name, description, completed, handleOnClick}) {
    return(
      <li style={styles.li} onClick={() => handleOnClick(id)}>
           <div style={styles.leftWall(completed ? "green" : "red")}></div>
           <ListBody name={name} description={description}></ListBody>
      </li>
    )
}

ListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    handleOnClick: PropTypes.func.isRequired
}