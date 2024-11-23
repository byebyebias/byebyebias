import React, { useState } from 'react';
import Button from "../Button/Button";

const S3LinkUpload: React.FC = () => {
    const [s3Link, sets3Link] = useState('')

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // send the link to backend
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/upload/`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ link: s3Link })
            });
            const result = await response.json();
            
            if (response.ok) {
                console.log('Link submitted and file processed: ', result);
                fetchDashboardData(selectedFile.name);
    
            } else {
              console.log("Error with s3 link");
            }
          } catch (error) {
            console.error("Error with s3 link: ", error);
          }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='s3Link'>Enter s3 Link:</label>
            <input
                type="text"
                id="s3Link"
                value={s3Link}
                onChange={(e) => sets3Link(e.target.value)}
                required
            />
            <Button label="Submit s3 Link"/>
        </form>
    )
};

export default S3LinkUpload;