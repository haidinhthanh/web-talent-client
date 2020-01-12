import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {loadPagePost, changeWebStas} from "../../store/actions/post";
import {css} from "aphrodite";
import { d, fled, lst, m, clr, ai, jc, ff, text, w, h, bc, pad, fs } from "../../styles/themes";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {server, api} from "../../assets/constant";
import axios from "axios";
const propTypes = {
    initialPage: PropTypes.number,
    pageSize: PropTypes.number
}

const defaultProps = {
    initialPage: 1,
    pageSize: 10
}

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    getPageItems= (no_posts, from, type, loc)=>{
        var pagePosts = []
        if(type=="home"){
            var url = server.url + api.getPopularPosts(no_posts, from)
            axios.get(url)
            .then(res => {
                pagePosts = res.data.data;
                this.props.loadPagePosts({
                    pagePosts: pagePosts
                })
                if(this.props.isFirstOpen){
                    this.props.changeWebStas({
                        isFirstOpen: false
                    })
                }
                else{
                    // this.props.parentFragement.scrollIntoView({behavior:"smooth"})
                }
            })
            .catch(error => console.log(error));
        }
        else if(type =="location"){
            var url = server.url + api.getPostByTypeLocation(loc, from, no_posts)
            axios.get(url)
            .then(res => {
                pagePosts = res.data.data;
                this.props.loadPagePosts({
                    pagePosts: pagePosts
                })
                this.props.parentFragement.scrollIntoView({behavior:"smooth"})
                
            })
            .catch(error => console.log(error));
        }
        else if(type =="feature"){
            var url = server.url + api.getPostsByTypeFeature(loc, from, no_posts)
            axios.get(url)
            .then(res => {
                pagePosts = res.data.data;
                this.props.loadPagePosts({
                    pagePosts: pagePosts
                })
                this.props.parentFragement.scrollIntoView({behavior:"smooth"})
            })
            .catch(error => console.log(error));
        }
        else if(type =="search"){
            var url = this.props.query
            var arr_url = url.split("/")
            var len_arr = arr_url.length
            arr_url[len_arr-2] = from
            arr_url[len_arr-1] = no_posts
            var new_url = arr_url.join("/")
            axios.get(new_url)
            .then(res => {
                pagePosts = res.data.data;
                this.props.loadPagePosts({
                    pagePosts: pagePosts
                })
                this.props.parentFragement.scrollIntoView({behavior:"smooth"})
            })
            .catch(error => console.log(error));
        }
        else if (type == "category"){
            var url = server.url + api.getPostByCategory(loc, from, no_posts)
            axios.get(url)
            .then(res => {
                pagePosts = res.data.data;
                this.props.loadPagePosts({
                    pagePosts: pagePosts
                })
                this.props.parentFragement.scrollIntoView({behavior:"smooth"})
                
            })
            .catch(error => console.log(error));
        }
        return pagePosts
    }

    componentDidMount() {
        if (this.props.noPosts) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.noPosts !== prevProps.noPosts)) {
            this.setPage(this.props.initialPage);
        }
    }
    setPage(page) {
        var { noPosts, pageSize, type, loc } = this.props;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        pager = this.getPager(noPosts, page, pageSize);
        this.getPageItems(pageSize,pager.startIndex, type, loc);
        this.setState({ pager: pager });
        // this.props.onChangePage({pagePosts : pageOfItems});
    }

    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        return (
            <ul className={css(d.flex, fled.r, lst.none, ai.c, jc.c, w.w_100, pad.p0, h.h_100)}>
                <li className={pager.currentPage === 1 ? css(d.none) : 
                    css(m.esm, clr.black)} 
                >
                    <a onClick={() => this.setPage(1)}><ArrowBackIcon/></a>
                </li>
                <li className={pager.currentPage === 1 ? css(d.none) : 
                    css(m.esm, clr.black, ff.Roboto, text.u)} 
                >
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 
                    css(w.md, h.md, bc.dodger_blue, clr.white, m.esm,) : 
                    css(w.md, h.md, bc.white, clr.black, m.esm)}>
                        <a onClick={() => this.setPage(page)} className={css(d.flex,w.w_100, h.h_100, jc.c, ai.c, fs.sm)}>
                            {page}
                        </a>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? css(d.none) : 
                    css(m.esm, clr.black, ff.Roboto, text.u)} 
                >
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li  className={pager.currentPage === pager.totalPages ? css(d.none) : 
                    css(m.esm, clr.black)} 
                    >
                    <a onClick={() => this.setPage(pager.totalPages)}><ArrowForwardIcon/></a>
                </li>
            </ul>
        );
    }
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
const mapStateToProps = state =>({
    pagePosts: state.pagePost.pagePosts,
    isFirstOpen: state.web.isFirstOpen,
    query: state.searchBar.query
})

const mapDispatchToProps = (dispatch) => {
    return {
        loadPagePosts: (payload)=>{
            dispatch(loadPagePost(payload))
        },
        changeWebStas: (payload)=>{
            dispatch(changeWebStas(payload))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
