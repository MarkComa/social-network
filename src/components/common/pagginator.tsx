import { Pagination } from "antd";

type Props = {
	totalUsersCount: number;
  currentPage: number;
	pageSize: number;
  onPageChanged: (pageNumber: number) => void
};

const MyPagination = ({pageSize, totalUsersCount, currentPage, onPageChanged }: Props) => {
	return (
		<Pagination current={currentPage} onChange={onPageChanged} total={totalUsersCount} pageSize={pageSize} showSizeChanger={false} />
	);
};

export default MyPagination;




