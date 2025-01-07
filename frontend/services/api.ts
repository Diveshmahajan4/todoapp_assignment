interface Task {
  id: number;
  title: string;
  is_completed: boolean;
  created_at: string;
}

interface CreateTaskData {
  title: string;
}

interface UpdateTaskData {
  title?: string;
  is_completed?: boolean;
}

export async function getTasks(): Promise<Task[]> {
  const response = await fetch('http://127.0.0.1:8000/api/tasks/');
  if (!response.ok) throw new Error('Failed to fetch tasks');
  // console.log(response.json())
  // return response.json();
  const data = await response.json(); // Await the JSON parsing
  console.log(data); // Log the parsed JSON

  if (Array.isArray(data)) {
    return data; // Return the tasks directly if it's an array
  } else {
    throw new Error('Unexpected response format');
  }
}

export async function createTask(data: CreateTaskData): Promise<Task> {
  const response = await fetch('http://127.0.0.1:8000/api/tasks/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

export async function updateTask(id: number, data: UpdateTaskData): Promise<Task> {
  const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
}

export async function deleteAllTasks(): Promise<void> {
  const response = await fetch('http://127.0.0.1:8000/api/tasks/delete-all/', {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete all tasks');
}

