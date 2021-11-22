import { useHistory } from "react-router-dom"

export default function Button({name, url}) {

    const history = useHistory();

    return (
        <button
            type="button"
            onClick={() => history.push(url) }>{name}</button>
    )
}