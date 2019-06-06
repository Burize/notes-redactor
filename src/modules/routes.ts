export const routes = {
  note: {
    path: '/note/:id?',
    make: (noteId?: string) => noteId ? `/note/${noteId}` : '/note',
  },
};

export const defaultRoute = routes.note;
