import { Table } from 'antd'
import { ColumnsType, TableProps } from 'antd/es/table';
import React from 'react'
import { DataType } from './CrawlMain';
import _ from 'lodash';



export default function Races(props: any) {
     const dataApi = props.dataApi[0]
     const dataYear = props.dataApi[1]
     const data: any = _.map(dataApi, (data: any, key) => {
          return {
               key: data?.Circuit.Location.country,
               grand_prix: data?.Circuit.Location.country,
               date: data?.date,
               winner: data?.Results[0]?.Driver.givenName + " " + data?.Results[0]?.Driver.familyName,
               car: data?.Results[0]?.Constructor?.name,
               lap: data?.Results[0]?.laps,
               time: data?.Results[0]?.Time?.time
          }
     })

     const columns: ColumnsType<any> = [
          {
               title: "GRAND PRIX",
               dataIndex: "grand_prix",
               key: "grand_prix",
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
          },
          {
               title: "Car",
               dataIndex: "car",
               key: "car",
          },
          {
               title: "Lap",
               dataIndex: "lap",
               key: "lap",
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

     return (
          <div>
               <Table columns={columns} dataSource={data} rowKey={dataYear} onChange={handleChange} />
          </div>
     )
}