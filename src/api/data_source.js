import request from '@/utils/request_bi'

export function query(dataSourceName,dataSourceID, pageNo, pageSize) {
  return request({
    url: '/datasource/query',
    method: 'post',
    data: {
    'DataSourceName': dataSourceName,
    'DataSourceID':dataSourceID,
    'PageNo': pageNo,
    'PageSize': pageSize
    }
  })
}

export function create(dataSourceName,URL,DataBase,UserName,Password,Comment){
  return request({
    url: '/datasource/create',
    method: 'post',
    data: {
    'DataSourceName': dataSourceName,
    'URL': URL,
    'DataBase': DataBase,
    'UserName':UserName,
    'Password':Password,
    'Comment':Comment
    }
  })
}

export function test(DataSourceID,URL,DataBase,UserName,Password){
  return request({
    url: '/datasource/test',
    method: 'post',
    data: {
    'DataSourceID': DataSourceID,
    'URL': URL,
    'DataBase': DataBase,
    'UserName':UserName,
    'Password':Password
    }
  })
}

export function update(dataSourceName,URL,DataBase,UserName,Password,Comment,DataSourceID){
  return request({
    url: '/datasource/update',
    method: 'post',
    data: {
    'DataSourceName': dataSourceName,
    'URL': URL,
    'DataBase': DataBase,
    'UserName':UserName,
    'Password':Password,
    'Comment':Comment,
    'DataSourceID':DataSourceID
    }
  })
}