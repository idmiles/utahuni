import type { FC } from 'react';
import type { SvgIconName } from './icons';
import { getIconDefinition } from './icons';

type Props = {
  name: SvgIconName;
  size?: number;
  className?: string;
};

const ReactIcon: FC<Props> = ({ name, size = 40, className }) => {
  const definition = getIconDefinition(name);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={definition.viewBox}
      aria-hidden="true"
      focusable="false"
    >
      {definition.paths.map((d) => (
        <path key={d} d={d} fill="currentColor" />
      ))}
    </svg>
  );
};

export default ReactIcon;
