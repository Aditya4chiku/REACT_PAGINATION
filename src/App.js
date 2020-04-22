import React from 'react';
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import Post from './Post';
import Pagination from './Pagination';

function App() {
  const [post, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [postsPerPage] = React.useState(10);
  React.useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data)
      setLoading(false)
    }
    fetchPosts();
  }, [])

  const indexOfLastPosts = currentPage * postsPerPage;
  const indexofFirstPosts = indexOfLastPosts - postsPerPage;
  const currentPosts = post.slice(indexofFirstPosts, indexOfLastPosts);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="App">
      <Post posts={currentPosts} loading={loading} />
      <Pagination postPerPage={postsPerPage} totalPosts={post.length} paginate={paginate} />
    </div>
  );
}

export default App;
