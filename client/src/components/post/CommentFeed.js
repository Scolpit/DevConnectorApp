import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentItem from "./CommentItem";

export class CommentFeed extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired
  };

  render() {
    const { comments, postId } = this.props;

    return (
      <div className="comments">
        {comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={postId} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(CommentFeed);
