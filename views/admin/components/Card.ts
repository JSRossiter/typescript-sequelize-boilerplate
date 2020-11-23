import { Box } from '@admin-bro/design-system';
import styled from 'styled-components';

export const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  flex-grow: 1;
  color: ${({ theme }): string => theme.colors.grey100};
  text-decoration: none;
  border: 1px solid transparent;
  margin: 20px;
  padding: 15px !important;
`;

Card.defaultProps = {
  variant: 'white',
  boxShadow: 'card',
};
