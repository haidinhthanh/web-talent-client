import React,{Component} from "react";
import Header from "../Header";
import Routes from "../../routes";
import SideBar from "../../component/SideBar";
import Footer from "../../containers/Footer";
import {BrowserRouter, Router} from "react-router-dom";
import { Provider } from "react-redux";
// import store from "../../store";
import {css} from "aphrodite";
import { d, fled, w, ovfl, h } from "../../styles/themes";
import { PersistGate } from 'redux-persist/lib/integration/react';
import {persistor, store } from '../../store';
import history from "../History";
import LoadingView from "../LoadView";
class App extends Component{
    render(){
        return(
            <Provider store={store} >
                <PersistGate loading={<LoadingView />} persistor={persistor}>
                    <Router history={history}>
                        <div className={css(d.flex, fled.c, w.w_100, h.h_100)}
                        >
                            <Header/>
                            <Routes/>
                            <Footer/>
                            <SideBar/>
                        </div>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}

export default App;