import { Table,Tag,Space, Tooltip } from 'antd';
import{EditOutlined,DeleteOutlined} from "@ant-design/icons";
export const data = {
    RelativesColumns: [
        {
          title: () => <Tooltip title="Name">Name</Tooltip>,
        
          dataIndex: 'name',
          key: 'name',
          sorter: {
            compare: (a, b) => a.name - b.name,
            multiple: 5,
          },
        },
        {
          title: 'Relation',
          dataIndex: 'relation',
          key: 'relation',
          sorter: {
            compare: (a, b) => a.relation - b.relation,
            multiple: 4,
          },
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          sorter: {
            compare: (a, b) => a.email - b.email,
            multiple: 3,
          },
        },
        {
          title: 'Phone',
          key: 'phone',
          dataIndex: 'phone',
          sorter: {
            compare: (a, b) => a.phone - b.phone,
            multiple: 2,
          },
        },
        {
            title: 'Verified',
            dataIndex: 'verified',
            key: 'verified',
            sorter: {
                compare: (a, b) => a.verified - b.verified,
                multiple: 1,
            },
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
                <EditOutlined className="edit-icon" onClick={()=>alert(`edit is clicked ${record.id}`)}/>
                <DeleteOutlined className="delete-icon" onClick={()=>alert(`delete is clicked ${record.id}`)}/>
            </Space>
          ),
        },
      ]
}