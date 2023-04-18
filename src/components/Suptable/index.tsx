import React from 'react'
import { arrayMoveImmutable, ProTable, useRefFunction,ProColumns } from '@ant-design/pro-components';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Form } from 'antd';
import ProForm from '@ant-design/pro-form';
import type { ProFormInstance } from '@ant-design/pro-form';

const DragHandle = SortableHandle(() =>
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
);

type DataSourceType = {
  id?: React.Key;
  title?: string;
  created_at?: string;
  update_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '文件一',
    created_at: '1590486176000',

  },
  {
    id: 624691229,
    title: '文件二',
    created_at: '1590486176000',
  }

];


const loopDataSourceFilter = (
  data: readonly DataSourceType[],
  id: React.Key | undefined,
): DataSourceType[] => {
  return data
    .map((item) => {
      if (item.id !== id) {
        if (item.children) {
          const newChildren = loopDataSourceFilter(item.children, id);
          return {
            ...item,
            children: newChildren.length > 0 ? newChildren : undefined,
          };
        }
        return item;
      }
      return null;
    })
    .filter(Boolean) as DataSourceType[];
};



function SupTable(props:any){
  const form = ProForm.useFormInstance();


  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>(() => defaultData);

  const removeRow = useRefFunction((record: DataSourceType) => {
    setDataSource(loopDataSourceFilter(dataSource, record.id));
  });



  const SortableItem = SortableElement((props: any) => <tr {...props} />);
  const SortContainer = SortableContainer((props: any) => <tbody {...props} />);
  const onSortEnd = useRefFunction(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      // if (oldIndex !== newIndex) {
      //   const newData = arrayMoveImmutable({
      //     array: [...dataSource],
      //     fromIndex: oldIndex,
      //     toIndex: newIndex,
      //   }).filter((el) => !!el);
      //   setDataSource([...newData]);
      // }
    },
  );

  const {
    onDataSourceChange,
    columns: propsColumns,
    dataSource: originDataSource,
    ...otherProps
  } = props;

  const DraggableContainer = (props: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = (props: any) => {

    const { ...restProps } = props;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.id === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const columns: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
      // 第一行不允许编辑
      editable: false,
      className: 'drag-visible',
      render: () => <DragHandle />,
    },
    {
      title: '文件名',
      dataIndex: 'title',
      tooltip: '只读，使用form.getFieldValue获取不到值',
      formItemProps: (form, { rowIndex }) => {
        return {
          rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        };
      },

      width: '15%',
    },
    {
      title: '修改时间',
      dataIndex: 'created_at',
      valueType: 'date',
      editable: false,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id));
          }}
        >
          删除
        </a>,
      ],
    },
  ];


  return <>
    <Form.Item
      style={{
        maxWidth: '100%',
      }}
      {...props?.formItemProps}
      name={props.name}
    >
    <ProTable
        {...otherProps}
        rowKey="id"
        search={false}
        initialValue={defaultData}
        dataSource={dataSource}
        columns={columns}
        editable={{
          ...props.editable,
          form: form as ProFormInstance,
        }}
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}

        onDataSourceChange={onDataSourceChange}

    ></ProTable>
    </Form.Item>
  </>
}

export default SupTable
