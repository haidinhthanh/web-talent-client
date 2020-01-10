import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {ai,d,jc,bc,m,fs,ff,csr,lets,texi,clr,hov,act,texd,h,w,lst,pos,flew,fle,pad, fled} 
    from "../../styles/themes";
import { css } from "aphrodite";
import {FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon} from "react-share";

class NavBar extends Component{
    render(){
        return (
            <div className ={css(h.md,d.flex, w.w_100,)}>
                <div className = {css(h.h_100, ai.c, flew.w, d.flex,w.w_100) } >
                    <nav
                        className = {css(fle.flex_1, m.mg_l_md)}
                    >
                        
                        <NavLink
                            exact
                            activeClassName={css(ai.c,pad.p_lr_sm, texd.none,fs.esm, ff.Roboto, csr.pointer, lets.sm, texi.sm, clr.black, hov.trans_color_blue, act.trans_color_blue)}
                            className={css(ai.c,pad.p_lr_sm, texd.none,fs.esm, ff.Roboto, csr.pointer,lets.sm, texi.sm, clr.black, hov.trans_color_blue)}
                            to="/"
                        >
                            Home
                        </NavLink>
                        <NavLink
                            activeClassName={css(ai.c,pad.p_lr_sm, texd.none,fs.esm, ff.Roboto, csr.pointer, lets.sm, texi.sm, clr.black, hov.trans_color_blue, act.trans_color_blue)}
                            className={css(ai.c,pad.p_lr_sm, texd.none,fs.esm, ff.Roboto, csr.pointer,lets.sm, texi.sm, clr.black, hov.trans_color_blue)}
                            to="/about"
                        >
                            About
                        </NavLink>
                        <NavLink
                            activeClassName={css(ai.c,pad.p_lr_sm, texd.none,fs.esm, ff.Roboto, csr.pointer, lets.sm, texi.sm, clr.black, hov.trans_color_blue, act.trans_color_blue)}
                            className={css(ai.c,pad.p_lr_sm, texd.none,fs.esm, ff.Roboto, csr.pointer,lets.sm, texi.sm, clr.black, hov.trans_color_blue)}
                            to="/contact"
                        >
                            Contact
                        </NavLink>
                    </nav>
                    <nav className={css(m.mg_l_auto)}>
                        <ul className={css(pad.p_lr_sm,d.flex)}>
                            <li className={css(lst.none, d.inline, pad.p_lr_sm, d.flex)}>
                                <a href="https://talentvietnam.netlify.com" className={css(hov.trans_color_blue,clr.black)}>
                                    <FacebookShareButton url={"https://talentvietnam.netlify.com"}>
                                        <FacebookIcon size={32} borderRadius={20}/>
                                    </FacebookShareButton>
                                </a>
                            </li>
                            <li className={css(lst.none, d.inline, pad.p_lr_sm, d.flex)}>
                                <a href="https://talentvietnam.netlify.com" className={css(hov.trans_color_blue,clr.black)}>
                                    <TwitterShareButton url={"https://talentvietnam.netlify.com"}>
                                        <TwitterIcon size={32} borderRadius={20}></TwitterIcon>
                                    </TwitterShareButton>
                                </a>
                            </li>
                        </ul>]
                    </nav>
                </div>
            </div>
        )
    }
}
export default NavBar;

