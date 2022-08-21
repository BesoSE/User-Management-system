import userAPI from "../http/users";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import AssignPermissionTable from "./AssigPermissionTable";

const AssignPermission = () => {
    const router = useRouter();
    const {id} = router.query;
    const [permissions, setPermissions] = useState([])

    const deletePermission = async (permission_id) => {
        const res = await userAPI().deleteUserPermission(permission_id, id)
        if (res.status == 200) {
            setPermissions(
                permissions.filter(obj => {
                        if (obj.id == permission_id) {
                            obj.active = false
                        }
                        return obj
                    }
                )
            );
        }

    }
    const addPermission = async (permission_id) => {
        const res = await userAPI().addUserPermission(permission_id, id)
        if (res.status == 200) {
            setPermissions(
                permissions.filter(obj => {
                        if (obj.id == permission_id) {
                            obj.active = true
                        }
                        return obj
                    }
                )
            );
        }
    }

    useEffect(() => {
        const getUserPermissions = async (id) => {
            await userAPI().getUserPermissions(id).then(res => {
                setPermissions(res.data)
            });

        }
        getUserPermissions(id);
    }, [])

    return (
        <div className="container" style={{marginTop: '10vh', marginBottom: '10vh'}}>
            <AssignPermissionTable permissions={permissions} deletePermission={deletePermission}
                                   addPermission={addPermission}/>
        </div>
    )
}


export default AssignPermission
