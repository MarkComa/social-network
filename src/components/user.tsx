import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";

type Props = {
  login:  string | null
}

export const User = ({login}: Props) => {
	return (
		<Row>
			<Col lg={2} sm={4} xs={6}>
				<Avatar size={{sm: 45, md: 50, lg: 50, xl: 50, xxl:50}} icon={<AntDesignOutlined />} />
			</Col>
			<Col span={4} >
				<span style={{ color: "#fff" }}>{login}</span>
			</Col>
		</Row>
	);
};
