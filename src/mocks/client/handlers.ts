import { authHandlers } from './auth.handlers';
import { userHandlers } from './users.handlers';

// Mocks for client side requests.
export const handlers = [...authHandlers, ...userHandlers];
