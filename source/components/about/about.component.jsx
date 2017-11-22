import React,{Component} from 'react';

const List = (props)=>{
    const users = props.users;
    const listItems = users.map((user) =>
        <li><h2>{user}</h2></li>
    );
    return (
        <ul>{listItems}</ul>
    );
}

class About extends Component {
    render(){
        const users = ["Gates","Jack","Bush","Obama","Mike"]
        /*const listItems = users.map((user,index)=>
                <li key={index}><h2>Hello {user}</h2></li>
            )*/
        return(
            <div className="About">
                <div className="container">{/*
                    <h1>About page</h1>
                    <ul>{listItems}</ul>*/}
                    <List users={users}/>
                </div>
            </div>
        )
    }
}

export default About