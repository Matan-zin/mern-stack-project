export default function userPermissions({ permissions, handleChange }) {

    return (
        <div className="permission-div">
        <label htmlFor="View Subscriptions">View Subscriptions:</label>
        <input
            name="View Subscriptions"
            type="checkbox"
            checked={permissions["View Subscriptions"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor="Create Subscriptions">Create Subscriptions:</label>
        <input
            name="Create Subscriptions"
            type="checkbox"
            checked={permissions["Create Subscriptions"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor="Delete Subscriptions">Delete Subscriptions:</label>
        <input
            name="Delete Subscriptions"
            type="checkbox"
            checked={permissions["Delete Subscriptions"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor="Update Subscriptions">Update Subscriptions:</label>
        <input
            name="Update Subscriptions"
            type="checkbox"
            checked={permissions["Update Subscriptions"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor="View Movies">View Movies:</label>
        <input
            name="View Movies"
            type="checkbox"
            checked={permissions["View Movies"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor="Create Movies">Create Movies:</label>
        <input
            name="Create Movies"
            type="checkbox"
            checked={permissions["Create Movies"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor="Delete Movies">Delete Movies:</label>
        <input
            name="Delete Movies"
            type="checkbox"
            checked={permissions["Delete Movies"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />

        <label htmlFor="Update Movies">Update Movies:</label>
        <input
            name="Update Movies"
            type="checkbox"
            checked={permissions["Update Movies"] === 'true'}
            onChange={({ target }) => handleChange(target)}
            />
        </div>
    )

}