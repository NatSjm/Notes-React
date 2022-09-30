const categories = {
    task: 'Task',
    idea: 'Idea',
    thought: 'Random thought'
};


export const getCategoryName = (name: string ) => categories[name as keyof typeof categories];
