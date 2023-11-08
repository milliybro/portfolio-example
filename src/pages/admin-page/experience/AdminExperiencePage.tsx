import { Fragment, useEffect } from "react";
import {
  Form,
  Button,
  Flex,
  Input,
  Modal,
  Space,
  Table,
  Pagination,
} from "antd";
import { useForm } from "antd/es/form/Form";

import "./style.scss";
import { LIMIT } from "../../../constants";
import { useNavigate } from "react-router-dom";
import useExperience from "../../../states/adminExperience";
import { longDate } from "../../../utils/DataConvert";
const ExperiencePageAdmin = () => {
  const {
    total,
    loading,
    isModalOpen,
    //  active,
    //  totalPaginate,
    data,
    page,
    getData,
    editData,
    deleteData,
    SerachSkills,
    //  setActive,
    showModal,
    handleCancel,
    handleOk,
    handlePage,
  } = useExperience();

  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Work Name",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: "number") => <p>{longDate(date)}</p>,
    },
    {
      title: "Finish Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: "number") => <p>{longDate(date)}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data: string) => {
        return (
          <Space size="middle">
            <Button onClick={() => editData(data, form)} type="primary">
              Edit
            </Button>
            <Button
              onClick={() => deleteData(data)}
              type="primary"
              style={{
                backgroundColor: "red",
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Fragment>
      <section id="search">
        <div className="container">
          <div className="search-container"></div>
        </div>
      </section>
      <Table
        loading={loading}
        className="table"
        title={() => (
          <Flex justify="space-between" align="center" gap="20px">
            <h1>Experiences({total})</h1>
            <input
              onChange={(e) => SerachSkills(e)}
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <button className="modal-open" onClick={() => showModal(form)}>
              Add experiences
            </button>
          </Flex>
        )}
        pagination={false}
        dataSource={data}
        columns={columns}
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
        open={isModalOpen}
        title="Title"
        onCancel={handleCancel}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
          </>
        )}
      >
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={() => handleOk(form)}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Company Name"
            name="companyName"
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
            label="Work Name"
            name="workName"
            rules={[
              {
                required: true,
                message: "Please input skill name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input category description!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Start date"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please input category description!",
              },
            ]}
          >
            <input className="form-date" type="date" name="startDate" />
          </Form.Item>

          <Form.Item
            label="End date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please input category description!",
              },
            ]}
          >
            <input className="form-date" type="date" name="endDate" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button
              style={{
                width: "100%",
              }}
              type="primary"
              htmlType="submit"
            >
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default ExperiencePageAdmin;
