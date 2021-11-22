import { useHistory } from "react-router-dom";
import { hashpass, create_data } from "../../services/services";
import { v4 as uuidv4 } from 'uuid'
import UserForm from "./UserForm";

export default function AddUser({ url }) {
    
    const history = useHistory();

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
        // TODO: need to fix the creation when conflict arise in auth service ( unique username )
        create_data('auth',        user       ).catch(err => console.error(err.message));
        create_data('details',     details    ).catch(err => console.error(err.message));
        create_data('permissions', permissions).catch(err => console.error(err.message));
        history.push(url);
    };

    return <>
           <UserForm 
                _details={emptyDetails}
                _permissions={emptyPermisisons}
                handleSubmit={(data) => handleSubmit(data)}
                url={url}
                btnName="Save"/>
           </>
}