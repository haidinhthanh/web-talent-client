import React,{Component} from "react";
import {css} from "aphrodite";
import { pos, h, w, bc, zi, d, fled, jc, ff, fw, fs, text, lets, m, ai, clr, pad, b, lst, linh, ovfl } from "../../styles/themes";
import Close from "@material-ui/icons/Close";
import {connect} from "react-redux";
import SideBarItem from "../SideBarItem";
import { ocSideBar } from "../../store/actions/sidebar";
import {loadPost} from "../../store/actions/post";
import {server, api} from "../../assets/constant";
import axios from "axios";
class SideBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            cate:[
                {
                    name: "Category",
                    stas: 0,
                    lstItem: {}
                },
                {
                    name: "Feature",
                    stas: 0,
                    lstItem: {}
                },
                {
                    name: "Location",
                    stas: 0,
                    lstItem: {}
                },
            ]
        }
    }
    componentDidMount(){
        this.getAllPost()
    }
    
    onChangeStas = (key) => {
        var newState = this.state.cate.slice()
        newState[key].stas = !newState[key].stas
        this.setState({cate : newState})
    }

    getCateogoryObject = ()=>{
        var url = server.url + api.getAllCategory()
        axios.get(url).then(res =>{
            let cateObject = {}
            var newState = this.state.cate.slice()
            const items = res.data.data
            items.map((item)=>{
                cateObject[item.name] = item.no_post
            })
            newState[0].lstItem = cateObject
            this.setState({cate : newState})
        })
    }
    getPolicyObject = ()=>{
        var url = server.url + api.getAllTag()
        axios.get(url).then(res =>{
            let policyObject = {
                "Regime":0,
                "Salary": 0,
                "Environment": 0,
            }
            var newState = this.state.cate.slice()
            const items = res.data.data
            
            items.map((item)=>{
                policyObject[item.type] += item.no_post
            })
            newState[1].lstItem = policyObject
            this.setState({cate : newState})
        })
       
    } 
    getLocationObject = ()=>{
        var url = server.url + api.getAllLocation()
        axios.get(url).then(res =>{
            let locationObject = {
                "Việt Nam": 0,
                "World":0
            }
            var newState = this.state.cate.slice()
            const items = res.data.data
            
            items.map((item)=>{
                locationObject[item.type_world] += item.no_post
            
            })
            newState[2].lstItem = locationObject
            this.setState({cate : newState})
        })
       
    } 

    getAllPost=()=>{
        this.getCateogoryObject()
        this.getPolicyObject()
        this.getLocationObject()
    } 
    render(){
        const {cate} = this.state
        const {stas, onClose, posts} = this.props
        if(stas){
            return(
                <div className={css(pos.absolute, pos.t0,)}>
                <div className={css(d.flex,pos.fixed, zi.zi3, h.h_100, w.w_25, d.flex, fled.c, bc.white, ovfl.y_auto )}>
                    <div className={css(d.flex, fled.r, jc.sb, ai.c, h.md, pad.p_lr_md, pad.p_tb_esm, b.b_b_l)}>
                        <div className={css(ff.IBM, fw.w700, fs.md, lets.esm)}> Nhân tài</div>
                        <Close 
                            style={{fontSize:20, color: "#808080"}} 
                            onClick={()=>{
                                onClose({isOpen: false})
                            }}
                        />
                    </div>
                    <div className={css( d.flex, h.h_100, m.mg_l_lg, m.mg_r_lg)}>
                        <ul className={css(d.flex, fled.c,lst.none, w.w_100, pad.p0)}>
                        {
                            cate.map((item, index)=>{
                                return(<SideBarItem cateItem={item} key={index} onChangeStas={this.onChangeStas} id={index}/>)
                            })
                        }
                        </ul>
                    </div>
                </div>
                </div>
            )
        }
        else{
            return (<div/>)
        }
    }
}


const mapStateToProps = state =>({
    posts: state.loadPost.posts,
    stas: state.sideBar.isOpen,
})

const mapDispatchToProps = (dispatch) => {
    return {
      onClose: (payload) => {
        dispatch(ocSideBar(payload))
      },
      loadPost: (payload)=>{
        dispatch(loadPost(payload))
    }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideBar);