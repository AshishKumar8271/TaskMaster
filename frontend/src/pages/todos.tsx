import AuthModal from '@/components/auth-modal';
import Header from '@/components/header';
import TaskFilters from '@/components/task-filters';
import TaskInput from '@/components/task-input';
import TaskList from '@/components/task-list';
import Title from '@/components/title';
import { useAuthContext } from '@/context/AuthContext';
import { useTodo } from '@/hooks/use-todos';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import type { Todo } from '@/shared/schema';
import Description from '@/components/description';

const Todos = () => {
  const { user } = useAuthContext();
  const { createTodo, getTodos, isLoading, updateTodo, deleteTodo } = useTodo();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleSignInClick = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleSignUpClick = () => {
    setAuthMode('register');
    setAuthModalOpen(true);
  };

  const handleAddTask = async (text: string) => {
    try {
      await createTodo(text);
      toast.success('Task Added', {
        description: 'Your new task has been created'
      });
      await fetchTodos();
    } catch (err: any) {
      toast.error('Failed to add task', {
        description: err.message || 'Internal Serer Error',
      })
    }
  }

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      await updateTodo(id, completed);
      await fetchTodos();
    } catch (err: any) {
      toast.error('Failed to update the task', {
        description: err.message
      })
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);
      await fetchTodos();
    } catch (err: any) {
      toast.error('Failed to delete the task', {
        description: err.message
      })
    }
  }

  const filteredTodos = useMemo(() => {
    if (!Array.isArray(todos)) return [];

    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTasks = useMemo(() => {
    if (!Array.isArray(todos)) return 0;

    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const completedTasks = useMemo(() => {
    if (!Array.isArray(todos)) return 0;

    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <Header
        handleSignInClick={handleSignInClick} handleSignUpClick={handleSignUpClick}
      />

      <div className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              <Title>Welcome back, <span className="text-primary dark:text-blue-500">{user?.username || 'there'}</span>!</Title>
            </h2>
            <p >
              <Description>You have {activeTasks} task{activeTasks !== 1 ? 's' : ''} to complete today.</Description>
            </p>
          </div>

          {/* Task Input */}
          <TaskInput
            onAddTask={handleAddTask}
            isLoading={isLoading}
          />

          {/* Task Filters */}
          <TaskFilters
            activeFilter={filter}
            onFilterChange={setFilter}
          />

          {/* Task List */}
          <TaskList
            todos={filteredTodos}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            isLoading={isLoading}
          />

          {/* Task Stats */}
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-muted-foreground">
            <span>{Array.isArray(todos) ? todos.length : 0} total tasks</span>
            <span>{activeTasks} active</span>
            <span>{completedTasks} completed</span>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  )
}

export default Todos;