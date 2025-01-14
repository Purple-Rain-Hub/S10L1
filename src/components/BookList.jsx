import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";
import { useState } from "react";

const BookList = (props) => {
  // state = {
  //   searchQuery: "",
  //   selectedAsin: "",
  // };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsin, setSelectedAsin] = useState("");

  const bookListState = (asin) => {
    // this.setState({
    //   selectedAsin: asin,
    // });
    setSelectedAsin(asin);
  };

  const showCard = (b) => {
    if (b.asin == selectedAsin) {
      return (
        <Col xs={4} key={b.asin}>
          <SingleBook book={b} bookListState={bookListState} selected={true} />
        </Col>
      );
    } else {
      return (
        <Col xs={4} key={b.asin}>
          <SingleBook book={b} bookListState={bookListState} selected={false} />
        </Col>
      );
    }
  };

  return (
    <>
      <Row>
        <Col xs={8} className=" border-end border-2 border-black">
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={4} className="text-center">
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={searchQuery}
                  onChange={(e) =>
                    // this.setState({ searchQuery: e.target.value })
                    {
                      setSearchQuery(e.target.value);
                    }
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2 mt-3">
            {props.books
              .filter((b) => b.title.toLowerCase().includes(searchQuery))
              .map((b) => showCard(b))}
          </Row>
        </Col>
        <Col>
          {selectedAsin == "" ? (
            console.log("ciao")
          ) : (
            <CommentArea asin={selectedAsin} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default BookList;
