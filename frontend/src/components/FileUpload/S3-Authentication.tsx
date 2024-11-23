import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

// cognito configuration
const userPoolData = {
    UserPoolId: 'us-east-2_QZRu0tTGg', 
    ClientId: '65bm8uff7gr2upjf49esbldqha',
};
const userPool = new CognitoUserPool(userPoolData);

export const authenticateUser = (username: string, password: string) => {
    const userData = {
        Username: username,
        Pool: userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
    });

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                const idToken = result.getIdToken();

                const credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-east-2:1cf1e70f-ee82-4133-b762-50b35b6f111c',
                    Logins: {
                        ['https://byebyebias.auth.us-east-2.amazoncognito.com']: idToken.getJwtToken(),
                    },
                });

                credentials.get((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({
                            awsAccessKeyId: credentials.accessKeyId,
                            awsSecretAccessKey: credentials.secretAccessKey,
                            awsSessionToken: credentials.sessionToken,
                        });
                    }
                });
            },
            onFailure: (err) => reject(err),
        })
    })
}