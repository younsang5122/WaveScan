import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 24px;
  text-align: center;
`;

const IconBox = styled.div`
  width: 72px;
  height: 72px;
  background: var(--surface-mint);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: var(--color-primary);
  margin-bottom: 16px;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
`;

const Desc = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const ActionWrap = styled.div`
  margin-top: 24px;
`;

interface EmptyStateProps {
  /** Font Awesome 아이콘 클래스 (예: "fa-solid fa-camera") */
  icon: string;
  title: string;
  description?: string;
  /** 버튼 등 추가 액션 요소 */
  action?: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action, style, id }) => (
  <Wrapper style={style} id={id}>
    <IconBox>
      <i className={icon} />
    </IconBox>
    <Title>{title}</Title>
    {description && <Desc>{description}</Desc>}
    {action && <ActionWrap>{action}</ActionWrap>}
  </Wrapper>
);

export default EmptyState;
