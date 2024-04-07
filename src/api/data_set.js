import request from '@/utils/request_bi'

export function query(DataSetName, DataSourceID,PageNo, PageSize) {
  return request({
    url: '/dataSet/query',
    method: 'post',
    data: {
    'DataSetName': DataSetName,
    'DataSourceID':DataSourceID,
    'PageNo': PageNo,
    'PageSize': PageSize
    }
  })
}

export function queryDataSetColumn( DataSourceID,DataSetName,PageNo, PageSize) {
  return request({
    url: '/dataSet/queryColumn',
    method: 'post',
    data: {
    'DataSourceID': DataSourceID,
    'DataSetName':DataSetName,
    'PageNo': PageNo,
    'PageSize': PageSize
    }
  })
}

export function previewDataSet( DataSourceID,DataSetID,DataSetName,PageNo, PageSize) {
  return request({
    url: '/dataSet/preview',
    method: 'post',
    data: {
    'DataSourceID': DataSourceID,
    'DataSetID': DataSetID,
    'DataSetName':DataSetName,
    'PageNo': PageNo,
    'PageSize': PageSize
    }
  })
}