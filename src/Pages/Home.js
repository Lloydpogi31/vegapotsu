import "../CSS/Home.css";
import { DataContext } from "../DataContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const { loggedIn } = useContext(DataContext);
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");

  // Fetch a random quote from the Quotable API
  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // Checks if user is logged in or not, if not go to login page
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      fetchQuote();
    }
  }, [loggedIn, navigate]);

  return (
    <div className="homeBody">
      {quote && (
        <div className="quoteContainer">
          <div className="label">Quote of the Day</div>
          <blockquote className="quote">
            <p>"{quote}"</p>
          </blockquote>
        </div>
      )}
      <div></div>
    </div>
  );
}

export default Home;
