import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import { NavLink } from "react-router-dom";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
}) {
  return (
    <section className="profile">
      <Sidebar onEditProfile={onEditProfile} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </section>
  );
}
