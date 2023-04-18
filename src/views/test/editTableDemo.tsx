import type { ProColumns } from '@ant-design/pro-components'
import {
  EditableProTable,
  ProCard,
  ProFormField,
  ProFormRadio
} from '@ant-design/pro-components'
import React, { useState } from 'react'

import { DraggableItem } from '@/views/dndDraggable/DraggableItem'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { DragOutlined } from '@ant-design/icons';

const waitTime = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

type DataSourceType = {
  id: React.Key
  title?: string
  readonly?: string
  decs?: string
  state?: string
  created_at?: string
  update_at?: string
  children?: DataSourceType[]
}

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '文件一',
    created_at: '1590486176000'
  },
  {
    id: 624691229,
    title: '文件二',
    created_at: '1590486176000'
  }
]


const editTable = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([])

  const columns: ProColumns[] = [
    {
      title: '',
      dataIndex: 'sort',
      width: 60,
      className: 'drag-visible',
      readonly: true,
      render: () => <DragOutlined />,
    },
    {
      title: '文件名',
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules:
            rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : []
        }
      },

      width: '15%'
    },
    {
      title: '修改时间',
      dataIndex: 'created_at',
      valueType: 'date'
      // editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id))
          }}
        >
          删除
        </a>
      ]
    }
  ]

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    alert('调接口')
  }

  return (
    <>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <EditableProTable<DataSourceType>
          rowKey="id"
          className="dnd"
          headerTitle="可编辑"
          loading={false}
          dataSource={dataSource}
          columns={columns}
          components={{
            body: { row: DraggableItem }
          }}
          // value={dataSource}
          request={async () => ({
            data: defaultData,
            total: 3,
            success: true
          })}
          onChange={setDataSource}
          editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
              console.log(rowKey, data, row)
              await waitTime(2000)
            },
            onChange: setEditableRowKeys
          }}
        />
        {/* <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
          <ProFormField
            ignoreFormItem
            fieldProps={{
              style: {
                width: '100%'
              }
            }}
            mode="read"
            valueType="jsonCode"
            text={JSON.stringify(dataSource)}
          />
        </ProCard> */}
        <DragOverlay></DragOverlay>
      </DndContext>
    </>
  )
}

export default editTable
