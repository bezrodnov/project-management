import { proxy } from '~/pages/api';

export default proxy({ methods: ['GET', 'PUT', 'POST', 'DELETE'] });
