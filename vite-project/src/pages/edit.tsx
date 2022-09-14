import { useContext, useEffect, useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { RouteComponentProps } from '@reach/router';
import UserContext from '../context/user';
import IPageProps from '../interfaces/page';
import axios from 'axios';
import config from '../config/config';
import logging from '../config/logging';
import IBlog from '../interfaces/blog';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const EditPage: React.FunctionComponent<
  IPageProps & RouteComponentProps<any>
> = async (props) => {
  const [_id, setId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [picture, setPicture] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [headline, setHeadline] = useState<string>('');
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const [saving, setSaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { user } = useContext(UserContext).userState;

  useEffect(() => {
    let blogID = props.match.params.blogID;
    if (blogID) {
      setId(blogID);
      getBlog(blogID);
    } else {
      setLoading(false);
    }
  }, []);

  const getBlog = async (id: string) => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${config.server.url}/blogs/read/${id}`,
      });
      if (response.status === 200 || response.status === 304) {
        if (user._id !== response.data.blog.author._id) {
          logging.warn('This blog is owned by another user');
          setId('');
        } else {
          let blog = response.data.blog as IBlog;
          setTitle(blog.title);
          setContent(blog.content);
          setHeadline(blog.headline);
          setPicture(blog.picture || '');

          const contentBlocks = htmlToDraft(blog.content);
          const contentState = ContentState.createFromBlockArray(
            contentBlocks.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);

          setEditorState(editorState);
        }
      } else {
        setError(`Unable to retrieve blog ${_id}`);
        setId('');
      }
    } catch (error) {
      error instanceof Error ? setError(error.message) : logging.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async () => {
    if (title === '' || headline === '' || content === '') {
      setError('Please fill out all fields.');
      setSuccess('');
      return null;
    }
    setError('');
    setSuccess('');
    setSaving(true);
  };
  try {
    const response = await axios({
      method: 'POST',
      url: `${config.server.url}/blogs/create`,
      data: {
        title,
        picture,
        headline,
        content,
        author: user._id,
      },
    });

    if (response.status === 201) {
      setId(response.data.blog._id);
      setSuccess('Blog posted.  You can continue to edit on this page.');
    } else {
      setError(`Unable to save blog.`);
    }
  } catch (error) {
    error instanceof Error ? setError(error.message) : logging.error(error);
  } finally {
    setSaving(false);
  }

  const editBlog = async () => {
    if (title === '' || headline === '' || content === '') {
      setError('Please fill out all fields.');
      setSuccess('');
      return null;
    }

    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await axios({
        method: 'PATCH',
        url: `${config.server.url}/blogs/update/${_id}`,
        data: {
          title,
          picture,
          headline,
          content,
        },
      });

      if (response.status === 201) {
        setSuccess('Blog updated.');
      } else {
        setError(`Unable to save blog.`);
      }
    } catch (error) {
      error instanceof Error ? setError(error.message) : logging.error(error);
    } finally {
      setSaving(false);
    }
  };

  return <p>Edit Page</p>;
};

export default EditPage;
