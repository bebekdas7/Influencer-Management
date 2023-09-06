import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { _id, name, followers, socialMedia } = location.state.result;

  // State variables to track changes
  const [newname, setNewName] = useState(name);
  const [newsocialMedia, setNewSocialMedia] = useState(socialMedia);
  const [newfollowers, setNewFollowers] = useState(followers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: newname,
      socialMedia: newsocialMedia,
      followers: newfollowers,
    };
    console.log(newname, newsocialMedia, newfollowers);

    // Send the updated data to the server
    await axios.put(`http://localhost:3000/update-influencer/${_id}`, data);
    console.log("Data updated");
    navigate("/");
  };

  return (
    <div className="col-sm-4 border border-black pt-3 pb-3 p-2 m-auto mt-5">
      <h2 className="text-center mt-2 text-danger">UPDATE INFLUENCER</h2>
      <hr />

      <form method="post" onSubmit={handleSubmit}>
        <div className="form-group text-center mt-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={newname}
            onChange={(e) => setNewName(e.target.value)} // Track changes in state
            aria-describedby="name"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group text-center mt-4">
          <label htmlFor="socialMedia">Social Media</label>
          <input
            type="text"
            className="form-control"
            id="socialMedia"
            name="socialMedia"
            value={newsocialMedia}
            onChange={(e) => setNewSocialMedia(e.target.value)} // Track changes in state
            placeholder="Paste your Social Media Link"
          />
        </div>
        <div className="form-group text-center mt-4">
          <label htmlFor="followers">Followers Count</label>
          <input
            type="number"
            className="form-control"
            id="followers"
            name="followers"
            value={newfollowers}
            onChange={(e) => setNewFollowers(e.target.value)} // Track changes in state
            placeholder="No of followers"
          />
        </div>

        <button className="btn btn-success mt-3">Update</button>
        <button className="btn btn-info mt-3 ms-2">Home</button>
      </form>
    </div>
  );
};

export default Update;
