import React, {Component} from 'react';
import 'whatwg-fetch';

import UploadFile from '../upload-file/upload-file.component.jsx';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: localStorage.getItem("username"),
            profilePictureUrl: '',
            remoteUrl: this.props.auth.remoteHost
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRealNameBlur = this.handleRealNameBlur.bind(this);
        this.editUserData = this.editUserData.bind(this);
    }

    componentDidMount() {
        var self = this;
        let url = `${this.props.auth.apiUrl}/profile/${this.state.userid}`
        fetch(url).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (parseInt(json.code) == 1) {
                console.log(json);
                self.setState({
                    userid: json.data._id,
                    realName: json.data.realName,
                    phone: localStorage.getItem('username'),
                    profilePictureUrl: self.props.auth.remoteHost + json.data.picture,
                    email: json.data.email,
                    nickName: json.data.nickName,
                    age: json.data.age,
                    address: json.data.address,
                    gender: json.data.gender
                });
            }
        }), function (error) {

        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleRealNameBlur(event) {
        const value = event.target.value;
        if (!validator.isLength(value, {min: 1, max: 12})) {
            this.setState({
                validator: {
                    invalidRealName: true
                }
            });
        }
        else {
            this.setState({
                validator: {
                    invalidRealName: false
                }
            });
        }
    }

    editUserData() {
        let {realName, gender, nickName, phone, email, age, address} = this.state;
        let strData = `realName=${realName}&gender=${gender}&nickName=${nickName}
                &phone=${phone}&email=${email}&age=${age}&address=${address}`;
        let url = this.props.auth.apiUrl + '/edit-profile';
        fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: strData
        }).then(function (response) {
            return response.json()
        }).then(function (json) {

            if (parseInt(json.code) == 1) {
                window.location.href = json.data.url;
            }
        }), function (error) {
        }
    }

    render() {

        let maleChecked = "";
        let famaleChecked = "";
        if (parseInt(this.state.gender) == 0) {
            famaleChecked = 'checked';
        }
        if (parseInt(this.state.gender) == 1) {
            maleChecked = 'checked';
        }

        return (
            <section className="profile container">
                <h3 style={{textAlign: 'center'}} className="h3">请填写详细信息</h3>
                <br/>

                <UploadFile auth={this.props.auth} picture={this.state.profilePictureUrl}/>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">姓名</label>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   placeholder="请输入姓名"
                                   name="realName"
                                   onChange={this.handleInputChange}
                                   onBlur={(e) => this.handleRealNameBlur(e)}
                                   value={this.state.realName}/>
                        </div>

                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">性别</label>
                        <div className="col-sm-9">
                            <div className="radioBtn">
                                <input type="radio"
                                       name="gender"
                                       value={1}
                                       onChange={this.handleInputChange}
                                       checked={maleChecked}/>
                                <label>男</label>
                                &nbsp;&nbsp;
                                <input type="radio"
                                       name="gender"
                                       value={0}
                                       onChange={this.handleInputChange}
                                       checked={famaleChecked}/>
                                <label>女</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">昵称</label>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   name="nickName"
                                   placeholder="请输入昵称"
                                   onChange={this.handleInputChange}
                                   value={this.state.nickName}/>
                        </div>

                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">手机号码</label>
                        <div className="col-sm-9">
                            <input type="tel"
                                   className="form-control"
                                   name="phone"
                                   placeholder="请输入手机号"
                                   readOnly
                                   value={this.state.phone}/>

                        </div>

                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">邮箱</label>
                        <div className="col-sm-9">
                            <input type="email"
                                   className="form-control"
                                   name="email"
                                   placeholder="请输入邮箱"
                                   onChange={this.handleInputChange}
                                   value={this.state.email}/>
                        </div>

                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">年龄</label>
                        <div className="col-sm-9">
                            <input type="number"
                                   className="form-control"
                                   name="age"
                                   placeholder="请输入年龄"
                                   onChange={this.handleInputChange}
                                   value={this.state.age}/>
                        </div>

                    </div>

                    <div className="form-group">
                        <label className="col-sm-2 control-label">地址</label>
                        <div className="col-sm-9">
                            <input type="text"
                                   className="form-control"
                                   name="address"
                                   placeholder="请输入地址"
                                   onChange={this.handleInputChange}
                                   value={this.state.address}/>

                        </div>


                    </div>
                    <div className="form-group" style={{textAlign: 'center'}}>
                        <button type="reset" className="btn btn-default">清空</button>
                        <button type="submit" className="btn btn-primary" onClick={this.editUserData}>保存</button>
                    </div>
                </form>
            </section>
        )
    }
}
