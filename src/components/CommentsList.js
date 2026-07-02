const CommentsList = ({comments}) =>(
    <>
    <h3>Comment Section</h3>
    {comments.map(comment=>(
        <div className="commentsection" key={comment.postedby + comment.comment}>       
            <h4>{comment.postedby}</h4>
            <p>{comment.comment}</p>
        </div>
    ))}
    </>
);

export default CommentsList;