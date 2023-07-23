import { useSelector } from "react-redux";

function AdminOrder() {
    const categoryData = useSelector(state=>state.category?.data)
    return ( 
        <>
            <h1>ORDER PAGE</h1>
            <hr/>
            {JSON.stringify(categoryData)}
        </>
     );
}

export default AdminOrder;