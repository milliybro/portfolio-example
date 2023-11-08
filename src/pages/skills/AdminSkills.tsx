import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Progress,
  Space,
  Table,
} from "antd";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import { LIMIT } from "../../constants";
import useSkillsStore from "../../states/adminSkills";

const AdminSkillsPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    loading,
    isModalLoading,
    selected,
    isModalOpen,
    search,
    total,
    page,
    data: skills,
    showModal,
    closeModal,
    handleSearch,
    handlePage,
    handleOk,
    editData: editEducation,
    deleteData: deleteEducation,
    getData: getEducation,
  } = useSkillsStore();

  useEffect(() => {
    getEducation();
  }, [getEducation]);

  const columns = [
    {
      title: "Skills Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
      render: (skills) => <Progress percent={skills} status="active" />,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editEducation(form, id)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this skills info ?",
                onOk: () => deleteEducation(id),
              })
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <Table
        className="skills-table"
        scroll={{
          x: 1000,
        }}
        pagination={false}
        loading={loading}
        dataSource={skills?.data}
        columns={columns}
        bordered={true}
        title={() => (
          <Fragment>
            <Flex
              className="table-title2"
              align="center"
              justify="space-between"
              gap={36}
            >
              <h1 className="skills-title">Skills({total})</h1>
              <Input
                className="search-input"
                value={search}
                onChange={(e) => handleSearch(e, navigate)}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="dashed">
                Add skills
              </Button>
            </Flex>
          </Fragment>
        )}
      />
      {total > LIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={LIMIT}
          current={page}
          onChange={(page) => handlePage(page, navigate)}
        />
      ) : null}
      <Modal
        title="Education info"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add skills" : "Save skills"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
      >
        <Form
          name="portfolio"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Skill"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Percent"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please enter your level !",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default AdminSkillsPage;
