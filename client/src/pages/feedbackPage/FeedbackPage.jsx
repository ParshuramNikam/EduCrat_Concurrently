import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppUserContext from "../../context/AppUserContext";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../../data/vars";
import "./feedbackPage.css";
import StarRating from "../../components/star-rating/StarRating";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  let { feedbackId } = useParams();
  let { usertype } = useParams();
  const appUser = useContext(AppUserContext);
  const navigate = useNavigate();

  const handleFeedback = (e) => {
    if (feedback === "") {
      alert("Feedback is required!");
      return;
    }
    if (feedback.length < 10 || feedback.length > 250) {
      alert("Feedback must be between 10 and 250 characters!");
      return;
    }

    if (rating === 0) {
      alert("Please give rating !");
      return;
    }

    setFeedback(e.target.value);

    axios
      .post(backendURL + "/api/user/feedback/" + feedbackId + "/" + usertype, {
        feedback: feedback,
        rating: rating,
      })
      .then((res) => {
        console.log(res.data);
        alert("Feedback submitted!");
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(backendURL + "/api/feedback/" + feedbackId).then((res) => {
      console.log(res.data);
      if (usertype === "student") {
        setFeedback(res.data.feedback.studentFeedback);
        setRating(res.data.feedback.studentRating);
      } else {
        setFeedback(res.data.feedback.teacherFeedback);
        setRating(res.data.feedback.teacherRating);
      }
    });
  }, [appUser]);

  return (
    <div className="feedbackPage">
      <h1 className="feedback_page">Feedback Page</h1>
      <br />
      <div>
        <textarea
          type="text"
          placeholder="enter your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <br />
        <StarRating rating={rating} setRating={setRating} />
        {/* <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          name="rating"
          id="rating"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select> */}
        <br />
        <button onClick={handleFeedback} type="button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
