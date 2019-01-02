/* Layout */

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
const allRoutes = {
  'ROLE': () => import('@/modules/auth/role/roleList'),
  'ACCOUNT': () => import('@/modules/auth/account/accountList'),
  'DICT': () => import('@/modules/auth/account/accountList'),
  'PERMISSION': () => import('@/modules/auth/permission/permissionList'),
  'MODULE': () => import('@/modules/auth/module/moduleList'),
  'MODULE_ACTIVITY': () => import('@/modules/bwcar/activityList'),
  'MODULE_ACTIVITYASSESSOR': () => import('@/modules/bwcar/activityAssessorList'),
  'MODULE_ACTIVITYIMPORTANCE': () => import('@/modules/bwcar/activityImportanceList'),
  'MODULE_ACTIVITYOBJECT': () => import('@/modules/bwcar/activityObjectList'),
  'MODULE_ACTIVITYOBJECTSCORE': () => import('@/modules/bwcar/activityObjectScoreList'),
  'MODULE_ACTIVITYOBJECTSCOREREMARK': () => import('@/modules/bwcar/activityObjectScoreRemarkList'),
  'MODULE_ACTIVITYPROPERTY': () => import('@/modules/bwcar/activityPropertyList'),
  'MODULE_ASSESSOR': () => import('@/modules/bwcar/assessorList'),
  'MODULE_DICT': () => import('@/modules/bwcar/dictList'),
  'MODULE_EVALUATEOBJECT': () => import('@/modules/bwcar/evaluateObjectList'),
  'MODULE_EVALUATEOBJECTPARAMS': () => import('@/modules/bwcar/evaluateObjectParamsList'),
  'MODULE_EVALUATEPARAMS': () => import('@/modules/bwcar/evaluateParamsList'),
  'MODULE_EVALUATESURVEY': () => import('@/modules/bwcar/evaluateSurveyList'),
  'MODULE_EVALUATESURVEYPROPERTY': () => import('@/modules/bwcar/evaluateSurveyPropertyList'),
  'MODULE_EVALUATETYPE': () => import('@/modules/bwcar/evaluateTypeList'),
  'MODULE_PROPERTY': () => import('@/modules/bwcar/propertyList'),
  'MODULE_PROPERTYDETAIL': () => import('@/modules/bwcar/propertyDetailList')
}

export default allRoutes
