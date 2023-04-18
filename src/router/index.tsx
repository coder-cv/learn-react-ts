// import { About } from 'components/About.tsx';

import React from 'react'
import { RouteObject,Navigate } from 'react-router-dom'
import Discover from '@/views/discover'
import About from '@/components/About'
import Suptable from '@/components/Suptable'
import DraggableDemo from '@/views/draggableDemo'
import DndKitSortable from '@/views/dndDraggable/DndKitSortable'
const DragsorTtableDemo =  React.lazy(() =>import('@/views/test/dragsortTableDemo'))
const EditTableDemo =  React.lazy(() =>import('@/views/test/editTableDemo'))


const routes:RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/about" />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/discover',
    element: <Discover />
  },
  {
    path: '/dragsortable',
    element: <DragsorTtableDemo />
  },
  {
    path: '/editable',
    element: <EditTableDemo />
  },
  {
    path: '/suptable',
    element: <Suptable />
  },
  {
    path: '/draggabledemo',
    element: <DraggableDemo />
  },
  {
    path: '/dnddraggable',
    element: <DndKitSortable />
  },

]

export default routes
