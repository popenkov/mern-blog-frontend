import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import { PostSkeleton } from '../components/Post/Skeleton';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const getPost = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/posts/${id}`);
      setPost(data);
      setIsLoading(false);
    } catch (err) {
      console.log(`Ошибка при загрузке: ${err}`);
    }
  };
  useEffect(() => {
    getPost();
  }, []);
  console.log(post);
  return (
    <>
      {isLoading ? (
        <Post isLoading={isLoading} isFullPost />
      ) : (
        <Post
          id={post.id}
          title={post.title}
          imageUrl={
            post.imageUrl ? `http://localhost:4444${post.imageUrl}` : ''
          }
          user={post.user}
          createdAt={post.createdAt}
          viewsCount={post.viewsCount}
          commentsCount={3}
          tags={post.tags}
          isFullPost
        >
          <ReactMarkdown children={post.text} />
        </Post>
      )}

      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
