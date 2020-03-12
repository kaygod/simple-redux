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

  /**
   * 测试同步操作
   */
  syncHanlder = () => {

    const { homeAction } = this.props;

    console.log(`同步操作前:${this.props.num}`);

    homeAction.countNum(2).then(() => {
      console.log(`同步操作后:${this.props.num}`);
    })

  }

  render() {
    const { likes, recommends, loadingFlag, history, num } = this.props;
    return (
      <div className="home">
        <Header title={`首页${num}`} goBack={false} history={history} syncHanlder={this.syncHanlder} />
        <Likes likes={likes} history={history} />
        <Recommends recommends={recommends} history={history} />
        <Loading is_show={loadingFlag} />
      </div>
    )
  }

  componentDidMount() {

    const { homeAction } = this.props;

    console.log('异步操作前:', this.props.likes);

    homeAction.loadLikes({ page: 1 }).then(() => {
      console.log('异步操作后:', this.props.likes);//执行完异步的回调
    })

    homeAction.loadRecommends();

  }


}

const mapStateToProps = (state, props) => {
  return {
    likes: sr.getters.getLikes(state),
    recommends: sr.getters.getRecommends(state),
    loadingFlag: sr.getters.getLoading(state),
    num: sr.getters.getNum(state)
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    homeAction: bindActionCreators(sr.actions, dispatch)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);