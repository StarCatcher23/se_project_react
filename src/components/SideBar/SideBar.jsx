import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Sidebar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">{currentUser?.name}</p>
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="sidebar__avatar"
        />
      </div>

      <button className="sidebar__edit-btn" onClick={onEditProfile}>
        Edit profile
      </button>

      <button className="sidebar__signout-btn" onClick={onSignOut}>
        Sign out
      </button>
    </aside>
  );
}
