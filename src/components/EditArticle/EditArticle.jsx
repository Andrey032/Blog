import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { editArticle } from '../../features/blogs/blogsSlice';
import FormArticle from '../FormArticle';
import { useState } from 'react';

const EditArticle = () => {
  const { article } = useLoaderData();
  const [tags, setTags] = useState(article.tagList);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  if (!article) return;

  return (
    <FormArticle
      title='Edit article'
      tags={tags}
      onSubmit={onSubmit}
      article={article}
      setTags={setTags}
    />
  );
};

export default EditArticle;
