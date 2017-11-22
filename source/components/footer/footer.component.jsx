import React, {Component} from 'react';
import {Link,NavLink} from 'react-router-dom';

class Footer extends Component {
    render(){
        return(
            <footer className="navbar navbar-default navbar-fixed-bottom">
                    <ul className="nav">
                        <li className="col-xs-3">
                            <NavLink to='/'>
                                <img src="./assets/images/home.png" alt=""/>
                                关于
                            </NavLink>
                        </li>
                        <li className="col-xs-3">
                            <NavLink to='/shop'>
                                <img src="./assets/images/shop.png" alt=""/>
                                商城
                            </NavLink>
                        </li>
                        <li className="col-xs-3">
                            <NavLink to='/comment'>
                                <img src="./assets/images/star.png" alt=""/>
                                关于
                            </NavLink>
                        </li>
                        <li className="col-xs-3">
                            <NavLink to='/my'>
                                <img src="./assets/images/my.png" alt=""/>
                                关于
                            </NavLink>
                        </li>
                    </ul>
            </footer>
        )
    }
}

export default Footer