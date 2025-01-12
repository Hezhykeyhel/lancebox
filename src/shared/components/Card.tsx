import React, { FC } from 'react';

import { Box, BoxProps } from './Box';

export type CardProps = BoxProps & {
  containerProps?: BoxProps;
};

const Card: FC<CardProps> = ({ containerProps, ...rest }) => (
  <Box
    borderRadius="sm"
    elevation={12}
    flexGrow={1}
    padding="xs"
    shadowColor="gray200"
    shadowOffset={{ height: 2, width: 0 }}
    shadowOpacity={0.25}
    shadowRadius={3.84}
    width="100%"
    {...containerProps}>
    <Box
      backgroundColor="white"
      borderRadius="sm"
      flexGrow={1}
      width="100%"
      {...rest}
    />
  </Box>
);

export { Card };
