import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: true,
  //   isError: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function funcEffect() {
      try {
        let response = await fetch(
          "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVjMDAwNWQyMjA3MTAwMTVkZTJmNTQiLCJpYXQiOjE3MzY3NzYxMjgsImV4cCI6MTczNzk4NTcyOH0.0p9MF4Q9j3h3YMpsqz8w9PqVX3ikVZlbPJpfLBIsZwE",
            },
          }
        );
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          // this.setState({ comments: comments, isLoading: false, isError: false });
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          // this.setState({ isLoading: false, isError: true });
          setIsLoading(false);
          setIsError(true);
        }
      } catch (error) {
        console.log(error);
        // this.setState({ isLoading: false, isError: true });
        setIsLoading(false);
        setIsError(true);
      }
    }
    funcEffect();
  }, [props.asin]);

  return (
    <div className="text-center" data-testid="commentArea element">
      {isLoading && <Loading />}
      {isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
