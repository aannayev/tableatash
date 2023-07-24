import React from "react";
import { Table } from "antd";

const TableData = ({ data, loading, current, pageSize }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Body",
      dataIndex: "body",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
  ];

  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const dataSource = data.slice(startIndex, endIndex);

  return (
    <div>
      <Table
        dataSource={data.map((record) => ({ ...record, key: record.id }))}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default TableData;
