import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import FormArticle from '../FormArticle';
import { createArticle } from '../../features/blogs/blogsSlice';

const CreateArticle = () => {
  const [tags, setTags] = useState([]);
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
    dispatch(createArticle(newArticle));
    navigate('/articles');
  };

  return (
    <FormArticle title='Create new article' onSubmit={onSubmit} tags={tags} setTags={setTags} />
  );
};

export default CreateArticle;
