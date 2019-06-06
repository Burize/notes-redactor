import * as React from 'react';
import { Menu, Container } from 'shared/view/elements';

interface IProps {
  actions?: React.ReactNode[];
}

function Header(props: IProps) {
  const { actions } = props;
  return (
    <Menu
      size="large"
    >
      <Container>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        {actions &&
          <Menu.Item position="right">
            {actions}
          </Menu.Item>
        }
      </Container>
    </Menu>
  );
}

export default Header;
