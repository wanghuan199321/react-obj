import React, {Component} from 'react';
import {Link,NavLink} from 'react-router-dom';
class Navigation extends Component {

    constructor(props){
        super(props);

        this.state = {
            phone: localStorage.getItem('username')
        };

        this._logOut = this._logOut.bind(this);
    }

    _logOut(){
        this.props.auth.logout();
    }

    render() {
        const {isLoggedIn}= this.props.auth;
        const isLogined = isLoggedIn();
        //alert("isLogined"+isLogined);
        const signinAndSignUpElement = (
            <ul className="nav navbar-nav navbar-right">
                <li><NavLink to='/' data-toggle="modal" data-target="#signin" className="smoothScroll">登录</NavLink></li>
                <li><NavLink to='/' data-toggle="modal" data-target="#signup" className="smoothScroll">注册</NavLink></li>
            </ul>
        );

        const signOutElement = (
            <ul className="nav navbar-nav navbar-right" >
                <li> <a  className="dropdown-toggle glyphicon glyphicon-user"
                         data-toggle="dropdown"> 你好 {localStorage.getItem('username')}
                    <span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu">
                        <li> <a data-toggle="modal" data-target="#pwdrestModal"
                                className="active">重置密码</a></li>
                        <li><NavLink to="/profile" className="active">个人中心</NavLink></li>
                        <li><NavLink to="/my-blog" className="active">我的博客</NavLink></li>
                        <li id="signout"> <a  onClick={this._logOut} className="active">
                            <span className="glyphicon glyphicon-log-out">&nbsp;</span>退出
                        </a></li>
                    </ul>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <NavLink to='/' className="navbar-brand">网站LOGO</NavLink>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li className="active"><NavLink to='/'>主页</NavLink></li>
                            <li><NavLink to='/about'>关于</NavLink></li>
                            <li><NavLink to='/users'>用户列表</NavLink></li>
                        </ul>
                        { isLogined ?signOutElement: signinAndSignUpElement}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation