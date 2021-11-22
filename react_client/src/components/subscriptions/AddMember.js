
import { create_data } from "../../services/services"
import { useHistory } from "react-router-dom"
import * as ROUTE from "../../constants/routes";
import MemberForm from "./MemberForm";

export default function AddMember() {
    const history = useHistory();

    const handleAddMember = async (member) => {
        await create_data('members', member);
        history.push( ROUTE.SUBSCRIPTIONS );
    }

    return (
        <MemberForm
            handleSumbit={handleAddMember}
            btnName={"Save"}
            url={ROUTE.SUBSCRIPTIONS} />
    )
}