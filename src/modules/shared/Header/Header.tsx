import * as React from 'react';
import { Menu, Container } from 'shared/view/elements';

interface IProps {
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}

function Header(props: IProps) {
  const { leftActions, rightActions } = props;
  return (
    <Menu
      size="large"
    >
      <Container>
        {leftActions &&
          <Menu.Item position="left">
            {leftActions}
          </Menu.Item>
        }
        {rightActions &&
          <Menu.Item position="right">
            {rightActions}
          </Menu.Item>
        }
      </Container>
    </Menu>
  );
}

export default Header;
