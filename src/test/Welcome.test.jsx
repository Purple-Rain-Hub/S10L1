import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Welcome from "../components/Welcome.jsx";
import BookList from "../components/BookList.jsx";
import fantasy from "../data/fantasy.json";
import CommentArea from "../components/CommentArea.jsx";
// import SingleBook from "../components/SingleBook.jsx";

describe("testing Welcome mounting", () => {
  it("mounts correctly", () => {
    render(<Welcome />);
    const h1 = screen.getByText("Benvenuti in EpiBooks!");
    expect(h1).toBeInTheDocument();
  });
});

describe("testing cards behavior", () => {
  it("mounts all the cards", () => {
    render(<BookList books={fantasy} />);
    const cards = screen.getAllByTestId("card element");
    expect(cards).toHaveLength(fantasy.length);
  });
  it("filters the cards", () => {
    render(<BookList books={fantasy} />);
    const filterInput = screen.getByPlaceholderText("Cerca un libro");
    fireEvent.change(filterInput, { target: { value: "AMErican" } });
    const cards = screen.getAllByTestId("card element");
    fireEvent.change(filterInput, { target: { value: "witcher" } });
    const cards2 = screen.getAllByTestId("card element");

    expect(cards.length).toBe(1);
    expect(cards2.length).toBe(3);
  });
  it("add red border to selected cards", () => {
    render(<BookList books={fantasy} />);
    const card = screen.getAllByTestId("card element2");
    fireEvent.click(card[0]);
    expect(card[0]).toHaveProperty(["style", "border"], "3px solid red");
  });
  it("removes red border when selecting another card", () => {
    render(<BookList books={fantasy} />);
    const card = screen.getAllByTestId("card element2");
    fireEvent.click(card[0]);
    fireEvent.click(card[1]);
    expect(card[0]).not.toHaveProperty(["style", "border"], "3px solid red");
  });
  it("doesn't show comments when no card is selected", () => {
    render(<BookList books={fantasy} />);
    const comment = screen.queryAllByTestId("comment element");
    expect(comment.length).toBe(0);
  });
  it("shows ratings when book is selected", async () => {
    render(<BookList books={fantasy} />);
    const card = screen.getAllByTestId("card element2");
    fireEvent.click(card[0]);
    const comment = await screen.findAllByTestId("comment element");
    expect(comment.length).toBeGreaterThan(0);
  });
});

describe("testing CommentArea mounting", () => {
  it("mounts correctly", () => {
    render(<CommentArea />);
    const commentAreaDiv = screen.getByTestId("commentArea element");
    expect(commentAreaDiv).toBeInTheDocument();
  });
});

// describe("testing red style on selected cards", () => {
//   it("adds red style to card when selected", () => {
//     render(
//       <SingleBook
//         book={fantasy[0]}
//         bookListState={}
//         selected={false}
//       />
//     );
//     const card = screen.getByTestId("card2 element");
//     fireEvent.click(card);
//     expect(card).toHaveProperty(["style, border"], "3px solid red");
//   });
// });
