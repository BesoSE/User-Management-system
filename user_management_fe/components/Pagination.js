export default function Pagination({limit, pagination, offset, count}) {

    return (
        <nav>
            <ul className="pagination">
                <li className={limit > 0 ? "page-item" : "page-item disabled"}>
                    <a className="page-link" onClick={(e) => pagination(limit - 10, offset - 10)}>Previous</a>
                </li>
                <li className={count > limit + 10 ? "page-item" : "page-item disabled"}>
                    <a className="page-link" onClick={(e) => pagination(limit + 10, offset + 10)}>Next</a>
                </li>
            </ul>
        </nav>
    )

}
