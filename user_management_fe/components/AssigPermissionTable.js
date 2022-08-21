const AssignPermissionTable = ({permissions, deletePermission, addPermission}) => {


    return (
        <table className="table table-striped">
            <thead>

            <tr>
                <th scope="col">#</th>
                <th scope="col">Code</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {permissions.map((permission) => {
                    return (
                        <tr key={permission.id}>
                            <th scope="row">{permission.id}</th>
                            <td>{permission.code}</td>
                            <td>{permission.description}</td>
                            <td>
                                {permission.active ?
                                    <button className="btn btn-danger m-2"
                                            onClick={(e) => deletePermission(permission.id)}
                                    >Remove</button>
                                    :
                                    <button className="btn btn-primary m-2"
                                            onClick={(e) => addPermission(permission.id)}
                                    >Add</button>
                                }
                            </td>

                        </tr>
                    )
                }
            )}


            </tbody>
        </table>
    )
}

export default AssignPermissionTable
