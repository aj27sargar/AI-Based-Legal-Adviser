import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Header({
  setTasks,
  setIsAuthenticated,
  isAuthenticated,
  setTaskTitle,
}) {
  const [allTasks, setAllTasks] = useState([]);

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    fetchTasks();
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );
      setAllTasks(response.data.tasks);
      setTasks(response.data.tasks); // Update tasks with fetched tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: "true" }
      );
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterTasks = (filterType) => {
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = allTasks.filter((task) => task.status === "completed");
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = allTasks.filter((task) => task.status === "incomplete");
        setTaskTitle("Incomplete Tasks");
        break;
      case "archived":
        filteredTasks = allTasks.filter((task) => task.archived === true);
        setTaskTitle("Archived Tasks");
        break;
      case "all":
        filteredTasks = allTasks;
        setTaskTitle("Tasks");
        break;
      default:
        filteredTasks = allTasks;
    }
    setTasks(filteredTasks);
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${!isAuthenticated ? "d-none" : ""}`}
    >
      <Container>
        <Navbar.Brand href="#home">
          <h4>AI-Powered Legal Advisor Assistant</h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left aligned items */}
          <Nav className="me-auto" style={{ gap: "20px" }}>
            <Link
              to={"/"}
              className="text-decoration-none d-flex align-items-center link-light"
              style={{ marginRight: "20px" }}
            >
              Home
            </Link>
            <Link
              to={"/blogs"}
              className="text-decoration-none d-flex align-items-center link-light"
              style={{ marginRight: "20px" }}
            >
              Blogs
            </Link>
            <Link
              to={"/document-maker"}
              className="text-decoration-none d-flex align-items-center link-light"
              style={{ marginRight: "20px" }}
            >
              Document Maker
            </Link>
            <Link
              to={"/chatbot"}
              className="text-decoration-none d-flex align-items-center link-light"
              style={{ marginRight: "20px" }}
            >
              ChatBot
            </Link>

            {/* Task Filter Dropdown */}
            
          </Nav>

          {/* Right aligned items */}
          <Nav className="ms-auto" style={{ gap: "20px" }}>
            <Link
              to={"/profile"}
              className="text-decoration-none d-flex align-items-center link-light"
              style={{ marginRight: "20px" }}
            >
              Profile
            </Link>
            <Button
              className="bg-transparent border-0"
              style={{ width: "fit-content", color: "red" }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
