import {useState} from "react";
import userAPI from "../http/users";
import Router from "next/router";

const UserForm = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async (e) => {
        e.preventDefault();
        try {
            const res = await userAPI().createUser(first_name, last_name, email, password, username);
            if (res.status == 200) {
                Router.push('/');
            }
        } catch (err) {
            console.log(err)
            alert("Please check your data.")
        }
    }

    return (
        <div className="container" style={{marginTop: '10vh'}}>
            <h2>Create User</h2>
            <form className="" onSubmit={createUser}>
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="Enter first name"
                    className="form-control  m-2"
                    onChange={e => setFirstName(e.target.value)}
                    required
                />
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder="Enter last name"
                    className="form-control  m-2"
                    onChange={e => setLastName(e.target.value)}
                    required
                />
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    className="form-control  m-2"
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    id="email"
                    type={"email"}
                    name="email"
                    placeholder="Enter email"
                    className="form-control  m-2"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    id="password"
                    type={"password"}
                    name="password"
                    placeholder="Enter password"
                    className="form-control  m-2"
                    minLength="8"
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <input type="submit" value="Create User" className="btn btn-dark m-2"/>
            </form>
        </div>
    )
}


export default UserForm
