import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Post } from "../types";
import DepartmentSelection from "../components/DepartmentSelection"

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      alert("Please enter your details before accessing this page.");
      navigate("/");
    } else {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 600 },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Posts
      </Typography>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </div>

      <DepartmentSelection />
    </Container>
  );
};

export default SecondPage;
