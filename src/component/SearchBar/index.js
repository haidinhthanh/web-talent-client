import React,{Component} from "react";
import { w, d, fled, h, m, fle, ff, fw, clr, jc, fs, linh, hov, texd, bc, ai, pos, zi, pad, b, lst,} from "../../styles/themes"
import {css, StyleSheet} from "aphrodite";
import {connect} from "react-redux";
import {ocSearchBar, saveSearchQuery, changeSearchStat} from "../../store/actions/seachbar";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DatePicker from "../../component/DatePicker";
import opacity from "../../styles/opacity";
import Selector from "../Selector";
import { server, api } from "../../assets/constant";
import axios from "axios";
import history from "../../containers/History";
import {Link} from "react-router-dom";
import { Redirect } from "react-router-dom";
const select_cate = ['Công nghệ', 'Giáo dục','Giải trí','Khoa học','Kinh tế','Pháp luật','Thế giới','Thể thao','Văn hóa','Xã hội', 'Y tế']
const select_loc =["Việt Nam", "World"]
const select_tag =["Salary", "Environment", "Regime"]

class SearhBar extends Component{
    constructor(props){
        super(props)
        // this.state={
        //     query: "",
        //     startDate: "",
        //     endDate: "",
        //     cate: [],
        //     tag: "",
        //     loc:  "",
        // }
    }
    render(){
        var {ocSearchBar, saveSearchQuery, query, text, changeSearchStat, startDate, endDate, cate, tag, loc} = this.props
        return(
            <div className={css(d.flex,w.w_100,h.h_100,jc.c, ai.c)} >
                <div className={css( pos.absolute, w.w_100, h.h_100, bc.black)} style={{opacity:0.5}}></div>
                <div className={css(w.w_40, opacity.o1, d.flex, fled.c, ai.c,bc.white, zi.zi3, pad.lg, b.br_45)}>
                    <div className={css(d.flex, w.w_100, ai.c,jc.sb, zi.zi3, )}>
                        <div className={css(fs.md, fw.w700, clr.black)}> Find :</div>
                        <TextField 
                            onChange = {(ev)=>{
                                changeSearchStat({text: ev.target.value})}} 
                            value = {text} 
                            style={{width: 250}}
                            name = "searchLink" />
                    </div>
                    <div className={css(d.flex, w.w_100, ai.c,jc.sb, zi.zi3)}>
                        <div className={css(fs.md, fw.w700, clr.black)}> StartDate :</div>
                        <div>
                            <DatePicker
                                time={startDate}
                                onChangeStas={(time)=>{
                                    changeSearchStat({startDate: time})
                                }}
                            />
                        </div>
                    </div>
                    <div className={css(d.flex, w.w_100, ai.c,jc.sb, zi.zi3)}>
                        <div className={css(fs.md, fw.w700, clr.black)}> End Date :</div>
                        <div>
                        <DatePicker
                                time={"2019-12-01T00:00:00"}
                                onChangeStas={(time)=>{
                                    changeSearchStat({endDate: time})
                                }}
                            />
                        </div>
                    </div>
                    <div className={css(d.flex, w.w_100, ai.c,jc.sb, zi.zi3, m.mg_b_sm)}>
                        <div className={css(fs.md, fw.w700, clr.black)}> Location :</div>
                        <div>
                        <Selector  name={"Location"} items={select_loc} onChangeStas={(type)=>{
                            changeSearchStat({loc: type})
                        }}/>
                        </div>
                    </div>   
                    <div className={css(d.flex, w.w_100, ai.c,jc.sb, zi.zi3,  m.mg_b_sm)}>
                        <div className={css(fs.md, fw.w700, clr.black)}> Category :</div>
                        <div>
                        <Selector  name={"Cate"} items={select_cate} onChangeStas={(type)=>{
                            changeSearchStat({cate: type})
                        }}/>
                        </div>
                    </div>       
                    <div className={css(d.flex, w.w_100, ai.c,jc.sb, zi.zi3,  m.mg_b_sm)}>
                        <div className={css(fs.md, fw.w700, clr.black)}> Tag :</div>
                        <div>
                        <Selector  name={"Tag"} items={select_tag} onChangeStas={(type)=>{
                            changeSearchStat({
                                tag: type
                            })
                        }}/>
                        </div>
                    </div>    
                    <div className={css(d.flex, w.w_100, ai.c,jc.sa, zi.zi3,  m.mg_b_sm)}>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={()=>{
                                    var url = api.searchPosts(text,this.getDayMonthYear(startDate).substring(0,10)+ "T00:00:00Z",this.getDayMonthYear(endDate).substring(0,10)+"T00:00:00Z", loc, cate, tag,0, 10)
                                    
                                    ocSearchBar({
                                        isOpen:false
                                    }) 
                                    changeSearchStat({
                                        query: server.url+ url
                                    })
                                    var arr_url = url.split("/")
                                    arr_url[0] = "q"
                                    url = arr_url.join("?")
                                    history.push({pathname: '/search/'+ url})                          
                                }}
                                >
                                Search
                            </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={()=>{
                                ocSearchBar({
                                    isOpen:false
                                })
                            }}>
                            Close
                        </Button>
                    </div>                
                </div>
            </div>
        )
    }
    redirectSearch = ()=>{
        return <Redirect to="/search"></Redirect>
    }
    getDayMonthYear= (dateObj)=>{
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var displayDay = day <10 ? '0'+ day: day
        var displayMonth = month < 10 ? '0'+month : month;
        return year + "-" + displayMonth + "-" + displayDay;
    }
}

const mapStateToProps = state =>({
    query: state.searchBar.query,
    text: state.searchBar.text,
    startDate: state.searchBar.startDate,
    endDate: state.searchBar.endDate,
    cate: state.searchBar.cate,
    tag: state.searchBar.tag,
    loc:  state.searchBar.loc
})

const mapDispatchToProps = (dispatch) => {
    return {
        ocSearchBar: (payload)=>{
            dispatch(ocSearchBar(payload))
        },
        saveSearchQuery: (payload)=>{
            dispatch(saveSearchQuery(payload))
        },
        changeSearchStat: (payload)=>{
            dispatch(changeSearchStat(payload))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearhBar)