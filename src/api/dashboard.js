import request from '@/utils/request_bi'

export function queryDashboard(DashboardName, DataSourceID,DataSetID,DashboardID,PageNo, PageSize) {
  return request({
    url: '/dashboard/query',
    method: 'post',
    data: {
    'DashboardName': DashboardName,
    'DataSourceID':DataSourceID,
    'DataSetID':DataSetID,
    'DashboardID':DashboardID,
    'PageNo': PageNo,
    'PageSize': PageSize
    }
  })
}

export function createDashboard(DashboardName, DataSourceID,DataSetID,Comment) {
  return request({
    url: '/dashboard/create',
    method: 'post',
    data: {
    'DashboardName': DashboardName,
    'DataSourceID':DataSourceID,
    'DataSetID':DataSetID,
    'Comment': Comment
    }
  })
}

export function updateDashboard(DashboardName, DashboardID,DataSourceID,DataSetID,DashboardType,DashboardDimensions,DashboardIndexes,Comment) {
  return request({
    url: '/dashboard/update',
    method: 'post',
    data: {
    'DashboardName': DashboardName,
    'DashboardID':DashboardID,
    'DataSourceID':DataSourceID,
    'DataSetID': DataSetID,
    'DashboardType':DashboardType,
    'DashboardDimensions':DashboardDimensions,
    'DashboardIndexes':DashboardIndexes,
    'Comment':Comment
    }
  })
}

export function detailDashboard(DashboardID) {
  return request({
    url: '/dashboard/query/detail',
    method: 'post',
    data: {
    'DashboardID':DashboardID
    }
  })
}

export function executeQueryDashboard(DataSourceID,DataSetID,DashboardID,DimensionIDs,IndexIDs,FilterIDs) {
  return request({
    url: '/dashboard/executeQuery',
    method: 'post',
    data: {
    'DataSourceID':DataSourceID,
    'DataSetID':DataSetID,
    'DashboardID':DashboardID,
    'DimensionIDs':DimensionIDs,
    'IndexIDs':IndexIDs,
    'FilterIDs':FilterIDs
    }
  })
}