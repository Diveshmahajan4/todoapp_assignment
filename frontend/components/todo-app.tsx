'use client'

import { useState, useEffect } from 'react'
import { Loader2, Trash2, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import * as api from '../services/api'

interface Task {
  id: number
  title: string
  is_completed: boolean
  created_at: string
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const tasks = await api.getTasks()
      setTasks(tasks)
      setError(null)
    } catch (err) {
      setError('Failed to fetch tasks')
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    try {
      const newTask = await api.createTask({ title: newTaskTitle.trim() })
      setTasks([...tasks, newTask])
      setNewTaskTitle('')
      toast({
        title: "Success",
        description: "Task created successfully",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create task. Please try again.",
      })
    }
  }

  const handleToggleComplete = async (task: Task) => {
    try {
      const updatedTask = await api.updateTask(task.id, {
        is_completed: !task.is_completed,
      })
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t))
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update task. Please try again.",
      })
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      await api.deleteTask(id)
      setTasks(tasks.filter(task => task.id !== id))
      toast({
        title: "Success",
        description: "Task deleted successfully",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete task. Please try again.",
      })
    }
  }

  const handleDeleteAllTasks = async () => {
    try {
      await api.deleteAllTasks()
      setTasks([])
      toast({
        title: "Success",
        description: "All tasks deleted successfully",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete all tasks. Please try again.",
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={fetchTasks}
            disabled={loading}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon" disabled={tasks.length === 0}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all tasks?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your tasks.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAllTasks}>
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <form onSubmit={handleCreateTask} className="flex gap-2">
        <Input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" disabled={!newTaskTitle.trim()}>
          Add Task
        </Button>
      </form>

      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No tasks yet. Add one above!
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={task.is_completed}
                  onCheckedChange={() => handleToggleComplete(task)}
                  id={`task-${task.id}`}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className={`text-sm ${
                    task.is_completed ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {task.title}
                </label>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

