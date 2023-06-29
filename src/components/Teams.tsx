import { Button, Input, InputRef, Space, Table, Tabs } from 'antd'
import { ColumnsType, TableProps } from 'antd/es/table';
import React, { useRef, useState } from 'react'
import { DataType } from './CrawlMain';
import _ from 'lodash';
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import Charts from './Chart';




export default function Teams(props: any) {

     const dataApi = props.dataApi[0]
     console.log('dât', dataApi)
     const dataYear = props.dataApi[1]

     const [searchText, setSearchText] = useState('');
     const [searchedColumn, setSearchedColumn] = useState('');
     const searchInput = useRef<InputRef>(null);

     const handleSearch = (
          selectedKeys: string[],
          confirm: (param?: FilterConfirmProps) => void,
          dataIndex: any,
     ) => {
          confirm();
          setSearchText(selectedKeys[0]);
          setSearchedColumn(dataIndex);
     };

     const handleReset = (clearFilters: () => void) => {
          clearFilters();
          setSearchText('');
     };

     const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
               <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                    <Input
                         ref={searchInput}
                         placeholder={`Search ${dataIndex}`}
                         value={selectedKeys[0]}
                         onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                         onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                         style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                         <Button
                              onClick={() => clearFilters && handleReset(clearFilters)}
                              size="small"
                              style={{ width: 90 }}
                         >
                              Reset
                         </Button>
                         <Button
                              type="link"
                              size="small"
                              onClick={() => {
                                   confirm({ closeDropdown: false });
                                   setSearchText((selectedKeys as string[])[0]);
                                   setSearchedColumn(dataIndex);
                              }}
                         >
                              Filter
                         </Button>
                         <Button
                              type="link"
                              size="small"
                              onClick={() => {
                                   close();
                              }}
                         >
                              close
                         </Button>
                    </Space>
               </div>
          ),
          filterIcon: (filtered: boolean) => (
               <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
          ),
          onFilter: (value, record) =>
               record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
          onFilterDropdownOpenChange: (visible) => {
               if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
               }
          },
          render: (text) =>
               searchedColumn === dataIndex ? (
                    <Highlighter
                         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                         searchWords={[searchText]}
                         autoEscape
                         textToHighlight={text ? text.toString() : ''}
                    />
               ) : (
                    text
               ),
     });

     const data: any = _.map(dataApi, (data: any, key) => {
          return {
               key: data?.position,
               pos: data?.position,
               team: data?.Constructor.name,
               pts: data?.points
          }
     })

     const columns: ColumnsType<any> = [
          {
               title: "POS",
               dataIndex: "pos",
               key: "pos",
          },
          {
               title: "TEAM",
               dataIndex: "team",
               key: "team",
               ...getColumnSearchProps('team')
          },
          {
               title: "PTS",
               dataIndex: "pts",
               key: "pts",
               sorter: (a, b) => a.pts - b.pts,
          },

     ];

     const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
          console.log('Various parameters', pagination, filters, sorter);
          // setFilteredInfo(filters);
          // setSortedInfo(sorter as SorterResult<DataType>);
     };

     const arrData1: any = [];
     const arrData2: any = [];



     const dataChart: any = () => {
          return _.map(dataApi, (data: any, key) => {
               arrData1.push(data?.Constructor.name)
               arrData2.push(data?.points)
               // arrDataChart1.push({ grand_prix: data?.Circuit.Location.country, lap: data?.Results[0]?.laps })
          })
     }

     dataChart()

     return (
          <div>
               <Tabs defaultActiveKey="1">
                    <TabPane tab="Table" key="1">
                         <Table size='small' columns={columns} dataSource={data} rowKey={dataYear} onChange={handleChange} />
                    </TabPane>
                    <TabPane tab="Chart" key="2">
                         <Charts data1={arrData1} data2={arrData2} data3={['Points','Teams']} />
                    </TabPane>
               </Tabs>

          </div>
     )
}