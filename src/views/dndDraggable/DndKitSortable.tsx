import { useState } from 'react';
import React from 'react';
import { DragOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import type { TableColumnProps } from 'antd';

import { DndContext,DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';


import { DraggableItem } from './DraggableItem';
import '../dndDraggable/style.css'

const data = [
  { id: '1', name: '孔艳', age: 33, sex: '女' },
  { id: '2', name: '江艳', age: 90, sex: '男' },
  { id: '3', name: '姚娜', age: 17, sex: '女' },
  { id: '4', name: '何洋', age: 77, sex: '女' },
  { id: '5', name: '卢静', age: 47, sex: '男' },
];

type TableItem = {
  id: string;
  name?: string;
  sex?: string;
  age?: number;
  address?: string;
};

export default () => {
  const [dataSource, setDataSource] = useState<any[]>(data);

  const columns: TableColumnProps<TableItem>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
      render: () => <DragOutlined />,
      align: 'center',
    },
    { title: '姓名', dataIndex: 'name' },
    { title: '性别', dataIndex: 'sex' },
    { title: '年龄', dataIndex: 'age' },
    { title: '地址', dataIndex: 'address' },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // if (active.id !== over?.id) {
    //   const oldIndex = dataSource.findIndex((item) => item.id === active.id);
    //   const newIndex = dataSource.findIndex((item) => item.id === over?.id);

    //   const next = arrayMove(dataSource, oldIndex, newIndex);

    //   setDataSource(next);
    // }
    alert('添加数据')
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
      {/* <SortableContext items={dataSource.map((c) => c.id)} strategy={verticalListSortingStrategy}> */}
        <Table
          rowKey="id"
          className="dnd"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          components={{ body: { row: DraggableItem } }}
        />
      {/* </SortableContext> */}
      <DragOverlay></DragOverlay>
    </DndContext>
  );
};
