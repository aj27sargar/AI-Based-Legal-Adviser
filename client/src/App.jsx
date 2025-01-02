// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Navbar from "./components/Navbar";
// import Register from "./components/Register";
// import { Toaster } from "react-hot-toast";
// import axios from "axios";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import Blogs from './components/Blogs';
// import BlogDetail from './components/BlogDetail'; // Import the new component

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState({});
//   const [taskTitle, setTaskTitle] = useState("Tasks");

//   useEffect(() => {
//     const handleGetUser = async () => {
//       try {
//         const { data } = await axios.get(
//           "http://localhost:4000/api/v1/user/me",
//           { withCredentials: true }
//         );
//         setIsAuthenticated(true);
//         setUser(data.user);
//       } catch (error) {
//         console.log("USER IS NOT AUTHENTICATED!");
//         setIsAuthenticated(false);
//         setUser({});
//       }
//     };
//     handleGetUser();
//   }, [isAuthenticated]);

//   return (
//     <>
    
//       <Router>
//         <Navbar
//           setTasks={setTasks}
//           setIsAuthenticated={setIsAuthenticated}
//           isAuthenticated={isAuthenticated}
//           setTaskTitle={setTaskTitle}
//         />
//         <div>
//         <header>
//           <h1>AI-Powered Legal Advisor Assistant</h1>
//           <nav>
//             <ul>
//               <li><a href="/">Home</a></li>
//               <li><a href="/blogs">Blogs</a></li>
//               <li><a href="/chatbot">Legal Chatbot</a></li>
//               <li><a href="/document-maker">Document Maker</a></li>
//               {/* <li><a href="/add-blog">Add Blog</a></li>
//               <li><a href="/signup">Sign Up</a></li>
//               <li><a href="/login">Login</a></li> */}
//             </ul>
//           </nav>
//         </header>
//         </div>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Home
//                 isAuthenticated={isAuthenticated}
//                 tasks={tasks}
//                 setTasks={setTasks}
//                 taskTitle={taskTitle}
//               />
//             }
//           />
//           <Route
//             path="/register"
//             element={
//               <Register
//                 isAuthenticated={isAuthenticated}
//                 setIsAuthenticated={setIsAuthenticated}
//               />
//             }
//           />
//           <Route
//             path="/login"
//             element={
//               <Login
//                 isAuthenticated={isAuthenticated}
//                 setIsAuthenticated={setIsAuthenticated}
//               />
//             }
//           />
//           <Route
//             path="/profile"
//             element={<Profile user={user} isAuthenticated={isAuthenticated} />}
//           />
//            <Route path="/blogs" element={<Blogs />} />
//            <Route path="/blog-detail" element={<BlogDetail />} /> New route for blog detail
           
//         </Routes>
       

//         <Toaster />
//       </Router>
//     </>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail'; 
import Chatbot from './components/Chatbot';
import DocumentMaker from './components/DocumentMaker';
// import Footer from './components/Footer';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({});
  const [taskTitle, setTaskTitle] = useState("Tasks");
  const [loggedInUser, setLoggedInUser] = useState("");  // New state for loggedInUser

  useEffect(() => {
    const handleGetUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(data.user);
        setLoggedInUser(data.user.name); // Set the loggedInUser to the user's name
      } catch (error) {
        console.log("USER IS NOT AUTHENTICATED!");
        setIsAuthenticated(false);
        setUser({});
        setLoggedInUser("");  // Reset loggedInUser if not authenticated
      }
    };
    handleGetUser();
  }, [isAuthenticated]);

  return (
    <>
      <Router>
        <Navbar
          setTasks={setTasks}
          setIsAuthenticated={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
          setTaskTitle={setTaskTitle}
          loggedInUser={loggedInUser}  // Pass loggedInUser to Navbar
        />
        
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAuthenticated={isAuthenticated}
                tasks={tasks}
                setTasks={setTasks}
                taskTitle={taskTitle}
                loggedInUser={loggedInUser}  // Pass loggedInUser to Home
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setLoggedInUser={setLoggedInUser}  // Allow setting loggedInUser on register
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setLoggedInUser={setLoggedInUser}  // Allow setting loggedInUser on login
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile user={user} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog-detail" element={<BlogDetail />} />
          
          {/* Add Chatbot and DocumentMaker routes */}
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/document-maker" element={<DocumentMaker />} />
        </Routes>
        

        <Toaster />
        
      </Router>
      
    </>
  );
};

export default App;
