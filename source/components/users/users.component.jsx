import React,{Component} from 'react';
import $ from 'jquery';

class Users extends Component {

    constructor(props){
        //通过 props 到父组件
        super(props);
        this.state = {
        };
        this.getUserArr = this.getUserArr.bind(this);
        this.renderTable = this.renderTable.bind(this);
    }

    componentDidMount() {
        var self = this;
        let url = this.props.auth.apiUrl + "/get-users-list";
        fetch(url).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (parseInt(json.code) == 1) {
                console.log(json);
                var _userSet = self.getUserArr(json.data)
                self.renderTable(_userSet);
            }
        }), function (error) {

        }
    }

    getUserArr(userSet){
        var _userArr = userSet;
        var jsoncount =_userArr.length;
        var userData =  new Array();

        for(var i=0;i<jsoncount;i++)
        {
            var _arr = new Array();
            _arr[0]= _userArr[i].realName;
            _arr[1]= _userArr[i].nickName;
            if(parseInt(_userArr[i].gender)==1)
            {
                _arr[2]= "男";
            }
            if(parseInt(_userArr[i].gender)==0)
            {
                _arr[2]= "女";
            }
            _arr[3]= _userArr[i].phone;
            _arr[4]= _userArr[i].age;
            _arr[5]= _userArr[i].address;
            _arr[6]= '<button class="btn btn-default btn-sm"  data-toggle="modal" ' +
                'data-target="#editModal" onclick="edit(\''+_userArr[i]._id+'\')"> \
         <span class="glyphicon glyphicon-pencil"></span> \
      </button>  \
    <button class="btn btn-danger btn-sm" data-toggle="modal" \
     data-target="#deleteModal" onclick="edit(\''+_userArr[i]._id+'\')"> \
    <span class="glyphicon glyphicon-trash"></span> \
</button>'};
        userData[i]=_arr;

        return userData;
    }

    //渲染数据
    renderTable(userSet) {
        var columns=[
            { title: "姓名" },
            { title: "昵称" },
            { title: "性别" },
            { title: "手机号码" },
            { title: "出生年月" },
            { title: "地址" },
            { title: "操作",orderable: false }
        ];
        $('#example').DataTable(
            {
            data:userSet,
            columns: columns
        } );
    }

    render(){
        return(
            <div className="Users">
                <div className="container">
                    <section className="content">
                        <table id="example"
                               className="table table-striped table-bordered"
                               cellSpacing="0"
                               width="100%">
                        </table>
                       {/*  修改弹出框 */}
                        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <h4 className="modal-title" id="myModalLabel">修改个人信息</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form className="form-horizontal" name="editForm" id="editForm" action="/edit" method="post">
                                            <div className="form-group">
                                                <label htmlFor="realName" className="col-sm-2 control-label">姓名</label>
                                                <div className="col-sm-10">
                                                    <input type="text" name="realName"
                                                           className="form-control" id="realName"
                                                           placeholder="请输入真实姓名"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nickName" className="col-sm-2 control-label">昵称</label>
                                                <div className="col-sm-10">
                                                    <input type="text" name="nickName"
                                                           className="form-control" id="nickName"
                                                           placeholder="请输入昵称"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="gender" className="col-sm-2 control-label">性别</label>
                                                <div className="col-sm-10">
                                                    <input type="radio" name="gender" id="male" value="1"/>
                                                    <label htmlFor="" name="gender">男</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <input type="radio" name="gender" id="famale" value="0"/>
                                                    <label htmlFor="" name="gender">女</label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phoneNumber" className="col-sm-2 control-label">手机号码</label>
                                                <div className="col-sm-10">
                                                    <input type="number" name="phone"
                                                           className="form-control"
                                                           id="phoneNumber"
                                                           placeholder="请输入手机号码"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="age" className="col-sm-2 control-label">年龄</label>
                                                <div className="col-sm-10">
                                                    <input type="number" name="age"
                                                           className="form-control" id="age"
                                                           placeholder="请输入年龄"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="address" className="col-sm-2 control-label">地址</label>
                                                <div className="col-sm-10">
                                                    <input type="text" name="address"
                                                           className="form-control" id="address"
                                                           placeholder="请输入通讯地址"/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                                <button type="button" className="btn btn-primary">修改</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 删除弹出框 */}
                        <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                        <h4 className="modal-title" id="myModalLabel">删除</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form className="form-horizontal" action="/users/delete-user" method="POST">
                                            <div className="alert alert-danger" role="alert">
                                                是否确定删除该条个人信息
                                            </div>
                                            <div className="form-group">
                                                <div className="col-sm-10">
                                                    <input type="hidden" name="_id" className="form-control" id="userId"/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
                                                <button type="submit" className="btn btn-danger">删除</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Users