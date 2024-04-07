import request from '@/utils/request_bi'

export function createDimension(DataSourceID, DataSetID,DimensionName,Expression,Comment) {
  return request({
    url: '/dimension/create',
    method: 'post',
    data: {
    'DataSourceID': DataSourceID,
    'DataSetID':DataSetID,
    'DimensionName':DimensionName,
    'Expression':Expression,
    'Comment': Comment
    }
  })
}

export function deleteDimension(DimensionID) {
  return request({
    url: '/dimension/delete',
    method: 'post',
    data: {
    'DimensionID': DimensionID
    }
  })
}

export function updateDimension(DimensionID,DimensionName,Expression,Comment) {
  return request({
    url: '/dimension/update',
    method: 'post',
    data: {
    'DimensionID': DimensionID,
    'DimensionName':DimensionName,
    'Expression':Expression,
    'Comment': Comment
    }
  })
}

export function queryDimension(DataSourceID,DataSetID) {
  return request({
    url: '/dimension/query',
    method: 'post',
    data: {
      'DataSourceID': DataSourceID,
      'DataSetID':DataSetID
    }
  })
}