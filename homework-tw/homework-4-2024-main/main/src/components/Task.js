import React from 'react'
import store from '../stores/TaskStore'

function Task({ item, onSelect, onDeselect, isSelected }) {
  return (
    <div>
  {item.description} ({item.priority})
  <button onClick={() => onSelect(item)}>select</button>
  {isSelected && <button onClick={() => onDeselect(item)}>deselect</button>}
</div>

  )
}

export default Task
