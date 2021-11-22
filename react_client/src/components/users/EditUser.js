import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import UserForm from "./UserForm"
import { get_data, update_data } from "../../services/services";

export default function EditUser({ url }) {

    const history = useHistory();
    const id = JSON.parse(sessionStorage.getItem('id'));
    
    const [details, setDetails]         = useState(false);
    const [permissions, setPermissions] = useState(false);

    useEffect(()=> {
      get_data('details',     id).then(res => setDetails(res.data)    ).catch(err => console.error(err.message));
      get_data('permissions', id).then(res => setPermissions(res.data)).catch(err => console.error(err.message));
    // eslint-disable-next-line
    },[]);

    useEffect(() => { return () => sessionStorage.removeItem('id') },[]);

    const handleSubmit = async ({ details, permissions }) => {
      await update_data('details',     details    ).catch(err => console.error(err.message));
      await update_data('permissions', permissions).catch(err => console.error(err.message));
      history.push( url );
    }   

    return <>
            { !(details && permissions) ? ( <Skeleton count={1} />
            ) : (  
            <UserForm  
                handleSubmit={(data) => handleSubmit(data)}
                _details={details}
                _permissions={permissions}
                url={url}
                btnName="Update"/> )
            }
           </>
}