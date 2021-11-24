import { useState } from 'react';
import { useHistory } from "react-router-dom";
import { hashpass, create_data } from "../../services/services";
import { v4 as uuidv4 } from 'uuid'
import UserForm from "./UserForm";

export default function AddUser({ url }) {
    
    const history = useHistory();
    const [error, setError] = useState(false);

    const emptyDetails = {
        'First Name': '', 'Last Name': '',
        'Email': '', 'Created Date': '',
        'Session Time Out': ''
    }
    const emptyPermisisons = {
        'View Subscriptions': 'false', 'Create Subscriptions': 'false',
        'Delete Subscriptions': 'false', 'Update Subscriptions':'false',
        'View Movies': 'false', 'Create Movies':'false', 'Delete Movies':'false',
        'Update Movies':'false'
    }

    const handleSubmit = async ({ details, permissions }) => {
        let uuid = uuidv4();
        let user = { 
            id: uuid, 
            username: details['First Name'],
            password: await hashpass('1234') 
        }
        details.id     = uuid;
        permissions.id = uuid;
        try { // await used here to catch name conflict in auth database
            await create_data('auth', user);
            create_data('details',     details    ).catch(err => console.error(err.message));
            create_data('permissions', permissions).catch(err => console.error(err.message));
            history.push(url);
        } catch(err) { setError('try different First Name') }
    };

    return <>
           { error && <p role="log">{error}</p> }
           <UserForm 
                _details={emptyDetails}
                _permissions={emptyPermisisons}
                handleSubmit={(data) => handleSubmit(data)}
                url={url}
                btnName="Save"/>
           </>
}