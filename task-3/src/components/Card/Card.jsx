import "./Card.css";

function Card({ cardData }) {
  return (
    <div className="container">
      <div className="title">{cardData?.title}</div>
      <div className="price">{cardData?.price}</div>
    </div>
  );
}

export default Card;
