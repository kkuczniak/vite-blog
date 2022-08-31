import styles from '../styles/components/BlogPost.module.scss';

export interface IBlogPreviewProps {
  _id: string;
  title: string;
  headline: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  children: React.ReactNode;
}

const BlogPost: React.FunctionComponent<IBlogPreviewProps> = (props) => {
  const { _id, author, children, createdAt, updatedAt, headline, title } =
    props;
  return (
    <div className={styles.container}>
      <div className={`${styles.cyberBtn} ${styles.cyberBtnTop} `}>
        Cyber<span aria-hidden>_</span>
        <span aria-hidden className={styles.cyberBtn__updatedAt}>
          R25
        </span>
      </div>
      <div className={styles.flexContainer}>
        <div className={styles.title}>New Combat</div>
        <p className={styles.postText}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit
          consectetur commodi reprehenderit perspiciatis dignissimos, architecto
          ipsum consequatur nam in vero at dolore cumque repudiandae quasi!
        </p>
      </div>
      <div className={styles.bottomBtn}>
        <div className={`${styles.cyberBtn} ${styles.cyberBtnBottom} `}>
          Cyber<span aria-hidden>_</span>
          <span aria-hidden className={styles.cyberBtn__updatedAt}>
            R25
          </span>
        </div>
        <div className={`${styles.cyberBtn} ${styles.cyberBtnBottom} `}>
          Cyber<span aria-hidden>_</span>
          <span aria-hidden className={styles.cyberBtn__updatedAt}>
            R25
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
