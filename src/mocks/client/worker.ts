import { setupWorker } from 'msw';
import { handlers } from './handlers.worker';

export const worker = setupWorker(...handlers);
