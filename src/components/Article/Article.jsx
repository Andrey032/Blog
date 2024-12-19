import { Link, useNavigate, useLoaderData, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Button as ButtonAntd, Popconfirm } from 'antd';

import Like from '../Like/Like';
import Button from '../Button';
import { deleteArticle, loggedInSelector, userSelector } from '../../features/blogs/blogsSlice';
import { URL } from '../../utils/constants';

import style from './Article.module.scss';

const Article = () => {
  const { article } = useLoaderData();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(loggedInSelector);
  const currentUser = useSelector(userSelector);
  const navigate = useNavigate();

  if (article === null) return;

  const {
    title,
    favoritesCount,
    favorited,
    tagList,
    description,
    author: { username, image },
    createdAt,
    body,
  } = article;

  const confirm = () => {
    dispatch(deleteArticle(slug));
    navigate('/articles', { replace: true });
  };

  return (
    <article className={style.post}>
      <div className={style.post__wrapper}>
        <div className={style.post__info}>
          <div className={style.post__containerDescription}>
            <div className={style.post__containerTitle}>
              <h2 className={style.post__title}>{title}</h2>
              <Like like={favoritesCount} isFavorited={favorited} slug={slug} />
            </div>
            {tagList.map((tag, i) => (
              <span key={`${tag}${i}`} className={style.post__tag}>
                {tag}
              </span>
            ))}
            <p className={style.post__text}>{description}</p>
          </div>

          <div className={style.post__container}>
            <div className={style.post__containerUser}>
              <div className={style.post__user}>
                <h2 className={style.post__name}>{username}</h2>
                <span className={style.post__date}>
                  {format(new Date(createdAt), 'MMMM d, yyyy')}
                </span>
              </div>
              <img className={style.post__avatar} src={image} alt='аватар' />
            </div>
            {isLoggedIn && username === currentUser.username && (
              <div className={style.post__containerBtn}>
                <Popconfirm
                  title='Delete the task'
                  description='Are you sure to delete this task?'
                  okText='Yes'
                  cancelText='No'
                  onConfirm={confirm}
                >
                  <ButtonAntd danger>Delete</ButtonAntd>
                </Popconfirm>
                <Link to={`/articles/${slug}/edit`}>
                  <Button text='Edit' color='green' size='small' />
                </Link>
              </div>
            )}
          </div>
        </div>
        <Markdown options={{ wrapper: 'article' }}>{body}</Markdown>
      </div>
    </article>
  );
};

const articleLoader = async ({ request, params }) => {
  const response = await fetch(`${URL}/articles/${params.slug}`);
  return response.json();
};

export { Article, articleLoader };
