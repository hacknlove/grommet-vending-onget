import React, { useState } from 'react';
import { useOnGet } from 'onget';
import {
  Box, Grid, Heading, InfiniteScroll, RoutedButton, Text, TextInput,
} from 'grommet';

export default function Services() {
  const [search, setsearch] = useState('');
  const url = search
    ? `/api/services/search/${search}`
    : '/api/services';

  const services = useOnGet(url, {
    first: [],
  });

  return (
    <Box>
      <Box direction="row" justify="between" align="center">
        <Heading>
          Services
        </Heading>
        <RoutedButton label="New" path="/add" />
      </Box>
      <TextInput
        placeholder="search"
        value={search}
        onChange={event => setsearch(event.target.value)}
      />
      <Box margin={{ vertical: 'medium' }}>
        <Grid columns="small" gap="small">
          {services ? (
            <InfiniteScroll items={services}>
              {service => (
                <Box
                  key={service.name}
                  basis="small"
                  round="xsmall"
                  overflow="hidden"
                >
                  <RoutedButton
                    path={`/service/${service.id}`}
                    fill
                    hoverIndicator
                  >
                    <Box
                      direction="row"
                      justify="between"
                      align="center"
                      pad="small"
                      background={{ color: 'light-4', opacity: true }}
                    >
                      <Text>
                        {service.name}
                      </Text>
                      {service.status !== 'ok' && (
                        <Box pad="xsmall" round="xsmall" background="status-critical" />
                      )}
                    </Box>
                  </RoutedButton>
                </Box>
              )}
            </InfiniteScroll>
          ) : (
            <Box margin="medium" pad="large" background="light-1" />
          )}
        </Grid>
      </Box>
    </Box>
  );
}
