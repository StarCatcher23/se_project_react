import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import { NavLink } from "react-router-dom";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onCardLike,
}) {
  return (
    <section className="profile">
      <Sidebar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
        onCardLike={onCardLike}
      />
    </section>
  );
}
