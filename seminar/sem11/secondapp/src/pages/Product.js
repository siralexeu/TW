import react from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Home(){
    const [searchParams, setSearchParams] = useSearchParams({n: 3, x: "days"});
    const number = searchParams.get("n");
    return (
        <div>
            <p>Product List</p>

            <h1>Product List</h1>
            <Link to="/Product/1">Product 1</Link>
            <Link to="/Product/2">Product 2</Link>
            <Link to={`/Product/${number}`}>Product {number}</Link>

            <input type="number" value={number} onChange={e => setSearchParams({n: e.target.value, x:"days"})} />

    </div>
    )
}