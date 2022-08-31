import BlogPost from '../components/BlogPost';
import Navigation from '../components/Navigation';
import IPageProps from '../interfaces/page';
import styles from '../styles/home.module.scss';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
  return (
    <div className={styles.container}>
      <Navigation />

      <section className={styles.BlogPostSection}>
        <BlogPost />
      </section>
    </div>
  );
};

export default HomePage;
