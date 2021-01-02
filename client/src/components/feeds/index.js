import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './style.scss';
import { getposts } from '../../redux/actions/post/post.actions'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import DisplayPosts from '../DisplayPosts/DisplayPosts';


class Feeds extends React.Component {

    componentDidMount() {
        this.props.getposts();
    }
    render() {
        return (

            <div className="feedWrapper">


                {this.props.loading ? (

                    <div style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}>
                        <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height={80}
                            width={80}

                        />

                    </div>
                ) :

                    <DisplayPosts posts={this.props.posts} user={this.props.currentUser} />}
            </div>


        )
    }
}

const mapDispatchToprops = {
    getposts
};
const mapstateToProps = ({ post, user }) => {
    return {
        posts: post.posts,
        loading: post.loading,
        currentUser: user.currentUser
    }
}

export default connect(mapstateToProps, mapDispatchToprops)(withRouter(Feeds));