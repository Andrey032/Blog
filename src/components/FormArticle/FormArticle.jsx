import { useForm, FormProvider } from 'react-hook-form';

import Input from '../Input';
import Button from '../Button';
import ButtonSubmit from '../ButtonSubmit';

import style from './FormArticle.module.scss';

const FormArticle = ({ title, onSubmit, tags, article = {}, setTags }) => {
  const methods = useForm({
    mode: 'onChange',
    values: {
      title: article.title,
      description: article.description,
      textarea: article.body,
    },
  });

  const handleDeleteTag = (tagToDelete) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleAddTag = () => {
    const tag = methods.getValues('tag')?.trim();
    if (tag) {
      setTags((prev) => [...prev, tag]);
      methods.resetField('tag');
    }
  };

  return (
    <article className={style.article}>
      <h2 className={style.article__title}>{title}</h2>
      <FormProvider {...methods}>
        <form className={style.article__form} onSubmit={methods.handleSubmit(onSubmit)}>
          <Input text='Title' name='title' required title='Введите название поста' indent={true} />
          <Input
            text='Short description'
            name='description'
            required
            title='Введите название поста'
            indent={true}
          />
          <label className={style.article__label}>
            Text
            <textarea
              className={style.article__textArea}
              name='textarea'
              placeholder='Text'
              spellCheck={true}
              title='Введите текст'
              {...methods.register('textarea', {
                required: true,
              })}
            ></textarea>
          </label>
          <label className={style.article__tagsContainer}>
            Tags
            {tags.map((tag, i) => (
              <div className={style.article__tag} key={`${tag}${i}`}>
                <input className={style.article__inputTag} defaultValue={tag} />
                <Button
                  text='Delete'
                  color='red'
                  size='middle'
                  onClick={() => handleDeleteTag(tag)}
                />
              </div>
            ))}
            <div className={style.article__inputContainer}>
              <input
                className={style.article__inputTag}
                placeholder='Tag'
                {...methods.register('tag')}
              />
              <Button
                text='Delete'
                color='red'
                size='middle'
                onClick={handleDeleteTag}
                disabled={tags.length === 0}
              />
              <Button text='Add tag' color='blue' size='middle' onClick={handleAddTag} />
            </div>
          </label>
          <div className={style.article__buttonSubmit}>
            <ButtonSubmit textBtn='Send' isValid={methods.formState.isValid} />
          </div>
        </form>
      </FormProvider>
    </article>
  );
};

export default FormArticle;
