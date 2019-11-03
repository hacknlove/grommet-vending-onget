import React from 'react';
import {
  Box, RoutedButton, Menu, Text,
} from 'grommet';
import { Vend } from 'grommet-icons';
import { set, useOnGet } from 'onget';

function onLogout() {
  set('fast://session', undefined);
}

function Header({ history }) {
  const session = useOnGet('fast://session');
  return (
    <Box direction="row" justify="center" align="center">
      <RoutedButton path={session ? '/' : '/login'} hoverIndicator>
        <Box
          pad="small"
          direction="row"
          align="center"
          gap="small"
        >
          <Text size="large">
            Serv-O-Mat
          </Text>
          <Vend />
        </Box>
      </RoutedButton>
      {session && (
        <Menu
          label={session.email}
          items={[
            {
              label: 'Help',
              onClick: () => {
                history.replace('/');
              },
            },
            {
              label: 'Logout',
              onClick: () => {
                onLogout();
                history.replace('/login');
              },
            },
          ]}
        />
      )}
    </Box>
  );
}

export default Header;
