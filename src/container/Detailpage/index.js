import React, { Component } from 'react';
import Header from "../../components/header";
import ProductDetail from "./components/productDetail";
import "./style.scss";
import Loading from "../../components/loading";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import sr from "../../redux/modules/detailpage";

class Detailpage extends Component {
    render() {
        const { history, data, flag } = this.props;
        const { id } = this.props.match.params;
        return (
            <div className="detailPage">
                <Header title="商品详情" history={history} />
                <ProductDetail data={data} id={id} />
                <Loading is_show={flag} />
            </div>
        )
    }

    componentDidMount() {
        this.props.detailAction.loadData();
    }

}

const mapStateToProps = (state) => {
    return {
        data: sr.getters.getData(state),
        flag: sr.getters.getFlag(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        detailAction: bindActionCreators(sr.actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailpage);

