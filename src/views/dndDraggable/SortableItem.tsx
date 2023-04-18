import React from 'react';

import { useSortable } from '@dnd-kit/sortable';
// import './styles.css';
import '../dndDraggable/style.css'

export function SortableItem(props: any) {
  const id = props['data-row-key'];
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const dragStyle = {
    transition,
    // transform: CSS.Translate.toString(transform),
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`,
  };

  const { style, className, children, ...rest } = props;

  const cls = [className, 'dragItem', isDragging ? 'dragOverlay' : null].filter((c) => c).join(' ');

  return (
    <tr
      id={id}
      ref={setNodeRef}
      {...attributes}
      // {...listeners}
      className={cls}
      style={{ ...style, ...dragStyle }}
      {...rest}
      data-cypress="draggable-item"
    >
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            additionalProps: { ...listeners, 'data-cypress': 'draggable-handle' },
          });
        }

        return child;
      })}
    </tr>
  );
}
