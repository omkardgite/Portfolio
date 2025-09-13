import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { FaPlus, FaTasks, FaCheck, FaCog } from "react-icons/fa";

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'doing' | 'done';
}

const initialTasks: Task[] = [
  { id: '1', title: 'Design system setup', status: 'done' },
  { id: '2', title: 'Component library', status: 'doing' },
  { id: '3', title: 'API integration', status: 'todo' },
  { id: '4', title: 'Testing setup', status: 'todo' },
];

export function KanbanBoardDemo() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const columns = [
    { id: 'todo', title: 'To Do', icon: <FaTasks />, color: 'blue' },
    { id: 'doing', title: 'Doing', icon: <FaCog />, color: 'yellow' },
    { id: 'done', title: 'Done', icon: <FaCheck />, color: 'green' },
  ] as const;

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle.trim(),
        status: 'todo'
      };
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 max-w-lg">
      <h4 className="font-semibold mb-4 text-center">Drag & Drop Kanban</h4>
      
      {/* Add Task */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new task..."
            className="flex-1 px-3 py-1 text-sm bg-background border border-border rounded"
            data-testid="new-task-input"
          />
          <motion.button
            onClick={addTask}
            className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="add-task-button"
          >
            <FaPlus className="text-xs" />
          </motion.button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-3 gap-3">
        {columns.map((column) => (
          <div key={column.id} className="space-y-2">
            <div className={`flex items-center space-x-2 text-sm font-medium text-${column.color}-600 dark:text-${column.color}-400`}>
              {column.icon}
              <span>{column.title}</span>
              <span className="text-xs text-muted-foreground">
                ({getTasksByStatus(column.id).length})
              </span>
            </div>
            
            <Reorder.Group
              axis="y"
              values={getTasksByStatus(column.id)}
              onReorder={() => {}} // We'll handle reordering through moveTask
              className="space-y-2 min-h-[120px] bg-muted/30 rounded-lg p-2"
            >
              {getTasksByStatus(column.id).map((task) => (
                <Reorder.Item
                  key={task.id}
                  value={task}
                  className="bg-background border border-border rounded p-2 cursor-move"
                  whileHover={{ scale: 1.02 }}
                  whileDrag={{ scale: 1.05, rotate: 2 }}
                  data-testid={`task-${task.id}`}
                >
                  <div className="text-xs font-medium truncate">
                    {task.title}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-muted-foreground">
                      #{task.id}
                    </div>
                    <div className="flex space-x-1">
                      {columns.map((col) => (
                        col.id !== task.status && (
                          <motion.button
                            key={col.id}
                            onClick={() => moveTask(task.id, col.id)}
                            className={`text-xs px-1 py-0.5 rounded bg-${col.color}-500/10 text-${col.color}-600 dark:text-${col.color}-400 hover:bg-${col.color}-500/20`}
                            whileHover={{ scale: 1.1 }}
                            data-testid={`move-to-${col.id}`}
                          >
                            {col.icon}
                          </motion.button>
                        )
                      ))}
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-muted-foreground text-center">
        Demonstrates: Drag & Drop, State Management, Dynamic Lists
      </div>
    </div>
  );
}