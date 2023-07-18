export const FigureUser = (user) => {
  return (
    <figure className="dataProfile">
      <img
        src={user.user.image}
        alt="user image"
        className="imageUser avatar"
      />
    </figure>
  );
};
