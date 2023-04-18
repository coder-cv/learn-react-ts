import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export default function dndDraggableElement(WrappedComponent) {
  return (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: props.id
    })
    const style = transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
        }
      : undefined

    return (
      <WrappedComponent
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        {...props}
      />
    )
  }
}
