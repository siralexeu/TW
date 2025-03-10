import React from 'react'

function SelectedTasks({ selectedTasks, onDeselect }) {
  return (
    <div>
      <h2>Selected Tasks</h2>
      <ul>
        {selectedTasks.map((task) => (
          <li key={task.id}>
            {task.description} ({task.priority}) 
            <button onClick={() => onDeselect(task)}>deselect</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectedTasks
