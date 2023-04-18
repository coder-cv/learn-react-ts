import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { HashRouter } from 'react-router-dom'

import { DndContext } from '@dnd-kit/core'

// import { Draggable } from './Draggable'
// import { Droppable } from './Droppable'

import App from '@/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Suspense>
      <HashRouter>
        <App />
      </HashRouter>
  </Suspense>
)
