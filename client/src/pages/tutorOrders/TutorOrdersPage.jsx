import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable from "../../components/tutorDashboard/orders/OrderTable";
import "./TutorOrdersPage.css";

const TutorOrdersPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  return (
    <div className="tutor_orders_page">
      <div className="tutor_order_container page_container">
        <button className="category_page_back_btn" onClick={() => navigate(-1)}>BACK</button>
        <br />
        <br />
        
        <div className="tutor_order_title">Manage Orders</div>
        <div className="tutor_order_filters">
          <button
            className={activeTab === 1 && "tutor_order_filter_active"}
            onClick={(e) => setActiveTab(1)}
          >
            ACTIVE
          </button>
          {/* <button className={activeTab === 2 && 'tutor_order_filter_active'} onClick={(e) => setActiveTab(2)}>COMPLETED</button>
          <button className={activeTab === 3 && 'tutor_order_filter_active'} onClick={(e) => setActiveTab(3)}>CANCELED</button> */}
        </div>
        <hr />
        <OrderTable />
      </div>
    </div>
  );
};

export default TutorOrdersPage;
