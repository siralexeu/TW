import express from 'express';
import cors from 'cors';

let app = express();
let router = express.Router();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'))

app.use(cors());
app.use("/api", router);

let data = [
    {
        "id": 1, "name": "Alex", "Faculty": "ASE"
    },
    {
        "id": 2, "name": "Mihai", "Faculty": "ASE"
    },
    {
        "id": 3, "name": "Ionut", "Faculty": "Poli"
    },
    {
        "id": 4, "name": "Octavian", "Faculty": "Medicina"
    },
    {
        "id": 5, "name": "George", "Faculty": "Universitate"
    },
]

function getData(){
    return data;
}

function getDataById(id){
    return data.find(x => x.id === parseInt(id))
}

function createData(elem){
    data.push(elem);
    return elem;
}

function updateElem(id, elem){
    if (parseInt(id) !== parseInt(elem.id))
        return "Error"

    data = data.map(obj => obj.id === parseInt(id) ? elem : obj);
    return elem;
}

function deleteElem(id){
    let el = getDataById(id);

    if (!el)
        return "Already Deleted"

    let index = data.indexOf(el);
    data.splice(index, 1);
    return data;
}

router.use((req, res, next) => {
    console.log("middleware");
    next();
})

router.route("/data").get((req, res) => {
    res.json(getData());
})

router.route("/data/:id").get((req, res) => {
    res.json(getDataById(req.params.id));
})

router.route("/data").post((req, res) => {
    res.json(createData(req.body));
})

router.route("/data/:id").put((req, res) => {
    res.json(updateElem(req.params.id, req.body));
})

router.route("/data/:id").delete((req, res) => {
    res.json(deleteElem(req.params.id));
})

let port = process.env.PORT || 8000;
app.listen(port);
console.log(`API is running at ${port}`);