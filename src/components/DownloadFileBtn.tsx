import { ChangeEventHandler } from "react";
import DownloadIcon from "../assets/images/iconsDownload.png";

export const DownloadFileBtn = ({ onChange }: Props) => {
	return (
		<div>
			<input name='input' id='input' type='file' onChange={onChange} />
			<label htmlFor='input'>
				<img src={DownloadIcon} alt='icon' />
				<div>Загрузить файл</div>
			</label>
		</div>
	);
};

interface Props {
	onChange: ChangeEventHandler<HTMLInputElement>;
}
