import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import s from './styles.module.less';

const App: FC = () => {
  const navigate = useNavigate();

  const link = () => {
    navigate('/');
  };

  return (
    <div className={s.root}>
      <h1>qiankun-mic-a-foo</h1>
      <Button type="primary" onClick={link}>
        跳转到本应用路由入口
      </Button>
    </div>
  );
};

export default App;
