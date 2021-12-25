import { useState } from "react"
import { useHistory } from "react-router-dom";

export default function MemberForm({ 
    _member, 
    handleSumbit,
    btnName,
    url 
}){
    const history = useHistory();
    const [member, setMemeber] = useState( _member || { name: '', email: '', city: '' } );

    const handleChange = ({ name, value }) => {
        setMemeber({...member, [name]: value });
    }

    const handleLocalSubmit = (event) => {
        event.preventDefault();
        handleSumbit(member);
    }

    return (
        <form onSubmit={handleLocalSubmit} className="member-form">
        <label htmlFor="name">Name:</label>
        <input 
            name="name"
            type="text"
            value={member.name}
            placeholder="Enter name"
            onChange={({ target }) => handleChange(target)} />
        <label htmlFor="email">Email:</label>
        <input 
            name="email"
            type="email"
            value={member.email}
            placeholder="Enter email"
            onChange={({ target }) => handleChange(target)} />
        <label htmlFor="city">City:</label>
        <input 
            name="city"
            type="text"
            value={member.city}
            placeholder="Enter city"
            onChange={({ target }) => handleChange(target)} />
        <div className="inner-btns member-btns">
        <button
            type="submit">{btnName}</button>
        <button
            type="button"
            onClick={() => history.push(url)}>Cancel</button>
        </div>
    </form>
    )
}