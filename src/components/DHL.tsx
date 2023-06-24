import { Table, TableProps } from 'antd'
import React from 'react'
import { DataType } from './CrawlMain';
import { ColumnsType } from 'antd/es/table';
import _ from 'lodash';




export default function DHL(props: any) {

     const dataApi = props.dataApi[0]
     console.log('dât', dataApi)
     const dataYear = props.dataApi[1]
     const data: any = _.map(dataApi, (data: any, key) => {
          return {
               key: data?.round,
               grand_prix: data?.Circuit.Location.country,
               driver: data?.Results[0].Driver.familyName + " " + data?.Results[0].Driver.givenName,
               car: data?.Results[0].Constructor.name,
               time:data?.Results[0].FastestLap.Time.time

          }
     })

     const columns: ColumnsType<any> = [
          {
               title: "GRAND PRIX",
               dataIndex: "grand_prix",
               key: "grand_prix",
          },
          {
               title: "DRIVER",
               dataIndex: "driver",
               key: "driver",
          },
          {
               title: "CAR",
               dataIndex: "car",
               key: "car",
          },
          {
               title: "TIME",
               dataIndex: "time",
               key: "time",
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