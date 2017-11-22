import React,{Component} from 'react';
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom';


import {config} from '../config/app.config.jsx';
import  Auth from '../service/auth.service.jsx';


import Home from './home/home.component.jsx';
import About from './about/about.component.jsx';
import  Footer from './footer/footer.component.jsx';
import Navigation from './navigation/navigation.component.jsx';
import SignIn from './sign-in/sign-in.component.jsx';
import SignUp from './sign-up/sign-up.component.jsx';
import Profile from './profile/profile.component.jsx';
import Users from "./users/users.component.jsx";


const auth = new Auth();
class Routing extends Component {

   
    render() {
        return(
            <HashRouter>
            <div>
                <Navigation auth={auth}/>
                <main>
                    <Route exact path="/"  render={(props) => <Home auth={auth} {...props} />} />
                    <Route path="/about"  render={(props) => <About auth={auth} {...props} />} />
                    <Route path="/users"  render={(props) => <Users auth={auth} {...props} />} />
                    <Route path="/Profile"  render={(props) => <Profile auth={auth} {...props} />} />
                 </main>
                <Footer />
                <SignIn auth={auth}/>
                <SignUp auth={auth}/>
            </div>
            
          </HashRouter>
        )
    }
}
export default Routing