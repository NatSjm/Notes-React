
const initialCreatedAt = new Date().toLocaleDateString();
export const defaultNotes = [
    {
        id: 1,
        title: 'Note1',
        content: 'Content',
        category: 'idea',
        isArchived: false,
        createdAt: initialCreatedAt
    },
    {
        id: 2,
        title: 'Note2',
        content: 'Content',
        category: 'task',
        isArchived: true,
        createdAt: initialCreatedAt
    },
    {
        id: 3,
        title: 'Note3',
        content: 'Content',
        category: 'idea',
        isArchived: false,
        createdAt: initialCreatedAt
    },
    {
        id: 4,
        title: 'Note4',
        content: 'Content',
        category: 'thought',
        isArchived: false,
        createdAt: initialCreatedAt
    },
    {
        id: 5,
        title: 'Note5',
        content: 'Content5',
        category: 'task',
        isArchived: false,
        createdAt: initialCreatedAt

    },
    {
        id: 6,
        title: 'Note6',
        content: 'Content 28.02.2023 math, 28-02-2099 latin, 03/09/2015 english',
        category: 'idea',
        isArchived: false,
        createdAt: initialCreatedAt
    },
    {
        id: 7,
        title: 'Note7',
        content: 'Content',
        category: 'task',
        isArchived: false,
        createdAt: initialCreatedAt
    }
];
