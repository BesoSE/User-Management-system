import userAPI from "../http/users";
import UserTable from "./UserTable";
import {useEffect, useState} from "react";
import Modal from "./Modal";
import Router from 'next/router'
import Filters from "./Filters";
import Pagination from "./Pagination";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [users_filter, setUsersFilter] = useState([]);
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [count, setCount] = useState(0)
    const [limit, setLimit] = useState(0)
    const [offset, setOffset] = useState(0)
    const [user_id, setUserId] = useState(null)
    const [ordering, setOrdering] = useState(true)
    const [statuses, setStatuses] = useState(["true", "false"])
    const [filter, setFilter] = useState('')

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const deleteUser = async (id) => {
        await userAPI().deleteUser(id);
        setUsers(users.filter(item => {
            return item.id !== id
        }));
        handleClose();

    }

    const pagination = async (limit, offset) => {
        setLimit(limit)
        setOffset(offset)
        await userAPI().getUsers(limit, offset).then(res => {
            setUsers(res.data.results);
            setCount(res.data.count)
            setData(res.data);
        });
    }

    const sort = async (sort_field) => {
        setOrdering(!ordering)
        let sorting = `&ordering=${sort_field}`
        if (!ordering) {
            sorting = `&ordering=-${sort_field}`
        }
        await userAPI().getUsers(limit, offset, sorting).then(res => {
            setUsers(res.data.results);
            setCount(res.data.count)
            setData(res.data);
        });
    }

    const filtering = async (filter) => {
        setFilter(filter);
        await userAPI().getUsers(limit, offset, filter).then(res => {
            setUsers(res.data.results);
            setCount(res.data.count)
            setData(res.data);
        });
    }


    useEffect(() => {
        const getUsers = async () => {
            await userAPI().getUsers(limit, offset).then(res => {
                setUsers(res.data.results);
                setUsersFilter(res.data.results);
                setCount(res.data.count)
                setData(res.data);
            });

        }
        getUsers();
    }, [])

    return (
        <div className="container" style={{marginTop: '10vh', marginBottom: '10vh'}}>
            <Modal showModal={showModal} handleShow={handleShow} deleteUser={deleteUser} handleClose={handleClose} user_id={user_id}/>
            <div className="form-group" style={{display: 'flex', justifyContent: 'space-between', marginTop: '3vh'}}>
                <button className="btn btn-primary" onClick={() => {
                    Router.push("/createuser")
                }}>Create user
                </button>
                <Filters filtering={filtering} users_filter={users_filter} statuses={statuses}/>
            </div>
            <UserTable users={users} data={data} handleShow={handleShow} sort={sort} setUserId={setUserId}/>
            <Pagination limit={limit} pagination={pagination} count={count} offset={offset} />

        </div>
    )
}


export default Home
