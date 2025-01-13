import { Component } from "react";
import { Card } from "react-bootstrap";
// import CommentArea from "./CommentArea";

class SingleBook extends Component {
  render() {
    return (
      <>
        <Card
          onClick={() => {
            this.props.bookListState(this.props.book.asin);
          }}
          style={{ border: this.props.selected ? "3px solid red" : "none" }}
        >
          <Card.Img variant="top" src={this.props.book.img} />
          <Card.Body>
            <Card.Title style={{ color: "black" }}>
              {this.props.book.title}
            </Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default SingleBook;
