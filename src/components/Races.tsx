import { Button, Input, InputRef, Space, Table, Tabs } from 'antd'
import { ColumnsType, TableProps } from 'antd/es/table';
import React, { useEffect, useRef, useState } from 'react'
import { DataType } from './CrawlMain';
import _ from 'lodash';
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import type { ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';

import Charts from './Chart';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';




interface TeamData {
     name: string;
     time: number;
}

export default function Races(props: any) {
     const dataApi = props.dataApi[0]
     console.log('data races', dataApi)
     const dataYear = props.dataApi[1]

     const { year } = useSelector((state: RootState) => state.rootReducer)


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
               key: data?.Circuit.Location.country,
               grand_prix: <Link to={`detail/${year}/${data?.Results[0]?.Driver.driverId}`} >{data?.Circuit.Location.country}</Link>,
               date: data?.date,
               winner: data?.Results[0]?.Driver.givenName + " " + data?.Results[0]?.Driver.familyName,
               car: data?.Results[0]?.Constructor?.name,
               lap: data?.Results[0]?.laps,
               time: data?.Results[0]?.Time?.time
          }
     })

     const arrData1: any = [];
     const arrData2: any = [];



     const dataChart: any = () => {
          return _.map(dataApi, (data: any, key) => {
               arrData1.push(data?.Circuit.Location.country)
               arrData2.push(data?.Results[0]?.laps)
               // arrDataChart1.push({ grand_prix: data?.Circuit.Location.country, lap: data?.Results[0]?.laps })
          })
     }


     const columns: ColumnsType<any> = [
          {
               title: "GRAND PRIX",
               dataIndex: "grand_prix",
               key: "grand_prix",
               ...getColumnSearchProps('grand_prix')
          },
          {
               title: "Date",
               dataIndex: "date",
               key: "date",
          },
          {
               title: "Winner",
               dataIndex: "winner",
               key: "winner",
               ...getColumnSearchProps('winner')

          },
          {
               title: "Car",
               dataIndex: "car",
               key: "car",
               ...getColumnSearchProps('car')
          },
          {
               title: "Lap",
               dataIndex: "lap",
               key: "lap",
               sorter: (a, b) => a.lap - b.lap,
          },
          {
               title: "Time",
               dataIndex: "time",
               key: "time",
          },
     ];
     const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
          console.log('Various parameters', pagination, filters, sorter);
          // setFilteredInfo(filters);
          // setSortedInfo(sorter as SorterResult<DataType>);
     };


     useEffect(() => {
          dataChart()
     }, [])


     return (
          <div>
               <Tabs defaultActiveKey="1">
                    <TabPane tab="Table" key="1">
                         <Table size='small' columns={columns} dataSource={data} rowKey={dataYear} onChange={handleChange} />
                    </TabPane>
                    <TabPane tab="Chart" key="2">
                         <Charts data1={arrData1} data2={arrData2} data3={['Lap','GRAND PRIX']} />
                    </TabPane>
               </Tabs>

          </div>
     )
}