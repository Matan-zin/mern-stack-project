
import Skeleton from "react-loading-skeleton";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as ROUTE from "../../constants/routes";
import { get_data, delete_data } from "../../services/services";

export default function AllUsers({ url }) {

    const history = useHistory();
    const [refresh,     setRefresh]     = useState(false);
    const [details,     setDetails]     = useState(false);
    const [permissions, setPermissions] = useState(false);


    const storeId = (id) => {
        sessionStorage.setItem('id', JSON.stringify(id));
        history.push(url + ROUTE.EDIT_USER);
    };

    const handleDelete = (id) => {
      delete_data('details', id);
      delete_data('permissions', id);
      delete_data('auth', id);
      setRefresh(!refresh);
    }


    useEffect(() => { 
      get_data('details').then(res => setDetails(res.data));
      get_data('permissions').then(res => setPermissions(res.data));
    },[refresh])

    return <>
        { (details && permissions) ? 
          <div className="list">
            { details.map((detail, index) => (
              <div className="user-card" key={index}>
              <form aria-label="user info" role="presentation">
              <ul aria-label="user details">
              { Object.entries(detail).map(([key, value], index) => (
                  key !== 'id' && <li key={index}><span>{key}:</span>{value}</li>      
              ))}    
              </ul>
              <ul aria-label="user permissions">
              { Object.entries(permissions.find(perm => perm.id === detail.id)).map(([key, value], index) => (
                  key !== 'id' && value !== 'false' && <li key={index}><span>{key}:</span>{value}</li>
              ))}
              </ul>
              <div className="user-btns">
              <button type="button" onClick={() => storeId(detail.id)}>      Edit   </button>
              <button type="button" onClick={() => handleDelete(detail.id)}> Delete </button>
              </div>
              </form>
              </div>
            ))}
          </div>
           : <Skeleton count={1} /> }
        </>
                
}