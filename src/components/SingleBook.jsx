import { Card } from "react-bootstrap";

const SingleBook = (props) => {
  return (
    <>
      <Card
        onClick={() => {
          props.bookListState(props.book.asin);
        }}
        style={{ border: props.selected ? "3px solid red" : "none" }}
      >
        <Card.Img variant="top" src={props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{props.book.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleBook;
