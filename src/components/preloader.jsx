import React from 'react'
import style from "./blocks/preloaders.module.css";
import preloader from "../assets/images/preloader.svg";

const Preloader = (props) => {
    return (
        <>
            {props.isFetching ? (
                <div className={style.preloader__bg}>
                    <img className={style.preloader} src={preloader} alt="preloader" />
                </div>
            ) : null}
        </>
    )
}

export default Preloader;