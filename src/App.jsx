import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./components/List";
import axios from "axios";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [sortedData, setSortedData] = useState([]);
  const [search, setSearch] = useState("");

  //Toast Function
  const showToast = () => {
    toast.success("Influencer Added Successfully");
  };

  //HandleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the values from the form fields
    const name = document.getElementById("name").value;
    const socialMedia = document.getElementById("socialMedia").value;
    const followers = document.getElementById("followers").value;
    const postdata = {
      name,
      socialMedia,
      followers,
    };
    try {
      await axios.post("http://localhost:3000/create-influencer", postdata);
      showToast();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
    window.location.reload();
  };

  ////Fetch All Influencer
  useEffect(() => {
    const getInfluencers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/get-all-influencers"
        );
        setSortedData(response.data);
      } catch (error) {
        toast.error("Something Went Wrong");
      }
    };
    getInfluencers();
  }, []);

  ////Sort By Name
  const sortByName = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sort-name");
      setSortedData(response.data);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const sortByFollower = async () => {
    try {
      const response = await axios.get("http://localhost:3000/sort-follower");
      setSortedData(response.data);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const handleSortByName = () => {
    sortByName();
    setSortedData([]);
  };
  const handleSortByFollower = () => {
    sortByFollower();
    setSortedData([]);
  };
  const handleSearch = (e) => {
    const filteredData = sortedData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setSortedData(filteredData);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-5 mt-3 m-auto form-div">
            <div>
              <h2 className="text-center mt-2 text-danger">ADD INFLUENCER</h2>
              <hr />

              <form method="post" onSubmit={handleSubmit}>
                <div className="form-group text-center mt-4">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
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
                    placeholder="No of followers"
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6 mt-3 m-auto list-div">
            <div className="heading mb-2">
              <h2 className="text-center mt-2 text-success">
                INFLUENCER'S LIST
              </h2>
              <hr />

              <div className="d-flex justify-content-space-around align-items-center">
                <input
                  type="text"
                  placeholder="Search here"
                  className="p-1 search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="search-btn btn border border-black"
                  onClick={handleSearch}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <button className="btn btn-info" onClick={handleSortByName}>
                  Sort By Name
                </button>
                <button
                  className="btn btn-info ms-2"
                  onClick={handleSortByFollower}
                >
                  Sort By Follower
                </button>
              </div>
            </div>
            <div>
              {sortedData.length > 0 ? (
                sortedData.map((item) => (
                  <List
                    key={item._id}
                    id={item._id}
                    name={item.name}
                    follower={item.followers}
                    socialMedia={item.socialMedia}
                  />
                ))
              ) : (
                <div> No Data Found </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
