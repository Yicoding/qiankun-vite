import type { BearState } from '@/store';
import { useBearStore } from '@/store';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import s from './styles.module.less';

function Home() {
  console.log('home');
  const { rootNavigate } = useBearStore((state: BearState) => state);
  const navigate = useNavigate();

  const jump = (path: string) => {
    rootNavigate?.(path);
  };

  const link = () => {
    navigate('/foo');
  };

  return (
    <div className={s.root}>
      <h1>qiankun-mic-a-home</h1>
      <Button type="primary" onClick={() => jump('qiankun-mic-b')}>
        跳转到子应用B
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={link}>
        跳转到本应用路由foo
      </Button>
    </div>
  );
}

export default Home;
