import { ReactNode, isValidElement, cloneElement, CSSProperties, ReactElement, useEffect, useState, } from 'react';
import { createPortal } from 'react-dom';

interface SimplePortalProps {
  children: ReactNode;
  targetSelector?: string; // 可选属性，默认值通过组件参数定义
}

const SimplePortal = ({
  children,
  targetSelector = '#root'
}: SimplePortalProps) => {
  // 存储完整错误消息
  const [container, setContainer] = useState<Element | null>(null);

  // 如果找不到目标容器，延迟500ms后再显示错误
  useEffect(() => {
    // 检查容器是否存在
    const foundContainer = document.querySelector(targetSelector);
    if (!foundContainer) return console.error('SimplePortal 错误', `找不到目标容器 "${targetSelector}"，请检查选择器是否正确。`);
    setContainer(foundContainer);

  }, [targetSelector]);

  // 要应用的样式
  const portalStyles: CSSProperties = {
    margin: '0 auto',
    boxSizing: 'border-box'
  };

  // 将样式应用到children的最外层元素
  let enhancedChildren = children;

  if (isValidElement(children)) {
    // 安全地处理样式合并
    const childStyle = (children as ReactElement<{ style?: CSSProperties }>).props.style || {};
    enhancedChildren = cloneElement(children as ReactElement<{ style?: CSSProperties }>, {
      style: {
        ...childStyle,
        ...portalStyles
      }
    });
  }

  if (!container) return null;

  // 容器存在，创建Portal
  return createPortal(enhancedChildren, container);
};

export default SimplePortal;