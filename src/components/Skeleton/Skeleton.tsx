import React from 'react';
import styles from './Skeleton.module.css';

// 1. Описываем интерфейс (какие пропсы мы ждем)
interface SkeletonProps {
  width?: string;       // Знак вопроса ? означает, что параметр необязательный
  height?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties; // Специальный тип React для стилей
}

const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  className = '',
  style = {},
}) => {
  
  const skeletonStyles: React.CSSProperties = {
    width: width || '100%',
    height: height || '20px',
    borderRadius: borderRadius,
    ...style,
  };

  const combinedClassName = `${styles.skeleton} ${className}`;

  return <div className={combinedClassName} style={skeletonStyles}></div>;
};

export default Skeleton;