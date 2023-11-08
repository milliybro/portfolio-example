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

import { useNavigate } from "react-router-dom";
import { LIMIT } from "../../constants";
import useSkills from "../../states/adminSkills";
const EducationPageAdmin = () => {
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
  } = useSkills();

  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
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
            <h1>Education({total})</h1>
            <input
              onChange={(e) => SerachSkills(e)}
              type="text"
              className="search-input"
              placeholder="Search..."
            />
            <button className="modal-open" onClick={() => showModal(form)}>
              Add education
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
      {/* {totalPaginate > 1 ? (
        <section id="pagination">
          <div className="container">
            <div className="pagination-btns">
              <button
                disabled={active === 1 ? true : false}
                onClick={() => {
                  setActive(active - 1);
                }}
              >
                {"<"}
              </button>
              <span>{active}</span>
              <button
                disabled={totalPaginate === active ? true : false}
                onClick={() => {
                  setActive(active + 1);
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        </section>
      ) : null} */}
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
            label="Name"
            name="name"
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
            label="Percent"
            name="percent"
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

export default EducationPageAdmin;
