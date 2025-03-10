import React, { useState, useEffect } from 'react'
import store from '../stores/TaskStore'
import Task from './Task'

function TaskList() {
  const [tasks, setTasks] = useState([])
  const [selectedTasks, setSelectedTasks] = useState([])

  useEffect(() => {
	setTasks(store.getItems())
	console.log("Tasks in store:", store.getItems()) // Vezi ce taskuri sunt încărcate
	store.emitter.addEventListener('UPDATE', () => {
	  setTasks([...store.getItems()])
	  console.log("Updated tasks:", store.getItems()) // Vezi update-urile
	})
  }, [])
  

  const select = (item) => {
	if (!selectedTasks.find(e => e.id === item.id)) {
	  console.log("Selecting:", item)
	  setSelectedTasks(prevSelected => [...prevSelected, item])
	}
  }
  
  const deselect = (item) => {
	console.log("Deselecting:", item)
	setSelectedTasks(prev => {
	  const updated = prev.filter(e => e.id !== item.id)
	  console.log("Updated selectedTasks:", updated)
	  return updated
	})
  }
  

console.log("Rendering tasks:", tasks)

  return (
    <div>
      {tasks.map((e) => (
        <Task 
		item={e} 
		key={e.id} 
		onSelect={select} 
		onDeselect={() => deselect(e)}
		isSelected={selectedTasks.some(t => t.id === e.id)}
		/>
      ))}
    </div>
  )
}

export default TaskList
