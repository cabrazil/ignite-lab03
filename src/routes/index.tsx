import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';

import { SignIn } from '../screens/Signin';
import { AppRoutes } from './app.routes';

export function Routes() {
  const [isloading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth()
      .onAuthStateChanged(response => {
        setUser(response);
        setIsLoading(false);
      });

    return subscriber;
  }, []);

  if(isloading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}