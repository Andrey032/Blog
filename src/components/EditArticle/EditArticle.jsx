import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { editArticle, oneArticleSelector } from '../../features/blogs/blogsSlice';
import FormArticle from '../FormArticle';
import { useState } from 'react';

const EditArticle = () => {
  const article = useSelector(oneArticleSelector);
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
