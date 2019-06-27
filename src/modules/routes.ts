export const routes = {
  redactor: {
    path: '/redactor/:id?',
    make: (noteId?: string) => noteId ? `/redactor/${noteId}` : '/redactor',
  },
};

export const defaultRoute = routes.redactor;
