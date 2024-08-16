import { client } from './client';

const logout = () => {
  client.authStore.clear();
};

const oAuthMethods = async () => {
  const authMethods = await client.collection('users').listAuthMethods();
  const listItems = [];
  for (const provider of authMethods.authProviders) {
    listItems.push(provider);
  }
  return listItems;
};

const oAuthLogin = async () => {
  try {
    const res = await client.collection('users').authWithOAuth2(
      {
        provider: 'google',
      }
    );

    return res;
  } catch (err) {
    return err;
  }
};

const authService = {
  logout,
  oAuthMethods,
  oAuthLogin,
};

export default authService;