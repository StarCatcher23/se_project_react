import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onCardLike,
  onSignOut,
}) {
  return (
    <section className="profile">
      <aside className="profile__sidebar-panel">
        <h1 className="profile__heading">Profile</h1>
        <Sidebar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      </aside>

      <main className="profile__content">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </main>
    </section>
  );
}
