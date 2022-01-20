import tuits from "./tuits-data.json";
import "./tuits.css";
import Tuit from "./tuit";

function Tuits() {
    return (
        <ul className="ttr-tuits list-group">
            {tuits.map((tuit, i) => {
                return <Tuit tuit={tuit} key={i} />;
            })}
        </ul>
    );
}
export default Tuits;
