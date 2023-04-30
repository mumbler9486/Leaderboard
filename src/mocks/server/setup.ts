import { setupServer } from 'msw/node';
import { serverHandlers } from './handlers';

export const server = setupServer(...serverHandlers);
