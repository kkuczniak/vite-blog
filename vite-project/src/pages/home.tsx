import axios from 'axios';
import { useEffect, useState } from 'react';
import BlogPost from '../components/BlogPost';
import Navigation from '../components/Navigation';
import config from '../config/config';
import logging from '../config/logging';
import IBlog from '../interfaces/blog';
import IPageProps from '../interfaces/page';
import styles from '../styles/home.module.scss';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    GetAllBlogs();
  }, []);

  const GetAllBlogs = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/blogs`,
      });
      if (response.status === 200 || response.status === 304) {
        let blogs = response.data.blogs as IBlog[];
        blogs.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt));
        setBlogs(blogs);
      }
    } catch (error) {
      logging.error(error);
      setError('Unable to get blogs');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  if (loading) {
    return <div>Loading</div>;
    //TODO: loading component
  }
  return (
    <div className={styles.container}>
      <Navigation />

      <section className={styles.BlogPostSection}>
        {blogs.length === 0 && <p>There are no blogs yet</p>}
        {blogs.map((blog, index) => {
          return (
            <div key={index}>
              <BlogPost />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
