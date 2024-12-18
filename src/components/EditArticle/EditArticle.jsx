import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { editArticle, setLoading } from '../../features/blogs/blogsSlice';
import { URL } from '../../utils/constants';
import FormArticle from '../FormArticle';

const EditArticle = () => {
  const [data, setData] = useState(null);
  const [tags, setTags] = useState([]);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(true));
    fetch(`${URL}/articles/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then(({ article }) => {
        setData(article);
        setTags(article.tagList);
      })
      .finally(dispatch(setLoading(false)));
  }, [dispatch, slug]);

  const onSubmit = (data) => {
    const newArticle = {
      article: {
        title: data.title,
        description: data.description,
        body: data.textarea,
        tagList: tags,
      },
    };

    dispatch(editArticle({ newArticle, slug }));
    navigate('/articles');
  };

  if (!data) return;

  return (
    <FormArticle
      title='Edit article'
      tags={tags}
      onSubmit={onSubmit}
      article={data}
      setTags={setTags}
    />
  );
};

export default EditArticle;
