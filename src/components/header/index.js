import "./style.scss";

import React, { Component } from 'react';

export default class Header extends Component {

    static defaultProps = {
        title: "公共头部",
        goBack: true,
        goSearch: false,
        login: false
    }

    goBack = () => {
        this.props.history.goBack();
    }

    syncHanlder = () => {
        this.props.syncHanlder();
    }


    render() {

        const { title, goBack, syncHanlder } = this.props;

        return (
            <div className="header">
                {
                    goBack ? (<div className="back" onClick={this.goBack}>Back</div>) : null
                }
                <div className="content">
                    {title}
                </div>
                {
                    syncHanlder ? (<div className="search" onClick={this.syncHanlder}>点击</div>) : null
                }
            </div>
        );
    }
}