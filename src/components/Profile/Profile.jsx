import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import { NavLink } from "react-router-dom";

export default function Profile({ clothingItems, onCardClick }) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection onCardClick={onCardClick} clothingItems={clothingItems} />
    </section>
  );
}
