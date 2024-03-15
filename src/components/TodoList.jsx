import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Popconfirm,
  Dropdown,
  Menu,
} from 'antd'
import { addUser, deleteUser, updateUser } from '../app/todoSlice'
import { useState } from 'react'
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

export default function TodoList() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editData, setEditData] = useState(null)
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData)
  const [form] = Form.useForm()
  const { Option } = Select

  //modal
  const showModal = (user) => {
    setEditData(user)
    setIsModalVisible(true)
    form.setFieldsValue(user)
  }

  const menu = (record) => (
    <Menu>
      <Menu.Item key='1' onClick={() => showModal(record)}>
        <EditOutlined /> Edit
      </Menu.Item>
      <Menu.Item key='2'>
        <Popconfirm
          title='Sure to delete?'
          onConfirm={() => dispatch(deleteUser(record.id))}
        >
          <DeleteOutlined /> Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  )


  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editData) {
          dispatch(updateUser({ ...values, id: editData.id }))
        } else {
          dispatch(addUser(values))
        }
        setIsModalVisible(false)
        setEditData(null)
        form.resetFields()
      })
      .catch((info) => {
        console.log('Validate Failed:', info)
      })
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    setEditData(null)
    form.resetFields()
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
    },
    {
      title: 'Patronymic',
      dataIndex: 'patronymic',
      key: 'patronymic',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button>
  <MoreOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ]

  return (
    <div className='App' >
      <Table columns={columns} dataSource={userData} rowKey='id'  />
      <Button type='default' onClick={() => showModal(null)}>
        Add User
      </Button>
      <Modal
        title={editData ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' initialValues={{ gender: 'male' }}>
          <Form.Item name='name' label='Name' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name='surname'
            label='Surname'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='patronymic' label='Patronymic'>
            <Input />
          </Form.Item>
          <Form.Item name='gender' label='Gender'>
            <Select>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
