import { Component } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedAsin: "",
  };

  bookListState = (asin) => {
    this.setState({
      selectedAsin: asin,
    });
  };

  render() {
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
                    value={this.state.searchQuery}
                    onChange={(e) =>
                      this.setState({ searchQuery: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {this.props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook book={b} bookListState={this.bookListState} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col>
            {this.state.selectedAsin == "" ? (
              console.log("ciao")
            ) : (
              <CommentArea asin={this.state.selectedAsin} />
            )}
            {console.log("renderizzandu", this.state.selectedAsin)}
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
