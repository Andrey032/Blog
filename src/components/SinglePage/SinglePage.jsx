import singlePageStyle from './SinglePage.module.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../features/blogs/blogsSlice';
import Like from '../Like/Like';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';

export default function SinglePage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();

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

  return (
    <article className={singlePageStyle.post}>
      <div className={singlePageStyle.post__wrapper}>
        <div className={singlePageStyle.post__info}>
          <div className={singlePageStyle.post__containerDescription}>
            <div className={singlePageStyle.post__containerTitle}>
              <h2 className={singlePageStyle.post__title}>{post.title}</h2>
              <Like like={post.favoritesCount} />
            </div>
            {post.tagList.map((tag, i) => (
              <span key={`${tag}${i}`} className={singlePageStyle.post__tag}>
                {tag}
              </span>
            ))}
            <p className={singlePageStyle.post__text}>{post.description}</p>
          </div>

          <div className={singlePageStyle.post__containerUser}>
            <div className={singlePageStyle.post__user}>
              <h2 className={singlePageStyle.post__name}>{post.author.username}</h2>
              <span className={singlePageStyle.post__date}>
                {format(new Date(post.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>
            <img
              className={singlePageStyle.post__avatar}
              src={post.author.image}
              alt='аватар профиля'
            />
          </div>
        </div>
        <Markdown options={{ wrapper: 'article' }}>{post.body}</Markdown>
      </div>
    </article>
  );
}
