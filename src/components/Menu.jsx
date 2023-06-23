import Chat from "../components/Chat/Chat"

export default function Menu({ user }) {
  return (
    <nav className="main-menu">
      <button className="main-menu__btn"></button>
      <button className="main-menu__btn"></button>
      <button className="main-menu__avatar">
        {user ? (
          <img src={user.avatar} alt={user.name} />
        ) : (
          <img src="../assets/defaultavatar/01.jpg" alt="avatar" />
        )}
      </button>
      <Chat />
      <button className="main-menu__btn"></button>
    </nav>
  );
}
