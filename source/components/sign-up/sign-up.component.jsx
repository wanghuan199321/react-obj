import React, {Component} from 'react';
import 'whatwg-fetch';

class Signup extends Component {
    constructor(props){
        //通过 props 到父组件
        super(props);
        this.state = {
            captchaUrl: this.props.auth.captchaUrl,
            phone:'',
            password:'',
            isRemenber:false,
            Signin:false,
            captcha: '',
            validator:{ }
        };
        this.getCaptcha = this.getCaptcha.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePhoneBlur = this.handlePhoneBlur.bind(this);
        this.handlePwdBlur = this.handlePwdBlur.bind(this);
        this.Signup = this.Signup.bind(this);
    }

    getCaptcha() {
        this.setState({
            captchaUrl: this.props.auth.captchaUrl+'?t='+ Date.now()+ Math.random(),
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handlePhoneBlur(event) {
        const value = event.target.value;
        if(!validator.isMobilePhone(value,'zh-CN')){
            this.setState({validator: {
                invalidPhone: true }}) ;
        }
        else
        {
            this.setState({validator: {
                invalidPhone: false}}) ;
        }
    }
    handlePwdBlur(event) {
        const value = event.target.value;
        if(!validator.isLength(value,{min: 6, max: 20})){
            this.setState({validator: {
                invalidPwd: true
            }}) ;
        }
        else {
            this.setState({validator: {
                invalidPwd: false}}) ;
        }
    }
    handlePwd2Blur(event) {
        const value = event.target.value;
        if(! (value == this.state.password) ){
            this.setState({validator: {
                invalidPwd2: true
            }})
        }
        else{
            this.setState({validator: {
                invalidPwd2:false
            }})
        }
    }

    Signup(){
        let {phone,password,captcha} = this.state;
        let strData = `phone=${phone}&pwd=${password}&captcha=${captcha}`;
        let url = this.props.auth.apiUrl+'/signup';
        alert(strData);
        fetch(url, {
            method: "post",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: strData
        }).then(function(response){
        return response.json()
        }).then(function(json) {
            if(parseInt(json.code)==1) {
                alert(json.data);
                let phone = json.data;
                localStorage.setItem('username',phone);
                window.location.href = "/";
            }
        }),function(error){
        }
    }

    render() {
        return (
            <div className="Signup">
                <div className="container">
                    <div className="modal fade" id="signup" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <h4 className="modal-title" id="myModalLabel">注册</h4>
                                </div>
                                <div className="modal-body">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label htmlFor="phone" className="col-sm-2 control-label">手机号</label>
                                            <div className="col-sm-10">
                                                <input type="number"
                                                       name="phone" id="phone"
                                                       className="form-control"
                                                       placeholder="请输入手机号"
                                                       onChange={this.handleInputChange}
                                                       value={this.state.phone}
                                                       onBlur={(e) =>this.handlePhoneBlur(e)}/>
                                                { this.state.validator.invalidPhone ?
                                                <div id="phone-msg" className="alert alert-danger" role="alert">手机号码输入不正确</div>
                                                : ""}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">密码</label>
                                            <div className="col-sm-10">
                                                <input type="password"
                                                       name="password"
                                                       className="form-control"
                                                       id="inputPassword1"
                                                       placeholder="请输入密码"
                                                       onChange={this.handleInputChange}
                                                       value={this.state.password}
                                                       onBlur={(e) =>this.handlePwdBlur(e)}/>
                                                { this.state.validator.invalidPwd ?
                                                    <div id="password-msg" className="alert alert-danger" role="alert">
                                                        密码输入不正确</div>
                                                : "" }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">确认密码</label>
                                            <div className="col-sm-10">
                                                <input type="password"
                                                       name="pwd2" id="pwd2"
                                                       className="form-control"
                                                       placeholder="再次输入密码"
                                                       onBlur={(e) =>this.handlePwd2Blur(e)}/>
                                                { this.state.validator.invalidPwd2 ?
                                                <div id="password1-msg" className="alert alert-danger" role="alert">两次密码不一致</div>
                                                : "" }
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 control-label">验证码</label>
                                            <div className="col-sm-3">
                                                <input type="text" name="captcha" className="form-control " id="captcha"
                                                       placeholder="填写验证码" onChange={this.handleInputChange}/>
                                                <div id="captcha-msg" className="alert alert-danger" role="alert">验证码输入不正确</div>
                                            </div>
                                            <img className="col-sm-3" src={this.state.captchaUrl} alt="" id="captchaImg"
                                                 onClick={this.getCaptcha.bind(this)}/>
                                            <span className="col-sm-4">看不清？点击图片换一张。不区分大小写</span>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                            <button type="submit" className="btn btn-primary" onClick={this.Signup}>注册</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Signup