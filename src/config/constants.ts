const LOCAL_STORAGE = {};

const PATHS = {
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  HOME: '/',
  BOARDS: '/boards',
  BOARD: (boardId: string) => `/boards/${boardId}`,
};

export { LOCAL_STORAGE, PATHS };
