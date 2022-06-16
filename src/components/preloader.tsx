import React from "react";
import style from "./blocks/preloaders.module.css";
import preloader from "../assets/images/preloader.svg";

type Props = {
	isFetching: boolean;
};

const Preloader = ({ isFetching }: Props) => {
	return (
		<>
			{isFetching && (
				<div className={style.preloader__bg}>
					<img
						className={style.preloader}
						src={preloader}
						alt='preloader'
					/>
				</div>
			)}
		</>
	);
};

export default Preloader;
