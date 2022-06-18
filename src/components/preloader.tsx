import preloader from "../assets/images/preloader.svg";

type Props = {
	isFetching: boolean;
};

const Preloader = ({ isFetching }: Props) => {
	return (
		<>
			{isFetching && (
				<div>
					<img src={preloader} alt='preloader' />
				</div>
			)}
		</>
	);
};

export default Preloader;
