import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import { NavLink } from "react-router-dom";

export default function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </section>
  );
}
