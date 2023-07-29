import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import allCategories from "../../data/allCategories";
import Categories from "../Home/Categories/TopCategories";
import CategoryCard from "../studentDashboard/categories/categoryCard/CategoryCard";
import CardSwiper from "../swiper/CardSwiper";
import "./category.css";

const Category = () => {
  let { categoryId } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setData(allCategories[categoryId]);
    window.scrollTo(0, 0);
  }, []);

  return (

    <div className="category_page">

      <button className="category_page_back_btn" onClick={() => navigate("/dashboard")}>BACK</button>
      <br />
      <br />
      
      <div className="category_page_category_container">
        {data &&
          data.map((element, index) => (
            <Link to={"/category/" + element.title}>
              <CategoryCard key={index} name={element.title} image={element.image} />
            </Link>
          ))}
      </div>
      <CardSwiper mode={"gig-category"} category={categoryId} />
    </div>
  );
};

export default Category;
