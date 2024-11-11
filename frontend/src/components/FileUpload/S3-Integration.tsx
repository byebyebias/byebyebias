import React, { useState } from 'react';
import Button from "../Button/Button";
import { authenticateUser } from './S3-Authentication';
import AWS from 'aws-sdk';

const S3Integration: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [temporaryCredentials, setTemporaryCredentials] = useState<any>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const credentials = await authenticateUser(username, password) as AWS.CognitoIdentityCredentials;
            setTemporaryCredentials(credentials);

            AWS.config.update({
                accessKeyId: credentials.accessKeyId,
                secretAccessKey: credentials.secretAccessKey,
                sessionToken: credentials.sessionToken,
            });

            alert('Authentication successful and temporary AWS credentials acquired')
        } catch (err) {
            setError('Authentication failed');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
    
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <Button onClick={handleLogin} label="S3 Integration>" />

          {error && <div style={{ color: 'red' }}>{error}</div>}
          {temporaryCredentials && (
            <div>
            <p>AWS Credentials Acquired</p>
            <pre>{JSON.stringify(temporaryCredentials, null, 2)}</pre>
            </div>
        )}
        </div>
      );
};

export default S3Integration;