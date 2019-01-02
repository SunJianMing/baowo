
const FILTER_IsPublish = value => {
  if (value === 0 || value === '0') {
    return '未启用'
  } else if (value === 1 || value === '1') {
    return '启用'
  } else {
    return '-'
  }
}
const FILTER_IsPublish_Class = value => {
  if (value === 0 || value === '0') {
    return 'wt-tag'
  } else if (value === 1 || value === '1') {
    return 'wt-tag success'
  } else {
    return 'wt-tag'
  }
}
const FILTER_IsDefault = value => {
  if (value === 0 || value === '0') {
    return '非默认'
  } else {
    return '默认'
  }
}
const FILTER_IsAudit = value => {
  if (value === 0) {
    return '审核不通过'
  } else if (value === 1) {
    return '草稿'
  } else if (value === 2) {
    return '待审核'
  } else if (value === 3) {
    return '审核通过'
  } else {
    return '-'
  }
}
//  资源分组 1/人,2/组织,3/物品,4/地点
const FILTER_ResourceGroup = value => {
  if (value === 1 || value === '1') {
    return '人员'
  } else if (value === 2 || value === '2') {
    return '组织'
  } else if (value === 3 || value === '3') {
    return '物品'
  } else if (value === 4 || value === '4') {
    return '地点'
  } else {
    return '-'
  }
}
const FILTER_IsOrNot_Class = value => {
  if (value === 0 || value === '0') {
    return 'wt-tag'
  } else if (value === 1 || value === '1') {
    return 'wt-tag success'
  } else {
    return 'wt-tag'
  }
}
const FILTER_IsOrNot = value => {
  if (value === 1 || value === '1') {
    return '是'
  } else if (value === 0 || value === '0') {
    return '否'
  } else {
    return '-'
  }
}
//  角色 审核类型 0/新建,1/修改,2/发布,3/删除
const FILTER_ApprovalType = value => {
  if (value === 0 || value === '0') {
    return '新建'
  } else if (value === 1 || value === '1') {
    return '修改'
  } else if (value === 2 || value === '2') {
    return '发布'
  } else if (value === 3 || value === '3') {
    return '删除'
  } else {
    return '-'
  }
}
//  角色 审核状态 0/审核不通过,1/草稿,2/待审核,3/审核通过
const FILTER_ApprovalState = value => {
  if (value === 0 || value === '0') {
    return '审核驳回'
  } else if (value === 1 || value === '1') {
    return '草稿'
  } else if (value === 2 || value === '2') {
    return '待审核'
  } else if (value === 3 || value === '3') {
    return '审核通过'
  } else {
    return '-'
  }
}
//  角色 审核状态 0/审核不通过,1/草稿,2/待审核,3/审核通过
const FILTER_ApprovalState_Class = value => {
  if (value === 0 || value === '0') {
    return 'wt-tag warn'
  } else if (value === 1 || value === '1') {
    return 'wt-tag'
  } else if (value === 2 || value === '2') {
    return 'wt-tag'
  } else if (value === 3 || value === '3') {
    return 'wt-tag success'
  } else {
    return 'wt-tag'
  }
}
const FILTER_DelegateStatus = value => {
  if (value === 1 || value === '1') {
    return '已完成'
  } else if (value === 0 || value === '0') {
    return '未查询'
  } else {
    return '-'
  }
}
export {
  FILTER_IsPublish,
  FILTER_IsPublish_Class,
  FILTER_IsDefault,
  FILTER_IsAudit,
  FILTER_ResourceGroup,
  FILTER_IsOrNot,
  FILTER_IsOrNot_Class,
  FILTER_ApprovalType,
  FILTER_ApprovalState,
  FILTER_ApprovalState_Class,
  FILTER_DelegateStatus
}
