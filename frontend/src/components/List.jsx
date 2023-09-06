import "../css/list.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = (props) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    console.log(props.id);
    await axios.delete(`http://localhost:3000/delete-influencer/${props.id}`);
    console.log("deleted");
    window.location.reload();
  };
  const handleUpdate = async () => {
    const result = await axios.get(
      `http://localhost:3000/get-influencer-byid/${props.id}`
    );
    navigate("/update", { state: { result: result.data } });
  };

  return (
    <div className="list mb-4 d-flex">
      <div className="box w-25 p-1">
        <span>Name:</span>
        <u>
          <span className="ms-2">{props.name}</span>
        </u>
      </div>
      <div className="box w-25 p-1">
        <span>Follower:</span>
        <u>
          <span className="ms-2">{props.follower}</span>
        </u>
      </div>
      <div className="box w-25 p-1">
        <button
          className="btn btn-primary"
          onClick={() => {
            window.open(props.socialMedia, "_blank");
          }}
        >
          Visit Social Media
        </button>
      </div>
      <div className="box w-25 p-1">
        <button className="btn btn-success" onClick={handleUpdate}>
          <FontAwesomeIcon icon={faPen} />
        </button>
        <button className="btn btn-danger ms-2" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default List;
