import react from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function EditProduct(){
   
    const {id} = useParams();
    const {name} = useOutletContext();

    return <p>Edit product {id} {name}</p>
}