import postStyle from './Post.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { URL } from '../../utils/constants';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';

import { useDispatch, useSelector } from 'react-redux';
import { loggedInSelector, setLoading } from '../../features/blogs/blogsSlice';

import Like from '../Like/Like';
import Button from '../Button';

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(loggedInSelector);

  useEffect(() => {
    dispatch(setLoading(true));
    fetch(`${URL}/articles/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then(({ article }) => setPost(article))
      .finally(dispatch(setLoading(false)));
  }, [dispatch, slug]);

  if (post === null) return;

  const {
    title,
    favoritesCount,
    tagList,
    description,
    author: { username, image },
    createdAt,
    body,
  } = post;

  return (
    <article className={postStyle.post}>
      <div className={postStyle.post__wrapper}>
        <div className={postStyle.post__info}>
          <div className={postStyle.post__containerDescription}>
            <div className={postStyle.post__containerTitle}>
              <h2 className={postStyle.post__title}>{title}</h2>
              <Like like={favoritesCount} />
            </div>
            {tagList.map((tag, i) => (
              <span key={`${tag}${i}`} className={postStyle.post__tag}>
                {tag}
              </span>
            ))}
            <p className={postStyle.post__text}>{description}</p>
          </div>

          <div className={postStyle.post__container}>
            <div className={postStyle.post__containerUser}>
              <div className={postStyle.post__user}>
                <h2 className={postStyle.post__name}>{username}</h2>
                <span className={postStyle.post__date}>
                  {format(new Date(createdAt), 'MMMM d, yyyy')}
                </span>
              </div>
              <img className={postStyle.post__avatar} src={image} alt='аватар' />
            </div>
            {isLoggedIn && (
              <div className={postStyle.post__containerBtn}>
                <Button text='Delete' color='red' size='small' />
                <Button text='Edit' color='green' size='small' />
              </div>
            )}
          </div>
        </div>
        <Markdown options={{ wrapper: 'article' }}>{body}</Markdown>
      </div>
    </article>
  );
}
