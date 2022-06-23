import { DownloadOutlined } from "@ant-design/icons";
import { ChangeEventHandler } from "react";

export const DownloadFileBtn = ({ onChange }: Props) => {
	return (
		<div>
			<input name='input' id='input' type='file' onChange={onChange} />
			<label htmlFor='input'>
			<DownloadOutlined/>
				<div>Загрузить файл</div>
			</label>
		</div>
	);
};

interface Props {
	onChange: ChangeEventHandler<HTMLInputElement>;
}
