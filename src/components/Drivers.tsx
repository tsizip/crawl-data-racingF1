import { Table, TableProps } from 'antd'
import React from 'react'
import { DataType } from './CrawlMain';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';




export default function Drivers(props: any) {

     const dataApi = props.dataApi[0]
     console.log('dât', dataApi)
     const dataYear = props.dataApi[1]
     const data: any = _.map(dataApi, (data: any, key) => {
          return {
               key: data?.position,
               pos: data?.position,
               driver: data?.Driver.givenName + " " +  data?.Driver.familyName,
               nationality: data?.Constructors[0].nationality,
               car:data?.Constructors[0].name,
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
               title: "DRIVER",
               dataIndex: "driver",
               key: "driver",
          },
          {
               title: "NATIONALITY",
               dataIndex: "nationality",
               key: "nationality",
          },
          {
               title: "CAR",
               dataIndex: "car",
               key: "car",
          },
          {
               title: "PTS",
               dataIndex: "pts",
               key: "pts",
          },
     ];

     const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
          console.log('Various parameters', pagination, filters, sorter);
          // setFilteredInfo(filters);
          // setSortedInfo(sorter as SorterResult<DataType>);
     };


     return (
          <div>
               <Table columns={columns} dataSource={data} rowKey={dataYear} onChange={handleChange} />
          </div>
     )
}