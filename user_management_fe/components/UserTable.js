import Router from "next/router";
import style from '../styles/User.module.css'

const UserTable = ({data, users, setShowModal, sort}) => {

    return (
        <table className="table table-striped">
            <thead>

            <tr>
                <th scope="col">#</th>
                <th scope="col"><a id={style.sort} onClick={(e) => {
                    sort('first_name')
                }}>First name</a></th>
                <th scope="col">Last name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col"><a id={style.sort} onClick={(e) => {
                    sort('status')
                }}>Status</a></th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => {
                    return (
                        <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.status.toString()}</td>
                            <td>
                                <button className="btn btn-primary m-2" onClick={() => {
                                    Router.push(`/edituser/${user.id}`)
                                }}>Edit
                                </button>
                                <button onClick={() => setShowModal(user.id)} className="btn btn-danger m-2">Delete</button>
                                <button className="btn btn-dark m-2" onClick={() => {
                                    Router.push(`/assignpermissions/${user.id}`)
                                }}>Assign
                                </button>
                            </td>

                        </tr>
                    )
                }
            )}


            </tbody>
        </table>
    )
}

export default UserTable
