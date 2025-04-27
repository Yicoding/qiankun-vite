import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES, FLATTENED_ROUTES } from '@/router/mic-routes';

import s from './styles.module.less';

const routePaths = FLATTENED_ROUTES.map(({ path }) => path);

function Aside() {
  const navigate = useNavigate();
  const location = useLocation();
  const paths = location.pathname.split('/');
  const activePath = paths.find((path) => routePaths.includes(path)) as string;

  const items: MenuProps['items'] = ROUTES.map(
    ({ path, title, activeIcon, inactiveIcon, childRoutes }) => {
      if (childRoutes && childRoutes.length > 0) {
        const isParentActive = childRoutes
          .map(({ path }) => path)
          .includes(activePath);
        return {
          label: title,
          key: path,
          icon: isParentActive ? activeIcon : inactiveIcon,
          children: childRoutes.map((child) => {
            return {
              label: child.title,
              key: child.path,
              icon: child.path === activePath ? activeIcon : inactiveIcon
            };
          })
        };
      }
      return {
        label: title,
        key: path,
        icon: path === activePath ? activeIcon : inactiveIcon
      };
    }
  );

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === activePath) {
      return;
    }
    navigate(e.key);
  };

  return (
    <div className={s.root}>
      <Menu
        items={items}
        mode="inline"
        selectedKeys={[activePath]}
        onClick={onClick}
      />
    </div>
  );
}

export default Aside;
