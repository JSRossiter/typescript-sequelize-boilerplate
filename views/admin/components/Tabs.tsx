import { Button } from '@admin-bro/design-system';
import React, {
  Dispatch,
  FunctionComponent,
  ReactElement,
  SetStateAction,
} from 'react';

interface TabProps {
  value: string;
  label: string;
  activeValue: string;
  onChange: Dispatch<SetStateAction<string>>;
}
const Tab: FunctionComponent<TabProps> = ({
  value,
  label,
  onChange,
  activeValue,
}) => (
  <Button
    size="sm"
    rounded
    mx="sm"
    mb="default"
    onClick={() => onChange(value)}
    variant={value === activeValue ? 'primary' : undefined}
    style={{ textTransform: 'capitalize' }}
  >
    {label}
  </Button>
);

interface Props {
  tabs: Array<{ value: string; label: string } | string>;
  activeValue: string;
  onChange: Dispatch<SetStateAction<string>>;
}

function Tabs(props: Props): ReactElement {
  return (
    <div>
      {props.tabs.map((tab) => {
        let value: string;
        let label: string;
        if (typeof tab === 'string') {
          value = tab;
          label = tab;
        } else {
          value = tab.value;
          label = tab.label;
        }
        return (
          <Tab
            key={value}
            value={value}
            label={label}
            onChange={props.onChange}
            activeValue={props.activeValue}
          />
        );
      })}
    </div>
  );
}

export default Tabs;
