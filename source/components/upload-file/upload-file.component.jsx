import React, {Component} from 'react';
import 'whatwg-fetch';

export default class UploadFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Phone : localStorage.getItem('username')
        };
        this.handleGetFile = this.handleGetFile.bind(this);
        this.submitFile = this.submitFile.bind(this);
        const now = new Date();
        this.year = now.getFullYear();
        this.month = now.getMonth();
        this.timestr = Date.now();
    }

    handleGetFile(e){
        this.files = e.target.files;
    }

    submitFile(){
        let url= `${this.props.auth.apiUrl}/upload-profile/${this.state.Phone}/${this.year}/${this.month}/${this.timestr}`;
        let file = this.files[0];
        var that =this;
        // console.log(file);
        if(this.files.length > 0) {

            var formData = new FormData();
            formData.append('photo', file, file.name);
            fetch(url, {method: "POST",
                headers:{'enctype': 'multipart/form-data'},
                body: formData
            }).then(function(response){
                return response.json()
            }).then(function(json) {
                console.log(that.props.picture);
                /*that.setState({
                    picture: that.props.auth.remoteHost + json.imgpath
                })*/
                // this.props.picture = that.props.auth.remoteHost + json.imgpath
                window.location.reload();
            }),function(error){

            }
        }
    }

    render() {
        return (
            <form className="form-horizontal"
                  encType="multipart/form-data"
                  method="POST">
                <div className="form-group">
                    <label htmlFor="fieldPhoto" style={{textAlign: 'right', padding: '0 30px 0 0'}}
                           className="col-sm-2 control-label">头像</label>
                    <img style={{width: '140px', height: '140px'}} className="img-thumbnail" src={this.props.picture}/>
                </div>
                <div className="form-group">
                    <label htmlFor="fieldPhoto" className="col-sm-2 control-label">更改头像</label>
                    <div className="col-sm-4">
                        <div className="file btn btn-success">
                            <span>选择文件..</span>
                            <input
                                type="file"
                                className="form-control"
                                required
                                id="photo"
                                name="photo"
                                onChange={this.handleGetFile}/>
                        </div>

                        <input type="hidden" name="uid"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-4">
                        <button type="button"
                                className="btn btn-primary"
                                onClick={this.submitFile}>上传
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

