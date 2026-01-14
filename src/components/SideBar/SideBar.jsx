import "./SideBar.css";
import avatar from "../../assets/avatar.svg"; // adjust path as needed

export default function Sidebar() {
  const username = "Terrence Tegegne";
  const avatarSrc = avatar;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
