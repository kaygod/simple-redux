import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from "../../components/header";
import Likes from "./components/likes";
import Recommends from "./components/recommends";
import Loading from "../../components/loading";
import { bindActionCreators } from 'redux';
import sr from "../../redux/modules/homepage";

class Homepage extends Component {

  jump = () => {
    this.props.history.push("/search")
  }

  render() {
    const { likes, recommends, loadingFlag, history } = this.props;
    return (
      <div className="home">
        <Header title="首页" goBack={false} history={history} goSearch={true} login={true} />
        <Likes likes={likes} history={history} />
        <Recommends recommends={recommends} history={history} />
        <Loading is_show={loadingFlag} />
      </div>
    )
  }

  componentDidMount() {

    const { homeAction } = this.props;

    homeAction.loadLikes({ page: 1 })
    homeAction.loadRecommends();

  }


}

const mapStateToProps = (state, props) => {
  return {
    likes: sr.getters.getLikes(state),
    recommends: sr.getters.getRecommends(state),
    loadingFlag: sr.getters.getLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    homeAction: bindActionCreators(sr.actions, dispatch)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);