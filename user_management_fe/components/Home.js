import userAPI from "../http/users";
import UserTable from "./UserTable";
import {useEffect, useState} from "react";
import Modal from "./Modal";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(null);

    const deleteUser = async (id)=>{
        await userAPI().deleteUser(id);
        setUsers(users.filter(item => {return item.id !== id }));
        setShowModal(null)

    }


    useEffect(() => {
            const getUsers = async () =>{
                await userAPI().getUsers().then(res => {
                    setUsers(res.data.results);
                    setData(res.data);
                });

            }
        getUsers();
        }, [])

    return (
        <div className="container" style={{marginTop: '10vh'}}>
            <Modal showModal={showModal} setShowModal={setShowModal} deleteUser={deleteUser}/>
            <button className="btn btn-primary">Create user</button>
            <UserTable users={users} data={data}  setShowModal={setShowModal}/>
        </div>
    )
}


export default Home
