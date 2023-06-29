import { Button, Input, InputRef, Space, Table, Tabs } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import  Axios  from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { handleDataDetail, loadingApi, setStateSelect } from '../reducer/dataReducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table';
import { FilterConfirmProps } from 'antd/es/table/interface'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { DataType } from './CrawlMain'
import _ from 'lodash'
import { useParams } from 'react-router-dom'



export default function Detail(props: any) {
     const param = useParams();

     const dataReducer = useSelector((state: RootState) => state.rootReducer)
    
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

     const data: any = _.map(dataReducer?.dataDetail, (data: any, key) => {
          return {
               key: data?.round,
              pos: data?.Results[0].position,
              no:data?.Results[0].number,
               driver: data?.Results[0].Driver.familyName + " " + data?.Results[0].Driver.givenName,
               car: data?.Results[0].Constructor.name,
               laps:data?.Results[0].laps,
               time: data?.Results[0].FastestLap?.Time?.time,
               pts: data?.Results[0].points,

          }
     })

     const columns: ColumnsType<any> = [
          {
               title: "POS",
               dataIndex: "pos",
               key: "pos",
          },
          {
               title: "NO",
               dataIndex: "no",
               key: "no",
               sorter: (a, b) => a.no - b.no,
          },
          {
               title: "DRIVER",
               dataIndex: "driver",
               key: "driver",
               ...getColumnSearchProps('driver')
          },
          {
               title: "CAR",
               dataIndex: "car",
               key: "car",
               ...getColumnSearchProps('car')
          },
          {
               title: "LAPS",
               dataIndex: "laps",
               key: "laps",
               sorter: (a, b) => a.laps - b.laps,
          },
          {
               title: "TIME/RETIRED",
               dataIndex: "time",
               key: "time",
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

     const dispatch = useDispatch()
     useEffect(() => {
          dispatch(setStateSelect('none'))
          try {
               const callApi = async () => {
                    await dispatch(loadingApi(true))
                    await  Axios({
                         url: `https://ergast.com/api/f1/${param.year}/drivers/${param.name}/results.json`,
                         method: 'GET'
                    }).then((result) => {
                         dispatch(handleDataDetail(result.data.MRData.RaceTable.Races))
                         // console.log(result.data.MRData.RaceTable.Races)
                         dispatch(loadingApi(false))
                    })
               }
               callApi()
          } catch (err) {
               console.log(err)
          }

          return ()=>{
              dispatch(setStateSelect('block'))
          };
          
     }, [])
     return (
          <div className='container p-0'>
               
               <Tabs defaultActiveKey="1">
                    <TabPane tab="Table" key="1">
                         <Table size='small' columns={columns} dataSource={data} rowKey={dataReducer?.year} onChange={handleChange} />
                    </TabPane>
                    <TabPane tab="Chart" key="2">
                         Content of Tab 2
                    </TabPane>
               </Tabs>
          </div>
     )
}