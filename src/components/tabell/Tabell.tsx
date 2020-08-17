import React from 'react';
import classnames from 'classnames';
import './tabell.less';

export enum TabellStyle {
  stripet,
  reverseStripet,
}

interface TabellProps {
  columnHeaderRows: React.ReactNode;
  className?: string;
  noBorder?: boolean;
  tabellStyle?: TabellStyle;
}

const Tabell: React.FunctionComponent<TabellProps> = ({
  tabellStyle,
  columnHeaderRows,
  className,
  noBorder,
  children,
}) => {
  return (
    <table
      className={classnames('tabell', className, {
        'tabell--reverse-stripet': tabellStyle === TabellStyle.reverseStripet,
        'tabell--stripet': tabellStyle === TabellStyle.stripet,
        borderless: noBorder,
      })}
    >
      <thead>{columnHeaderRows}</thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default Tabell;
