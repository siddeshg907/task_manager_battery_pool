import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const userID = localStorage.getItem("userID");

  const handleLogout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    // Navigate back to the main page
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`https://good-shoe-cow.cyclic.app/users`)
      .then((response) => {
        const foundUser = response.data.filter((u) => u._id === userID);
        setUser(foundUser[0].name);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">
          Task App
        </Link>
        <div className="flex space-x-5 items-center">
          <div
            className="flex items-center justify-center text-white font-bold text-xl bg-teal-300 w-10 h-10 rounded-full"
            style={{ textTransform: "uppercase" }}
          >
            {user[0]}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
