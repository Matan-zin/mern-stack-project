import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { update_data, get_data } from '../../services/services';

import Skeleton from 'react-loading-skeleton';
import MemberForm from './MemberForm';

export default function EditMember({ url }) {

    const id = sessionStorage.getItem('id')

    const history = useHistory();
    const [member, setMember] = useState(false);

    useEffect(() => { 
        get_data('members', id).then(res => setMember(res.data));

        return () => sessionStorage.removeItem('id');
    // eslint-disable-next-line
    }, []);

    const handleUpdate = async (member) => {
        await update_data('members', member);
        history.push(url);
    }

    return (
        <>
        { !member ? ( <Skeleton count={1} />
         ) : (
          <MemberForm
            _member={ member }
            handleSumbit={handleUpdate}
            btnName={"Update"}
            url={ url } />
        ) 
        }
        </>
    )
}