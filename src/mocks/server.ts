import { setupServer } from 'msw/node';
import { serverHandlers } from './handlers.server';

export const server = setupServer(...serverHandlers);
