import React from 'react';
import {
  Box, Heading, RoutedButton, Text,
} from 'grommet';
import { Close } from 'grommet-icons';
import { useOnGet } from 'onget';

export default function Location({ match: { params: { id } } }) {
  const service = useOnGet(`/api/services/${id}`, {
    first: {
      name: 'loading',
    },
  });
  const selected = { area: 0, row: 7, rack: 3 };

  return (
    <Box gap="xsmall">
      <Box
        direction="row"
        justify="between"
        align="center"
        gap="small"
      >
        <Heading>
          {`Location of ${service.name}`}
        </Heading>
        <RoutedButton
          icon={<Close />}
          path={`/service/${id}`}
        />
      </Box>
      {(new Array(2).fill(0)).map((_, area) => {
        const areaSelected = area === selected.area;
        const areaLabel = `area ${area + 1}`;
        return (
          <Box
            key={areaLabel}
            pad="small"
            gap="xxsmall"
          >
            <Text color={!areaSelected ? 'light-6' : 'black'}>
              {areaSelected ? (
                <strong>
                  {areaLabel}
                </strong>
              ) : (
                <span>
                  {areaLabel}
                </span>
              )}
            </Text>
            {(new Array(25).fill(0)).map((__, row) => {
              const rowSelected = areaSelected && row === selected.row;
              const rowLabel = `${row + 1}`;
              return (
                <Box
                  key={rowLabel}
                  pad={{ horizontal: 'xsmall' }}
                  background="light-2"
                  gap="small"
                  direction="row"
                  justify="start"
                  align="center"
                >
                  <Box basis="xxsmall" flex={false}>
                    <Text
                      color={!rowSelected ? 'light-6' : 'black'}
                      size={!rowSelected ? 'small' : 'normal'}
                    >
                      {rowSelected ? (
                        <strong>
                          {rowLabel}
                        </strong>
                      ) : (
                        <span>
                          {rowLabel}
                        </span>
                      )}
                    </Text>
                  </Box>
                  {(new Array(10).fill(0)).map((___, rack) => {
                    const rackSelected = rowSelected && rack === selected.rack;
                    const rackLabel = `${rack + 1}`;
                    return (
                      <Box
                        key={rackLabel}
                        basis="xsmall"
                        flex
                        pad={rackSelected ? 'small' : 'xxsmall'}
                        background={rackSelected ? 'light-6' : 'light-3'}
                      >
                        {rackSelected && (
                          <Text>
                            <strong>
                              {`rack ${rack + 1}`}
                            </strong>
                          </Text>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
