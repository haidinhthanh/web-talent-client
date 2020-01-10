import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from "../containers/Home"
import About from "../containers/About"
import Contact from "../containers/Contact"
import Category from "../containers/Category";
import PostView from "../containers/PostView";
import Location from "../containers/Location";
import Feature from "../containers/Feature";
import SearchPost from "../containers/SearchPost";
import ChartDashBoard from "../containers/ChartDashBoard";
import ChartViewDashBoard from "../containers/ChartViewDashBoard";
const Routes = () => {
    
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/category/:category" component={Category}/>
            <Route path="/view_post/:id" component={PostView}/>
            <Route path="/location/:location" component={Location}/>
            <Route path="/feature/:feature" component={Feature}/>
            <Route path="/analystic/Posts" component={ChartDashBoard}/>
            <Route path="/analystic/Views" component={ChartViewDashBoard}/>
            <Route path="/search/:url" component={SearchPost}/>
        </Switch>
        )
    }

export default Routes;