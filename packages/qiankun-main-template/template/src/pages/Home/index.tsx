import Aside from '@/components/Aside';
import Header from '@/components/Header';
import { startMicroApp } from '@/router/registry-mic';
import { ROOT_BASENAME } from '@/utils/env';
import { Layout } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './styles.module.less';

const { Content } = Layout;

function Home() {
  const navigate = useNavigate();

  // 启动微前端子应用
  useEffect(() => {
    startMicroApp({ rootNavigate: navigate });
  }, []);

  useEffect(() => {
    // 初始需要重定向的 path
    const redirectPaths = [ROOT_BASENAME, `${ROOT_BASENAME}/`, '/'];
    if (redirectPaths.includes(window.location.pathname)) {
      navigate('qiankun-mic-a', {
        replace: true
      });
    }
  }, []);

  return (
    <Layout className={s.root}>
      <Header />
      <Layout className={s.layout}>
        <Aside />
        <Content
          className={s.content}
          id={`${import.meta.env.VITE_REACT_APP_NAME}-content`}
        ></Content>
      </Layout>
    </Layout>
  );
}

export default Home;
