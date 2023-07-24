import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import TableData from "./components/TableData";
import Pagination from "./components/Pagination";
import api from "./api";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleSearch = (searchText) => {
    const filteredData = data.filter((record) =>
      Object.values(record).some((value) =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFilteredData(filteredData);
    setCurrentPage(1); // Reset current page when search is performed
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("/posts")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

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
    },
  ];

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.length
    ? filteredData.slice(startIndex, endIndex)
    : data.slice(startIndex, endIndex);

  return (
    <div className="App">
      <div className="center">
        <h1> Сектор Бизнеса</h1>
        <h4>
          {" "}
          Извините что не по дизайну, мне не очень верилось что вы меня возьмете
          и поэтому не стал делать вёрстку. Я использовал ant Design. Если вы
          всё ещё заинтересованы мной вот мой email: interstels@gmail.com
        </h4>
      </div>
      <div className="padding">
        <SearchBar onSearch={handleSearch} />
        <div className="table">
          <TableData
            data={currentData}
            columns={columns}
            loading={loading}
            pagination={false}
          />
        </div>
        <Pagination
          current={currentPage}
          total={filteredData.length || data.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default App;
