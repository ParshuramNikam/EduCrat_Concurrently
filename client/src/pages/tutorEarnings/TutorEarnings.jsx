import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppUserContext from "../../context/AppUserContext";
import { backendURL } from "../../data/vars";
import "./TutorEarnings.css";

const TutorEarnings = () => {
  const { appUser } = useContext(AppUserContext);

  const [orders, setOrders] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (appUser?._id) {
      axios
        .get(backendURL + "/api/orders/tutor/" + appUser._id)
        .then((res) => {
          console.log(res.data.gigBuyers.gigBuyers);
          setEarnings(0);

          setOrders(res.data.gigBuyers.gigBuyers);
          res.data?.gigBuyers?.gigBuyers.map((order) => {
            setEarnings(
              (prevEarning) =>
                prevEarning +
                (order?.gig_id?.pricing?.currentPrice
                  ? parseFloat(order.gig_id.pricing.currentPrice)
                  : parseFloat(order.gigPrice))
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [appUser]);

  return (
    <div className="tutor_earnings">
      <button className="category_page_back_btn" onClick={() => navigate(-1)}>BACK</button>
      <br />
      <br />
      <br />

      <div className="tutor_earnings_container">
        <div className="tutor_earnings_heading">
          <span>Earnings :</span>
        </div>
      </div>
      <div className="earnings_board">
        <div className="net_income">
          <div className="income_title">Net Income</div>
          <div className="income_value">$ {earnings}</div>
        </div>
      </div>
    </div>
  );
};

export default TutorEarnings;
