import "./ContentButton.css"

const PlaylistButton = (data) => {
    return (
    <>
      <button className="content-button">{data.data}</button>
    </>
  );
};

export default PlaylistButton;