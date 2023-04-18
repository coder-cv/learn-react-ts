import React from 'react'
import {useDroppable} from '@dnd-kit/core';

export default function dndDraggableContainner(WrappedComponent) {
  return (props)=>{

    const {isOver, setNodeRef} = useDroppable({
      id: props.id,
    });
    const style = {
      color: isOver ? 'green' : undefined,
    };

  return <WrappedComponent ref={setNodeRef} style={style} {...props} />;
  }
}
