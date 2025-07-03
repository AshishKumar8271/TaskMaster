import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface TaskInputProps {
    onAddTask: (text: string) => void;
    isLoading?: boolean;
}

const TaskInput = ({ onAddTask, isLoading }: TaskInputProps) => {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAddTask(text.trim());
            setText('');
        }
    }
    return (
        <div className="bg-white dark:bg-secondary rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 p-6 mb-8">
            <form
                onSubmit={handleSubmit}
                className="flex gap-4 items-center">
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="flex-1"
                    disabled={isLoading}
                />
                <Button type="submit" className='h-11'
                    disabled={!text.trim() || isLoading}
                >
                    <Plus className="w-4 h-4" />
                    Add Task
                </Button>
            </form>
        </div>
    )
}

export default TaskInput