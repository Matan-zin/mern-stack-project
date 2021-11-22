import { useState } from "react"
import { useHistory } from "react-router-dom";

import UserDetails     from "./UserDetails";
import UserPermissions from "./UserPermissions";

export default function UserForm({
    handleSubmit,
    _details,
    _permissions,
    url,
    btnName})
{    
    const history = useHistory();
    
    const [details, setDetails]          = useState(_details);
    const [permissions , setPermissions] = useState(_permissions);

    const handle_details_changed = ({ name, value }) => {
        setDetails({...details, [name]: value})
    }

    const handle_permissions_changed = ({ name }) => {
        let tmp = permissions;

        if(name.search('View') === -1 && (permissions[name] === 'false')) { 
            // if 'Create', 'Delte' or 'Update' are set to true setting also 'View' to true 
            let str = name.split(' ');
            str = 'View ' + str[1].toString();
            if( tmp[str] === 'false' ) tmp[str] = 'true';
        }
        tmp[name] = tmp[name] === 'true' ? 'false' : 'true';
        setPermissions({...tmp})
    }
    
    const handle_local_submit = (event) => {
        event.preventDefault();
        handleSubmit({ details , permissions });
    };

    return (
        <form className="user-form" onSubmit={handle_local_submit} >
        <UserDetails
                 details={details}
                 handleChange={handle_details_changed} 
                 readonly={btnName === 'Update' ? true : false}/>
        <UserPermissions 
                 permissions={permissions}
                 handleChange={handle_permissions_changed} />
        <div className="user-btns">
        <button type="submit">{btnName}</button>
        <button type="button" onClick={() => history.push(url)}> Cancel </button>
        </div>
        </form>
    )
}