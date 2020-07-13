import React from "react";

class Post extends React.Component{
    render() {
        return (
            <div>
                <p className="author">{this.props.post.author}</p>
                <p>{this.props.post.contents}</p>
                <p className="data">{this.props.post.time}</p>
            </div>
        );
    }   
}

export default Post;