import { Button } from '@/components/ui/button';

interface TaskFiltersProps {
    activeFilter: 'all' | 'active' | 'completed';
    onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

const TaskFilters = ({ activeFilter, onFilterChange }: TaskFiltersProps) => {
    const filters = [
        { key: 'all' as const, label: 'All Tasks' },
        { key: 'active' as const, label: 'Active' },
        { key: 'completed' as const, label: 'Completed' },
    ];

    return (
        <div className="flex flex-wrap gap-3 mb-6">
            {filters.map((filter) => (
                <Button
                    key={filter.key}
                    variant={activeFilter === filter.key ? 'default' : 'secondary'}
                    onClick={() => onFilterChange(filter.key)}
                >
                    {filter.label}
                </Button>
            ))}
        </div>
    );
}

export default TaskFilters;