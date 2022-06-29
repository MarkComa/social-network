import { AntDesignOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

export const User = () => {
  return (
    <>
    <Avatar
    size={50}
    icon={<AntDesignOutlined />}
  />
    <span>User Name</span>
    </>
  )
}
