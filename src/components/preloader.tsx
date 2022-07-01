import { Affix } from "antd";
import preloader from "../assets/images/preloader.svg";

type Props = {
	isFetching: boolean;
};

const Preloader = ({ isFetching }: Props) => {
	return (
		<Affix
		style={{ position: 'fixed', top: '50%', left: '50%', zIndex: 1000}}
		>
			{isFetching && (
				<div>
					<img src={preloader} alt='preloader' />
				</div>
			)}
		</Affix>
	);
};

export default Preloader;
