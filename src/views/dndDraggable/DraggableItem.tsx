import React from 'react';

import {useDraggable,useDroppable} from '@dnd-kit/core';
import '../dndDraggable/style.css'

export function DraggableItem(props: any) {
  const id = props['data-row-key'];
  const { attributes, listeners, setNodeRef, transform,  isDragging } = useDraggable({
    id,
  });

  const { isOver, setNodeRef: setDroppableRef } = useDroppable({
    id: id,
  });



  const dragStyle = {
    // transition,
    // transform: CSS.Translate.toString(transform),
    '--translate-x': `${transform?.x ?? 0}px`,
    '--translate-y': `${transform?.y ?? 0}px`,
  };

  const { style, className, children, ...rest } = props;

  const cls = [className, 'dragItem', isDragging ? 'dragOverlay' : null, isOver ? 'drag-over' : ''].filter((c) => c).join(' ');

  return (
    <tr
      id={id}
      ref={(node) => {
        setNodeRef(node);
        setDroppableRef(node);
      }}
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
