import React from "react";

class Writer extends React.Component{
    addPost(e) {
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={ (e) => this.addPost(e) }>
                <p>
                    <textarea ref= {(input) => this.body = input} />
                    <br />
                    <button type="submit">Post</button>
                </p>
            </form>
        );
    }
}

export default Writer;