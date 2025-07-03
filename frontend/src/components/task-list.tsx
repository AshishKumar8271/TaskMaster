import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2, ClipboardList } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Todo } from '@/shared/schema.tsx';
import CustomCard from './custom-card';
import Description from './description';

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
  isLoading?: boolean;
}

const TaskList = ({ todos, onToggle, onDelete, onEdit, isLoading }: TaskListProps) => {
  if (isLoading) {
    return (
      <CustomCard className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <Description>Loading tasks...</Description>
      </CustomCard>
    );
  }

  if (todos.length === 0) {
    return (
      <CustomCard className="p-12 text-center">
        <ClipboardList className="w-16 h-16 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium mb-2">No tasks yet</p>
        <p>Add your first task to get started!</p>
      </CustomCard>
    );
  }

  return (
    <CustomCard >
      {todos.map((todo) => (
        <div
          key={todo._id}
          className="border-b border-gray-100 last:border-b-0 p-4 hover:bg-gray-50  dark:hover:bg-muted transition duration-200"
        >
          <div className="flex items-center gap-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) => onToggle(todo._id, checked as boolean)}
            />
            <div className="flex-1">
              <p className={`font-medium dark:text-muted-foreground ${todo.completed
                ? 'text-gray-500 line-through'
                : 'text-gray-900'
                }`}>
                {todo.text}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {todo.completed ? 'Completed' : 'Created'}{' '}
                {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(todo._id)}
                  className="text-gray-400 hover:text-primary"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(todo._id)}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </CustomCard>
  );
};

export default TaskList;
