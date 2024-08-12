import Pocketbase from 'pocketbase';
const url = process.env.NEXT_PUBLIC_POCKETBASE_URL;

const client = new Pocketbase(url);

export { client };

