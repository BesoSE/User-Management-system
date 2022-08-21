import {useState, useEffect} from "react";
import userAPI from "../http/users";
import Router, {useRouter} from "next/router";

const EditUserForm = () => {
    const router = useRouter();
    const {id} = router.query;
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);


    const editUser = async (e) => {
        e.preventDefault();
        try {
            let data_for_send = {
                first_name, last_name, status
            }

            if (data.email != email) {
                data_for_send["email"] = email
            }

            const res = await userAPI().editUser(id, data_for_send);

            if (res.status == 200) {
                Router.push('/');
            }
        } catch (err) {
            console.log(err)
            alert("Please check your data.")
        }
    }

    useEffect(() => {
        const getUser = async (id) => {
            await userAPI().getUser(id).then(res => {
                setFirstName(res.data.first_name)
                setLastName(res.data.last_name)
                setEmail(res.data.email)
                setStatus(res.data.status)
                setData(res.data)
                if (res.data.status) {
                    document.getElementById('status_true').checked = 'checked';
                } else {
                    document.getElementById('status_false').checked = 'checked';

                }
            });

        }
        getUser(id);
    }, [])

    return (
        <div className="container" style={{marginTop: '10vh'}}>
            <h2>Edit User</h2>
            <form className="" onSubmit={editUser}>
                <input
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={first_name}
                    placeholder="Enter first name"
                    className="form-control  m-2"
                    onChange={e => setFirstName(e.target.value)}
                    required
                />
                <input
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={last_name}
                    placeholder="Enter last name"
                    className="form-control  m-2"
                    onChange={e => setLastName(e.target.value)}
                    required
                />
                <input
                    id="email"
                    type={"email"}
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    className="form-control  m-2"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <div className="form-group row">
                    <h6 className="col-sm-3">Status</h6>
                    <div className="col-sm-3">
                        <input style={{marginLeft: '3.5vh'}} type="radio" id="status_true" name='status'
                               onChange={e => setStatus(true)} required/>
                        <label className="col-sm-2 col-form-label" style={{marginLeft: '0.5vh'}}> True </label>
                    </div>
                    <div className="col-sm-3">
                        <input type="radio" className="col-sm-4" id="status_false" name='status'
                               onChange={e => setStatus(false)} required/>
                        <label className="col-sm-2 col-form-label" style={{marginLeft: '0.5vh'}}> False </label>
                    </div>

                </div>
                <input type="submit" value="Edit User" className="btn btn-dark m-2"/>
            </form>
        </div>
    )
}


export default EditUserForm
