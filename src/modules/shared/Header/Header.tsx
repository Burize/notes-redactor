import * as React from 'react';
import { Menu, Button, Container } from 'shared/view/elements';

function Header() {
  return (
    <Menu
      size="large"
    >
      <Container>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a">New </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default Header;
