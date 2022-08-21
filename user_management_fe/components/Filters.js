export default function Filters({filtering, users_filter, statuses}) {

    return (
        <div>
            <select className="btn btn-secondary dropdown-toggle m-2 col-sm-6"
                    onChange={e => {
                        filtering(`&status=${e.target.value}` || '')
                    }}>
                <option value=''>All statuses</option>
                {statuses.map((stat) =>
                    <option key={stat} value={stat}>{stat}</option>
                )}

            </select>

            <select className="btn btn-secondary dropdown-toggle col-sm-5"
                    onChange={e => {
                        filtering(`&first_name=${e.target.value}` || '')
                    }}>
                <option value=''>All users</option>
                {users_filter.map((user) =>
                    <option key={user.first_name} value={user.first_name}>{user.first_name}</option>
                )}

            </select>
        </div>
    )

}

