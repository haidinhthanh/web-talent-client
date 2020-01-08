import React,{Component} from "react";
import {css, StyleSheet} from "aphrodite";
import {d, w, bc, vi, tsi, tsf, fled, pos} 
from "../../styles/themes";
import NavBar from "../../component/NavBar";
import HeaderMenu from "../../component/HeaderMenu";
import SearchBar from "../../component/SearchBar";
import {connect} from "react-redux";

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            show: true,
            scrollPos: 0,
        }
    }
    render(){
        const {searchStas} = this.props
        return(
                <div className={css(d.flex,w.w_100, fled.c,)}>
                        <NavBar/>
                        <HeaderMenu/>
                        {
                            searchStas && 
                            <div style={{position:"fixed", top:0, right:0 , zIndex:10, width: "100%", height: "100%"}}>
                                <SearchBar></SearchBar>
                            </div>
                        }
                </div>
        )
    }
}
const mapStateToProps = state =>({
    searchStas: state.searchBar.isOpen
})

export default connect(mapStateToProps, null)(Header);