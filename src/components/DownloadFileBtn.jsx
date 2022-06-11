import React from "react";
import DownloadIcon from "../assets/images/iconsDownload.png";
import s from './blocks/downloadFileBtn.module.css'

export const DownloadFileBtn = ({onChange}) => {
	return (
		<div className={s.input}>
			<input className={s.input__file} name="input" id="input" type='file' onChange={onChange} />
			<label className={s.label} htmlFor="input">
				<img src={DownloadIcon} className={s.img} alt='icon'/>
				<div className={s.title}>Загрузить файл</div>
			</label>
		</div>
	);
};
