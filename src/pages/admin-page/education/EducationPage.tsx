import {
   Button,
   Flex,
   Form,
   Input,
   Modal,
   Pagination,
   Space,
   Table,
 } from "antd";
 import { Fragment, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 
 import "./style.scss";
import { LIMIT } from "../../../constants";
import { longDate } from "../../../utils/DataConvert";
import useEducationStore from "../../../states/adminEducation";
 
 const EducationPage = () => {
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
     data: education,
     showModal,
     closeModal,
     handleSearch,
     handlePage,
     handleOk,
     editData: editEducation,
     deleteData: deleteEducation,
     getData: getEducation,
   } = useEducationStore();
 
   useEffect(() => {
     getEducation();
   }, [getEducation]);
 
   const columns = [
     {
       title: "Education",
       dataIndex: "name",
       key: "name",
     },
     {
       title: "Level",
       dataIndex: "level",
       key: "level",
     },
     {
       title: "Description",
       dataIndex: "description",
       key: "description",
       render: (data: string) => (
         <p
           style={{
             marginBottom: "0px",
           }}
         >
           {data.slice(0, 40)}
         </p>
       ),
     },
     {
       title: "Started",
       dataIndex: "startDate",
       key: "startDate",
       render: (data: string) => <p>{longDate(data.split("T")[0])}</p>,
     },
     {
       title: "Finished",
       dataIndex: "endDate",
       key: "endDate",
       render: (data: string) => <p>{longDate(data.split("T")[0])}</p>,
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
                 title: "Do you want to delete this education info ?",
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
         dataSource={education?.data}
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
               <h1 className="skills-title">Education</h1>
               <Input
                 className="search-input"
                 value={search}
                 onChange={(e) => handleSearch(e, navigate)}
                 style={{ width: "auto", flexGrow: 1 }}
                 placeholder="Searching..."
               />
               <Button onClick={() => showModal(form)} type="dashed">
                 Add education
               </Button>
             </Flex>
             <div>
               <p className="search-result-text">
                 About <span>{total}</span> results match
               </p>
             </div>
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
         okText={selected === null ? "Add education" : "Save education"}
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
             label="Education"
             name="name"
             rules={[
               {
                 required: true,
                 message: "Please enter a brief description of education !",
               },
             ]}
           >
             <Input />
           </Form.Item>
 
           <Form.Item
             label="Level"
             name="level"
             rules={[
               {
                 required: true,
                 message: "Please enter your level !",
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
                 message: "Please enter a brief description !",
               },
             ]}
           >
             <Input.TextArea showCount maxLength={100} />
           </Form.Item>
 
           <Flex align="center" justify="space-between">
             <Form.Item
               label="Started"
               name="startDate"
               rules={[
                 {
                   required: true,
                 },
               ]}
             >
               <input className="date-picker" type="date" />
             </Form.Item>
             <Form.Item
               label="Finished"
               name="endDate"
               rules={[
                 {
                   required: true,
                 },
               ]}
             >
               <input className="date-picker" type="date" />
             </Form.Item>
           </Flex>
         </Form>
       </Modal>
     </Fragment>
   );
 };
 
 export default EducationPage;