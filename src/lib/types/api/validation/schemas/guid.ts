import { guidRegex } from '$lib/utils/validation';
import { string } from 'yup';

export const yupGuid = () => string().matches(guidRegex, 'Not a GUID');
