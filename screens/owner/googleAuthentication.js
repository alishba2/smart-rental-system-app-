// GoogleLoginScreen.js
import React from 'react';
import { View, Button } from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebase';

const GoogleLoginScreen = () => {
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '99698953760-4b1n8k9ogrm2cefmbp5n12hqkqtbed9u.apps.googleusercontent.com',
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;

            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }, [response]);

    return (
        <View>
            <Button
                disabled={!request}
                title="Login with Google"
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
};

export default GoogleLoginScreen;
