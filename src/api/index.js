import request from '@/utils/request_bi'

export function createIndex(DataSourceID, DataSetID,IndexName,Expression,Comment) {
  return request({
    url: '/index/create',
    method: 'post',
    data: {
    'DataSourceID': DataSourceID,
    'DataSetID':DataSetID,
    'IndexName':IndexName,
    'Expression':Expression,
    'Comment': Comment
    }
  })
}

export function deleteIndex(IndexID) {
  return request({
    url: '/index/delete',
    method: 'post',
    data: {
    'IndexID': IndexID
    }
  })
}

export function updateIndex(IndexID,IndexName,Expression,Comment) {
  return request({
    url: '/index/update',
    method: 'post',
    data: {
    'IndexID': IndexID,
    'IndexName':IndexName,
    'Expression':Expression,
    'Comment': Comment
    }
  })
}

export function queryIndex(DataSourceID,DataSetID) {
  return request({
    url: '/index/query',
    method: 'post',
    data: {
      'DataSourceID': DataSourceID,
      'DataSetID':DataSetID
    }
  })
}